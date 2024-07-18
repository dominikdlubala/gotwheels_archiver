import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 

type NavigationData = {
    path: string; 
    name: string;
}

const navigationData: NavigationData[] = [
    {
        path: '/collections', 
        name: 'Collections'
    }, 
    {
        path: '/cars/', 
        name: 'Cars'
    }
]

export default function Header() {

    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 

    return (
        <nav className="header-container">
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
            </div>
            <div className="header-links">
                {
                    user 
                    &&
                    <a onClick={() => logout()}>Log out</a>
                }
                {
                    !user 
                    &&
                    <a onClick={() => navigate('/register')}>Register</a>
                }
            </div>
        </nav>
    ); 
}