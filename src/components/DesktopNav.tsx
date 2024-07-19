import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { navigationData } from './Header'; 
import type { User } from '../types/types'; 

interface DesktopNavProps {
    className: string; 
    user: User | null; 
    logout: () => void; 
}

export default function DesktopNav({ user, logout, className }: DesktopNavProps) {
    const navigate = useNavigate(); 
    return (
        <div className={`${className} header-container`}>
            <div className="header-logo">
                <Link to={`/home`} className="header-logo-link">
                    <span>Hot</span><FaFire className="icon-fire" />Wheels
                </Link>
            </div>
            <div className="navigation-links">
                {
                    navigationData.map(link => (
                        link.path === '/collections'
                        ?
                        <Link className="nav-link" to={link.path} state={ {userId: user?.id}}>{link.name}</Link>
                        :
                        <Link className="nav-link" to={link.path}>{link.name}</Link>
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
    )
}