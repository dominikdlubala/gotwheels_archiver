import type { Car } from '../../types/types'; 
interface CarsListItemProps {
    car: Car
}

export default function CarsListItem({ car }: CarsListItemProps) {

    return (
            <div className="list-item cars-list-item">
                    {
                        car.photo_url
                        &&
                        <img src={car.photo_url} alt="car-image" className="item-image car-image" />
                    }

                    <div className="list-item-details">
                        <p>
                            <span className="item-details-title">Model: <br></br></span>{car.model}
                        </p>
                        {
                            car.series 
                            &&
                            <p>
                                <span className="item-details-title">Series: <br></br></span>{car.series}
                            </p>
                        }
                        {
                            car.series_num
                            &&
                            <p>
                                <span className="item-details-title">Series #: <br></br></span>{car.series_num}
                            </p>
                        }
                        {
                            car.year
                            &&
                            <p>
                                <span className="item-details-title">Year: <br></br></span>{car.year}
                            </p>
                        }
                        {
                            car.toy_num
                            &&
                            <p>
                                <span className="item-details-title">Toy #: <br></br></span>{car.toy_num}
                            </p>
                        }
                    </div>

                    <div className="list-item-buttons">
                        <button className="btn-add-car">Add to collection</button>
                        <button className="btn-add-car">Add to wishlist</button>
                    </div>
            </div>
    )
}