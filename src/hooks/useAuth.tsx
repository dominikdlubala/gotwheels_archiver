import { createContext, useContext, useMemo, ReactNode, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import { User } from 'firebase/auth';  
import { auth } from '../firebaseSetup'; 

import { useLocalStorage } from './useLocalStorage'; 
// import type { User } from '../types/userType'; 

interface AuthContextType {
    user: User | null; 
    login: (userData: User) => void; 
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useLocalStorage<User | null>('user', null); 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser); 
        }); 
        return unsubscribe; 
    }, []); 

    const navigate = useNavigate(); 

    const login = async (userData: User) => {
        setUser(userData); 
        navigate('/home'); 
    }

    const logout = () => {
        setUser(null); 
        navigate('/', { replace: true }); 
    }

    const value = useMemo(
        () => ({
          user,
          login,
          logout,
        }),
        [user]
      );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext); 
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context; 
}