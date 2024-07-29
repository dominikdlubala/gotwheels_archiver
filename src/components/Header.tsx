import { useAuth } from '../hooks/useAuth'; 

import DesktopNav from './DesktopNav'; 
import MobileNav from './MobileNav'; 

type NavigationData = {
    path: string; 
    name: string;
}

export const navigationData: NavigationData[] = [
    {
        path: '/cars-database', 
        name: 'Cars Database'
    }, 
    {
        path: '/cars/', 
        name: 'My Cars'
    }
]

export default function Header() {

    const { user, logout } = useAuth(); 

    return (
        <div>
            <DesktopNav className="desktop-nav" user={user} logout={logout} />
            <MobileNav className="mobile-nav" user={user} logout={logout} />
        </div>
    ); 
}