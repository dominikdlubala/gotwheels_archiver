import { useState } from 'react'; 
interface CarsModalProps {
    onSubmit: (name: string) => void; 
    isAdding: boolean; 
    show: boolean; 
    handleClose: () => void
}

export default function CarsModal({ onSubmit, isAdding}: CarsModalProps) {
    const [name, setName] = useState(''); 

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        try {
            onSubmit(name); 
            setName(''); 
        } catch (error) {
            console.error('Problem with adding a car'); 
        }
    }

    return (
        <div> 
            <form onSubmit={handleFormSubmit}>
                <input value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value) } />
                <button type="submit" disabled={isAdding}>{isAdding ? '...Submitting' : 'Submit'}</button>
            </form>
        </div>
    )
}