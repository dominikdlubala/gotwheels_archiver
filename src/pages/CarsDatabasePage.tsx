import { useState } from 'react';  
import CarsList from '../components/car/CarsList'; 
import { useFetchDatabaseCarsByYearQuery } from '../store'; 
import Input from '../components/Input'; 

export default function CarsDatabasePage() {

    const [searchTerm, setSearchTerm] = useState(''); 
    const [year, setYear] = useState(1970); 
    const { data, isLoading, isError } = useFetchDatabaseCarsByYearQuery(year); 
    const range = (min: number, max: number): number[] => {
        const len = max - min + 1; 
        const arr = new Array<number>(len); 
        for(let i = 0; i < len; i++){
            arr[i] = min + i; 
        }
        return arr; 
    }
    const yearArr = range(1968, 2024); 

    const handleInputChange = (value: string) => {
        setSearchTerm(value); 
    }

    const displayData = data?.filter(car => Number(car.year) === year).filter(car => car.model.toLowerCase().includes(searchTerm))

    return (
        <div className="page-container">
            <div className="database-year-select">
                <h2>Cars from <span className="database-year-select--year">{year}</span></h2>
                <div className="database-year-select--years">
                    {
                        yearArr.map(year => <a href='' key={year} className="database-year-select--link" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                            e.preventDefault(); 
                            setYear(year)
                        }}>{year.toString()}</a>) 

                    }
                </div>
            </div>
            <div className="page-title">
                    <div className="search search-cars search-database-cars">
                        <Input
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            <div className="page-section">
                <CarsList
                    data={displayData}
                    isError={isError}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}