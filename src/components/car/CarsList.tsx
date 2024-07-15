import { useFetchCarsQuery } from "../../store"
import  CarsListItem  from './CarsListItem'; 

interface CarsListProps {
    collectionId: string | null, 
    userId: string
}
export default function CarsList({ collectionId, userId }: CarsListProps) {

    // fix string | undefined
    const { data, isLoading, isError } = useFetchCarsQuery({ collectionId, userId}); 

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