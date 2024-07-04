import { Link } from 'react-router-dom'; 
import { useUserData } from '../hooks/useUserData'; 

export default function HomePage() {

    const { user } = useUserData(); 

    return (
        <div>
            Home
            <Link to={`/collections/${user.id}`} >Go to collections</Link>
        </div>
    ); 
}