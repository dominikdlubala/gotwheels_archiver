import { useLoaderData } from 'react-router-dom'; 
import { Car } from '../types/carType'; 

export default function CarsPage() {

    const { fetchResults } = useLoaderData() as { fetchResults: Car[] }; 

    const renderedCars = fetchResults.map(car => {
        return (
            <div key={car.id}> 
                {car.name}
            </div>
        )
    })

    return (
        <div>
            Cars
            {renderedCars}
        </div>
    )
}