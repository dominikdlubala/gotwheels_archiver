import { useState, useCallback } from 'react';  
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import CarsList from '../components/car/CarsList'; 
import { useFetchDatabaseCarsByYearQuery, useFetchDatabaseCarsByModelQuery } from '../store'; 
import Input from '../components/Input'; 
import type { Car } from '../types/types'; 

const range = (min: number, max: number): number[] => {
    const len = max - min + 1; 
    const arr = new Array<number>(len); 
    for(let i = 0; i < len; i++){
        arr[i] = min + i; 
    }
    return arr; 
}

export default function CarsDatabasePage() {

    const [searchTerm, setSearchTerm] = useState('');
    const { year: pathYear } = useParams();   
    const [year, setYear] = useState<number>(pathYear ? Number(pathYear) : 2024); 
    const [treasureHunt, setTreasureHunt] = useState(false); 
    const { data, isLoading, isError } = useFetchDatabaseCarsByYearQuery(year); 
    const location = useLocation(); 
    const yearArr = range(1968, 2024); 
    const navigate = useNavigate(); 

    let modelSearch: string | null = null; 
    if(location.state) {
        modelSearch = location.state.modelSearch as string; 
    }

    const handleInputChange = useCallback((value: string) => {
        setSearchTerm(value); 
    }, [])

    const { data: navSearchData } = useFetchDatabaseCarsByModelQuery(modelSearch); 

    // to be changed
    let finalData: Car[] | undefined = []; 
    if(modelSearch && navSearchData && navSearchData.length >= 1) 
        finalData = navSearchData 
    else 
        finalData = data;  

    let displayData = finalData?.filter(car => car.model.toLowerCase().includes(searchTerm.toLowerCase()))

    if(treasureHunt){
        displayData = displayData?.filter(car => car.treasure_hunt && ['Treasure Hunt', 'Super Treasure Hunt'].includes(car.treasure_hunt))
    }


    return (
        <div className="page-container">
            <div className="database-year-select">
                <div className="database-year-select--years">
                    {
                        yearArr.map(year => <a href='' key={year} className="database-year-select--link" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                            e.preventDefault(); 
                            setSearchTerm('');
                            navigate(`/cars-database/${year}`)
                            setYear(year)
                        }}>{year.toString()}</a>) 

                    }
                </div>
            </div>
            <div className="page-title">
                <h2>
                    Cars from&nbsp;
                    <span className="database-year-select--year">{year}</span>
                    &nbsp;
                    {
                        year >= 2013
                        &&
                        <button className={`btn btn-treasure-hunt ${treasureHunt && 'btn-treasure-hunt--active'}`}
                            onClick={() => {
                                setTreasureHunt(!treasureHunt)
                            }}
                        >Treasure Hunts</button>
                    }
                </h2>
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