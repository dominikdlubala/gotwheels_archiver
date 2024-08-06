import { useState, useRef, useEffect, useCallback } from 'react'; 
import { FaFire } from 'react-icons/fa'; 
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom'; 
import {
    collection, 
    query, where,  
    getDocs, 
    limit
} from 'firebase/firestore'; 
import { firestore } from '../firebaseSetup'; 

import { navigationData } from './Header'; 
import type { FirebaseUser } from '../types/types'; 
import Input from './Input'; 



interface MobileNavProps {
    className: string; 
    user: FirebaseUser | null; 
    logout: () => void; 
}


export default function MobileNav({ user, logout, className }: MobileNavProps) {
    const navigate = useNavigate(); 
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); 

    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [drawerOpen, setDrawerOpen] = useState(false); 
    const [searchResults, setSearchResults] = useState<string[]>([]); 
    const [isLoading, setIsLoading] = useState(false);  

    const fetchSearchResults = useCallback(async (term: string) => {
        if(!term){
            setSearchResults([]); 
            setDrawerOpen(false); 
            return; 
        }
        const termForSearch = term.split(' ').map(word => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')

        setIsLoading(true); 
        const years = Array.from({length: 2024 - 1968 + 1}, (_, i) => i + 1968); 
        const promises = years.map(async (year) => {
            const carsRef = collection(firestore, 'hotwheels_database', year.toString(), 'cars'); 
            const q = query(carsRef, where('model', '>=', termForSearch), where('model', '<=', termForSearch + '\uf8ff'), limit(10)); 
            const querySnapshot = await getDocs(q)
            
            return querySnapshot.docs.map(doc => doc.data().model); 
        }); 

        const resultsArray = await Promise.all(promises); 
        const results = resultsArray.flat(); 
        const uniqueResults = [...new Set(results)]

        setSearchResults(uniqueResults); 
        setDrawerOpen(true); 
        setIsLoading(false); 
    }, []); 

    const handleInputChange = (value: string) => {
        setSearchTerm(value); 
        fetchSearchResults(value); 
    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => fetchSearchResults(searchTerm), 300);
        return () => clearTimeout(debounceTimer); 
    }, [searchTerm, fetchSearchResults]); 

    const handleInputSubmit = (value: string) => {
        navigate('/cars-database', { state: { modelSearch: value }}) 
    }


    const drawerRef = useRef<HTMLUListElement>(null); 
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideDrawer); 
        return () => document.removeEventListener('click', handleClickOutsideDrawer)
    }, [])
    const handleClickOutsideDrawer = (e: MouseEvent) => {
        if(drawerRef.current && !drawerRef.current.contains(e.target as Node))
            setDrawerOpen(false); 
    }
    const drawerElement = (
        <ul ref={drawerRef} className={`search-database--drawer`}>
            {
                isLoading 
                ?
                [1, 2, 3].map((num) => (
                    <li key={num} className="search-database-drawer--item">Loading..</li>
                ))
                :
                searchResults.length > 0
                ? 
                searchResults.map((model, idx) => (
                    <li
                        key={idx}
                        className="search-database-drawer--item"
                        onClick={() => {
                            setSearchTerm(model)
                            handleInputSubmit(model)
                        }}
                    >
                        {model}
                    </li>
                ))
                : <li className="search-database-drawer--item">No results found</li>
            }
        </ul>
    )

    const menuRef = useRef<HTMLDivElement>(null); 
    const handleClickOutside = (e: MouseEvent) => {
        if(menuRef.current && !menuRef.current.contains(e.target as Node)){
            setIsMenuOpen(false); 
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside); 
        return () => {
            document.removeEventListener('click', handleClickOutside); 
        }
    }, []); 

    return (
        <div className={`${className} mobile-nav-wrapper`} ref={menuRef}>
            <div className={`header-container`}>
                <div className="header-logo">
                    <Link to={`/home`} className="header-logo-link">
                        <span>Got</span><FaFire className="icon-fire" />Wheels
                    </Link>
                </div>

                <div className="search-database">
                    <Input 
                        className="nav-input" 
                        value={searchTerm} 
                        onChange={handleInputChange}
                        onSubmit={handleInputSubmit}
                    />
                    { drawerOpen && drawerElement }
                </div>
                
                <div className="hamburger-menu">
                    <CiMenuBurger onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            </div>
            {
                isMenuOpen
                &&
                <div className="hamburger-links">
                    {
                        navigationData.map(link => (
                            <Link key={link.path} onClick={() => setIsMenuOpen(!isMenuOpen)} className="nav-link" to={link.path}>{link.name}</Link>         
                        ))
                    }
                    {
                        user 
                        &&
                        <a 
                            className="nav-link login-link" 
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                                logout()
                            }}
                        >
                                Log out
                        </a>
                    }
                    {
                        !user 
                        &&
                        <a 
                            className="nav-link login-link" 
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen) 
                                navigate('/register')
                            }}
                        >Register</a>
                    }
                </div>      
            } 
        </div>
    )
}