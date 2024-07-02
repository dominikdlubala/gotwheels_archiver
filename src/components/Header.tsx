import { FaFire } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 

export default function Header() {
    return (
        <div className="header-container">
            <Link to={`/`} className="header-logo">
                Hot<FaFire className="icon-fire" />Wheels
            </Link>
        </div>
    ); 
}