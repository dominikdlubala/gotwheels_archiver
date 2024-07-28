import { useState } from 'react';  
import CarsList from '../components/car/CarsList'; 
import { useFetchDatabaseCarsQuery } from '../store'; 

export default function CarsDatabasePage() {

    const [year, setYear] = useState(1969); 

    const { data, isLoading, isError } = useFetchDatabaseCarsQuery(year); 

    return (
        <div className="page-container">
            <div className="page-section">
                <CarsList
                    data={data}
                    isError={isError}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}