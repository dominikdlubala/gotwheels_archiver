import { useState } from 'react'; 
import { createPortal } from 'react-dom'; 
import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { navigationData } from './Header'; 
import type { FirebaseUser } from '../types/types'; 
import Input from './Input'; 


interface DesktopNavProps {
    className: string; 
    user: FirebaseUser | null; 
    logout: () => void; 
}

export default function DesktopNav({ user, logout, className }: DesktopNavProps) {
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState<string>(''); 

    const handleInputChange = (value: string) => {
        setSearchTerm(value); 
    }

    const drawerElement = (
        <div className="search-database--drawer">
            <div className="search-database-drawer--item">
                COs
            </div>
            <div className="search-database-drawer--item">
                COs
            </div>
            <div className="search-database-drawer--item">
                COs
            </div>
        </div>
    )

    return (
        <div className={`${className}`}>
            <div className={`header-container`}>
                <div className="header-logo">
                    <Link to={`/home`} className="header-logo-link">
                        <span>Got</span><FaFire className="icon-fire" />Wheels
                    </Link>
                </div>
                <div className="search-database">
                    <Input className="nav-input" value={searchTerm} onChange={handleInputChange}/>
                    {drawerElement}
                </div>
                <div className="navigation-links">
                    {
                        navigationData.map(link => (
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