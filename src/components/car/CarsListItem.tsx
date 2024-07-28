import { useState } from 'react'; 
import { 
    doc, 
    getDocs, 
    collection
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup'; 

import type { Car, FirebaseUser } from '../../types/types'; 
import { useAddCarMutation, useAddCarToWishlistMutation } from '../../store';
import { useAuth } from '../../hooks/useAuth'; 
import Prompt from '../../components/Prompt'; 

interface CarsListItemProps {
    car: Car
}


export default function CarsListItem({ car }: CarsListItemProps) {

    const { user } = useAuth() as { user: FirebaseUser}; 
    const [addCar] = useAddCarMutation(); 
    const [addCarToWishlist] = useAddCarToWishlistMutation(); 
    const [alert, setAlert] = useState<{error: boolean, message: string} | null>(null); 

    const handleCarAdd = async () => {
        try {
            const userRef = doc(firestore, 'users', user.uid); 
            const carsRef = collection(userRef, 'cars'); 
            const querySnapshot = await getDocs(carsRef); 
            const cars = querySnapshot.docs.map(doc => doc.data() as Car)
            const isAlreadyAdded = cars.some(doc => doc.model === car.model )
            if(isAlreadyAdded) {
                setAlert({error: true, message: 'You already have this car in your collection'}); 
                setTimeout(() => setAlert(null), 2000); 
            } else {
                await addCar({car, userId: user.uid}); 
                setAlert({error: false, message: 'Successfully added the car into your collection'}); 
                setTimeout(() => setAlert(null), 2000); 
            }
        } catch (err) {
            setAlert({error: true, message: 'There was an error'}); 
            setTimeout(() => setAlert(null), 2000); 
        }
    }

    const handleWishlistAdd = async () => {
        try {
            const userRef = doc(firestore, 'users', user.uid); 
            const wishlistRef = collection(userRef, 'wishlist'); 
            const querySnapshot = await getDocs(wishlistRef); 
            const wishlistCars = querySnapshot.docs.map(doc => doc.data() as Car); 
            if(wishlistCars.some(doc => doc.model === car.model)){
                setAlert({error: true, message: 'You already have this car on your wishlist'}); 
                setTimeout(() => setAlert(null), 2000); 
            } else {
                await addCarToWishlist({car, userId: user.uid})
                setAlert({error: false, message: 'Successfully added the car into your wishlist'}); 
                setTimeout(() => setAlert(null), 2000); 
            }
        } catch (err) {
            setAlert({error: true, message: 'There was an error'}); 
            setTimeout(() => setAlert(null), 2000); 
        }
    }

    return (
            <div className="list-item cars-list-item">
                {
                    alert
                    &&
                    <Prompt error={alert.error} success={!alert.error}>{alert.message}</Prompt>
                }
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
                        <button 
                            className="btn-add-car btn-add-collection"
                            onClick={handleCarAdd}
                            >
                            Add to collection
                        </button>
                        <button 
                            className="btn-add-car btn-add-wishlist"
                            onClick={handleWishlistAdd}
                            >Add to wishlist</button>
                    </div>
            </div>
    )
}