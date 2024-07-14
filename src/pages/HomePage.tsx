import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
export default function HomePage() {
    const { user } = useAuth(); 

    return (
        <div>
            <div className="page-title">
                <h1>Home</h1>
            </div>
            <div className="page-section">
                <div>
                    <h1>Section</h1>
                </div>
                    <Link className="page-link collections-link" to={`/collections`} state={{ userId: user?.id}} >My collections</Link>
                    <Link className="page-link cars-link" to={`/cars`} >My cars</Link>
            </div>
        </div>
    ); 
}