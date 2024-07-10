import type { Car } from '../../types/types'; 
interface CarsListItemProps {
    car: Car
}

export default function CarsListItem({ car }: CarsListItemProps) {

    return (
        <div className="list-item cars-list-item">
            <div className="item-details">
                {car.name}
            </div>
        </div>
    )
}