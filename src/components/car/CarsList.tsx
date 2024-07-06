import { useFetchCarsQuery } from "../../store"
import  CarsListItem  from './CarsListItem'; 

interface CarsListProps {
    collectionId: string
}
export default function CarsList({ collectionId }: CarsListProps) {

    // fix string | undefined
    const { data, isLoading, isError } = useFetchCarsQuery(collectionId); 

    let content; 
    if(isLoading){
        content = <div>...Loading</div>
    }

    if(!isLoading && !isError){
        content = data?.map(car => (
            <CarsListItem key={car.id} car={car} />
        ))
    }

    return (
        <div className="list cars-list">
            {content} 
        </div>
    );
}