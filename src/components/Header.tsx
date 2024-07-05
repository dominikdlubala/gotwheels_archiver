import { FaFire } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 

export default function Header() {

    const { logout } = useAuth(); 

    return (
        <div className="header-container">
            <div className="header-logo">
                <Link to={`/home`} className="header-logo-link">
                    Hot<FaFire className="icon-fire" />Wheels
                </Link>
            </div>
            <div className="header-links">
                <a onClick={() => logout()}>Log out</a>
                <Link to={'/register'}>Register</Link>
            </div>
        </div>
    ); 
}