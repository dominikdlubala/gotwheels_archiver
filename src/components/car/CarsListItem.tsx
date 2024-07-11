import type { Car } from '../../types/types'; 
interface CarsListItemProps {
    car: Car
}

export default function CarsListItem({ car }: CarsListItemProps) {

    return (
        <div className="list-item cars-list-item">
            <div className="item-details">
                {
                    car.imageUrl
                    &&
                    <img src={car.imageUrl} alt="car-image" className="item-image car-image" />
                }
                <h3>
                    {car.name}
                </h3>
            </div>
        </div>
    )
}