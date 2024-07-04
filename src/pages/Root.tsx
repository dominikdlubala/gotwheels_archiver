import { Outlet } from 'react-router-dom'; 
import Header from '../components/Header'; 
import type { User } from '../types/userType'; 

const user: User = {
    id: 1, 
    firstName: "Karolina", 
    lastName: "Kowal"
}

export default function Root() {
    return (
        <div>
            <Header />
            <Outlet context={{user}} />
        </div>
    );
}
