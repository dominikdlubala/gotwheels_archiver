import { useState, useRef, useEffect } from 'react'; 
import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { navigationData } from './Header'; 
import type { FirebaseUser } from '../types/types'; 

import { CiMenuBurger } from "react-icons/ci";

interface MobileNavProps {
    className: string; 
    user: FirebaseUser | null; 
    logout: () => void; 
}


export default function MobileNav({ user, logout, className }: MobileNavProps) {
    const navigate = useNavigate(); 
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); 

    const menuRef = useRef<HTMLDivElement>(null); 
    const handleClickOutside = (e: MouseEvent) => {
        if(menuRef.current && !menuRef.current.contains(e.target as Node)){
            setIsMenuOpen(false); 
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside); 
        return () => {
            document.removeEventListener('click', handleClickOutside); 
        }
    }, []); 

    return (
        <div className={`${className} mobile-nav-wrapper`} ref={menuRef}>
            <div className={`header-container`}>
                <div className="header-logo">
                    <Link to={`/home`} className="header-logo-link">
                        <span>Got</span><FaFire className="icon-fire" />Wheels
                    </Link>
                </div>
                
                <div className="hamburger-menu">
                    <CiMenuBurger onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            </div>
            {
                isMenuOpen
                &&
                <div className="hamburger-links">
                    {
                        navigationData.map(link => (
                            link.path === '/collections'
                            ?
                            <Link key={link.path} onClick={() => setIsMenuOpen(!isMenuOpen)} className="nav-link" to={link.path} state={ {userId: user?.uid}}>{link.name}</Link>
                            :
                            <Link key={link.path} onClick={() => setIsMenuOpen(!isMenuOpen)} className="nav-link" to={link.path}>{link.name}</Link>         
                        ))
                    }
                    {
                        user 
                        &&
                        <a 
                            className="nav-link login-link" 
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                                logout()
                            }}
                        >
                                Log out
                        </a>
                    }
                    {
                        !user 
                        &&
                        <a 
                            className="nav-link login-link" 
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen) 
                                navigate('/register')
                            }}
                        >Register</a>
                    }
                </div>      
            } 
        </div>
    )
}