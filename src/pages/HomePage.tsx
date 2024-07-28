import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
import type { FirebaseUser } from '../types/types'; 
export default function HomePage() {
    const { user } = useAuth() as { user: FirebaseUser }; 

    return (
        <div className="page-container">
            <Link className="list-item database-link" to={'/cars-database'}>Cars database</Link>
            <div className="page-section home-section">
                    <Link className=" page-link home-link" to={`/collections`} state={{ userId: user.uid}} >My collections</Link>
                    <Link className=" page-link home-link" to={`/cars/`} >My cars</Link>
            </div>
        </div>
    ); 
}