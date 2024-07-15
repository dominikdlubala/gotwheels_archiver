import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
interface DrawerProps {
    currentRoute: string; 
}

export default function Drawer({ currentRoute }: DrawerProps) {
    const { user } = useAuth(); 
    console.log(user); 

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); 

    let classes; 
    if(isDrawerOpen) classes = 'drawer-open'; 

    return (
        <div className={`drawer-main ${classes}`} >
            <h1 className="drawer-main-link" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                {currentRoute}
            </h1>
            {
                isDrawerOpen
                && 
                <div className="drawer">
                    <Link className="drawer-link" to={'/home'}>Home</Link>
                    <Link className="drawer-link" to={'/collections'} state={ {userId: user?.id} }>Collections</Link>
                </div>
            }
        </div>

    ); 
}