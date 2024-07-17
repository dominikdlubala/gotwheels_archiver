import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
import Drawer from '../components/Drawer'; 
export default function HomePage() {
    const { user } = useAuth(); 

    return (
        <div>
            <div className="page-title">
                <Drawer currentRoute='Home'/>
            </div>
            <div className="page-section home-section">
                    <Link className="list-item page-link home-link" to={`/collections`} state={{ userId: user?.id}} >My collections</Link>
                    <Link className="list-item page-link home-link" to={`/cars/`} >My cars</Link>
            </div>
        </div>
    ); 
}