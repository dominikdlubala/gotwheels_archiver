import type { Car } from '../../types/carType'; 
interface CarsListItemProps {
    car: Car
}

export default function CarsListItem({ car }: CarsListItemProps) {

    return (
        <div>
            {car.id} {car.name}
        </div>
    )
}