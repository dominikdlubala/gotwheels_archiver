import { useState } from 'react'; 
import { FaFire } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { navigationData } from './Header'; 
import type { FirebaseUser } from '../types/types'; 
import { useFetchDatabaseCarsQuery } from '../store';  
import Input from './Input'; 


interface DesktopNavProps {
    className: string; 
    user: FirebaseUser | null; 
    logout: () => void; 
}

export default function DesktopNav({ user, logout, className }: DesktopNavProps) {
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [drawerOpen, setDrawerOpen] = useState(false); 

    const { data } = useFetchDatabaseCarsQuery()

    const handleInputChange = (value: string) => {
        setSearchTerm(value); 
        if(searchTerm === '') {
            setDrawerOpen(false)
        } else {
            setDrawerOpen(true)
        }; 
    }
    const addedClassName = drawerOpen &&  'search-database--drawer--closed'


    const drawerElement = (
        <ul className={`search-database--drawer`}>
            {
                data && searchTerm !== ''
                &&
                [... new Set(data.filter(car => car.model.toLowerCase().includes(searchTerm)).slice(0, 10))].map(car => (
                    <li 
                        key={car.toy_num || car.model} 
                        className="search-database-drawer--item"
                        onClick={() => setSearchTerm(car.model)}
                    >
                        {car.model}
                    </li>
                ))
            }
        </ul>
    )

    return (
        <div className={`${className}`}>
            <div className={`header-container`}>
                <div className="header-logo">
                    <Link to={`/home`} className="header-logo-link">
                        <span>Got</span><FaFire className="icon-fire" />Wheels
                    </Link>
                </div>
                <div className="search-database">
                    <Input className="nav-input" value={searchTerm} onChange={handleInputChange}/>
                    {
                        drawerOpen 
                        &&
                        drawerElement
                    }
                </div>
                <div className="navigation-links">
                    {
                        navigationData.map(link => (
                            <Link key={link.path} className="nav-link" to={link.path}>{link.name}</Link>
                        ))
                    }
                    {
                        user 
                        &&
                        <a className="nav-link login-link" onClick={() => logout()}>Log out</a>
                    }
                    {
                        !user 
                        &&
                        <a className="nav-link login-link" onClick={() => navigate('/register')}>Register</a>
                    }
                </div>
            </div>
        </div>
    )
}