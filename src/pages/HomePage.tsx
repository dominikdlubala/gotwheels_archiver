import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 

export default function HomePage() {

    const { user } = useAuth(); 

    return (
        <div>
            Home
            <Link to={`/collections/${user?.id}`} >Go to collections</Link>
        </div>
    ); 
}