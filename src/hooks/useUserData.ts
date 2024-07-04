import { useOutletContext } from 'react-router-dom'; 
import type { User } from '../types/userType'; 
type UserDataContextType = {
    user: User
}

export function useUserData(): UserDataContextType {
    return useOutletContext<UserDataContextType>(); 
}