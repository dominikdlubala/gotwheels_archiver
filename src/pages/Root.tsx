import { Outlet } from 'react-router-dom'; 
import Header from '../components/Header'; 
import { AuthProvider } from '../hooks/useAuth'; 

export default function Root() {
    return (
            <AuthProvider>
                <Header />
                <Outlet />
            </AuthProvider>
    );
}
