import type { Car } from '../../types/types'; 
import  CarsListItem  from './CarsListItem'; 

interface CarsListProps {
    data?: Car[], 
    isLoading: boolean, 
    isError: boolean
}
export default function CarsList({ data, isLoading, isError}: CarsListProps) {
    
    let content; 
    if(isLoading){
        content = <div>...Loading</div>
    }

    // if(isError) {
    //     if(error instanceof FirebaseError){
    //         content = <div>{error.message}</div>
    //     }
    // }

    if(!isLoading && !isError){
        content = data?.sort((a, b) => a.series && b.series ? a.series.localeCompare(b.series) : a.model.localeCompare(b.model)).map(car => (
            <CarsListItem key={`${car.model + Math.random()}`} car={car} />
        ))
    }

    return (
        <div className="list cars-list">
            {content} 
        </div>
    );
}