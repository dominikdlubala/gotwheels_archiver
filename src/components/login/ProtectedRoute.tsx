import { ReactNode } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 
// import type { User } from '../../types/userType'; 

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth(); 
    if(!user) {
        return <Navigate to={'/'} />
    }
    return children; 
}