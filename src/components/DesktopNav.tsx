import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { navigationData } from './Header'; 
import type { FirebaseUser } from '../types/types'; 

interface DesktopNavProps {
    className: string; 
    user: FirebaseUser | null; 
    logout: () => void; 
}

export default function DesktopNav({ user, logout, className }: DesktopNavProps) {
    const navigate = useNavigate(); 
    return (
        <div className={`${className}`}>
            <div className={`header-container`}>
                <div className="header-logo">
                    <Link to={`/home`} className="header-logo-link">
                        <span>Got</span><FaFire className="icon-fire" />Wheels
                    </Link>
                </div>
                <div className="navigation-links">
                    {
                        navigationData.map(link => (
                            link.path === '/collections'
                            ?
                            <Link key={link.path} className="nav-link" to={link.path} state={ {userId: user?.uid}}>{link.name}</Link>
                            :
                            <Link key={link.path} className="nav-link" to={link.path}>{link.name}</Link>
                        ))
                    }
                    {
                        user 
                        &&
                        <a className="nav-link login-link" onClick={() => logout()}>Log out</a>
                    }
                    {
                        !user 
                        &&
                        <a className="nav-link login-link" onClick={() => navigate('/register')}>Register</a>
                    }
                </div>
            </div>
        </div>
    )
}