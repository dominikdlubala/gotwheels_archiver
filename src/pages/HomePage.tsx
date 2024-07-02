import { Link } from 'react-router-dom'; 
import { User } from '../types/userType'; 

interface HomePageProps {
    user: User
}

export default function HomePage({user}: HomePageProps) {


    return (
        <div>
            Home
            <Link to={`/collections/?userId=${user.id}`} >Go to collections</Link>
        </div>
    ); 
}