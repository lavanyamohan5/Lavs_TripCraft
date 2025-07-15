import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const DUMMY_CREDENTIALS = {
    email: 'abc123@gmail.com',
    password: '123456'
  };

  const DUMMY_USER = {
    id: '1',
    name: 'Lavanya Mohan',
    email: 'abc123@gmail.com'
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined
        });
      } else {
        const savedUser = localStorage.getItem('tripcraft_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            localStorage.removeItem('tripcraft_user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    // 🌐 Handle Google Redirect Result
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser({
            id: result.user.uid,
            name: result.user.displayName || 'User',
            email: result.user.email || '',
            photoURL: result.user.photoURL || undefined
          });
        }
      })
      .catch((error) => {
        console.error('Redirect result error:', error);
      });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || undefined
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
        setUser(DUMMY_USER);
        localStorage.setItem('tripcraft_user', JSON.stringify(DUMMY_USER));
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: name });
      setUser({
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || undefined
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
      return { success: true };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setIsLoading(false);

      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, message: 'Sign-in was cancelled. Please try again.' };
      } else if (error.code === 'auth/popup-blocked') {
        return { success: false, message: 'Google sign-in popup was blocked by your browser. Please allow pop-ups for this site and try again.' };
      } else if (error.code === 'auth/cancelled-popup-request') {
        return { success: false, message: 'Sign-in request was cancelled. Please try again.' };
      } else {
        return { success: false, message: 'Google sign-in failed. Please try again.' };
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem('tripcraft_user');
      setUser(null);
    } catch (error) {
      localStorage.removeItem('tripcraft_user');
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    loginWithGoogle,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
