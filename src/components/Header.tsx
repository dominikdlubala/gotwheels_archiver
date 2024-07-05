import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 

export default function Header() {

    const { logout } = useAuth(); 
    const navigate = useNavigate(); 

    return (
        <div className="header-container">
            <div className="header-logo">
                <Link to={`/home`} className="header-logo-link">
                    <span>Hot</span><FaFire className="icon-fire" />Wheels
                </Link>
            </div>
            <div className="header-links">
                <a onClick={() => logout()}>Log out</a>
                <a onClick={() => navigate('/register')}>Register</a>
            </div>
        </div>
    ); 
}