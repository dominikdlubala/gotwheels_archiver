import { useState, useEffect, useRef } from 'react'; 

export default function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible); 
    const ref = useRef<HTMLDivElement>(null); 

    const handleClickOutside= (e: MouseEvent) => {
        if(ref.current && !ref.current.contains(e.target as HTMLElement)) {
            setIsComponentVisible(false); 
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true); 
        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        }
    }, []); 

    return { ref, isComponentVisible, setIsComponentVisible }

}