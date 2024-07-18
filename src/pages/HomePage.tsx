import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
export default function HomePage() {
    const { user } = useAuth(); 

    return (
        <div className="page-container">
            <div className="page-section home-section">
                    <Link className="list-item page-link home-link" to={`/collections`} state={{ userId: user?.id}} >My collections</Link>
                    <Link className="list-item page-link home-link" to={`/cars/`} >My cars</Link>
            </div>
        </div>
    ); 
}