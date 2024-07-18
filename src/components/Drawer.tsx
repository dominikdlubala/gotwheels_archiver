import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
import { useLocation } from 'react-router-dom'; 
interface DrawerProps {
    currentRoute: string; 
}

type DrawerData = {
    path: string; 
    name: string; 
}

export default function Drawer({ currentRoute }: DrawerProps) {
    const { user } = useAuth(); 
    const location = useLocation();  

    const drawerData: DrawerData[] = [
        {
            path: '/home', 
            name: 'Home'
        }, 
        {
            path: '/collections', 
            name: 'Collections'
        }, 
        {
            path: '/cars/', 
            name: 'Cars'
        }
    ]; 

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); 

    let classes = ''; 
    if(isDrawerOpen) classes = 'open'; 

    return (
        <div className={`drawer-main`} >
            <a className="drawer-main-link" onClick={(e) => {
                    e.preventDefault(); 
                    setIsDrawerOpen(!isDrawerOpen)}
                }
            >
                {currentRoute}
            </a>
            {
                isDrawerOpen
                && 
                <div className={`drawer ${classes}`}>
                    {
                        drawerData.filter( data => !location.pathname.startsWith(data.path)).map(data => (
                            data.path === '/collections' 
                            ?
                            <Link className="drawer-link" to={data.path} state={{ userId: user?.id}}>{data.name}</Link> 
                            :
                            <Link className="drawer-link" to={data.path}>{data.name}</Link>
                        ))
                    }

                </div>
            }
        </div>

    ); 
}