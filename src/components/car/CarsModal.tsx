import { useState } from 'react'; 
interface CarsModalProps {
    onSubmit: (name: string) => void; 
    isAdding: boolean; 
    show: boolean; 
    handleClose: () => void; 
    error: boolean;
}

export default function CarsModal({ onSubmit, isAdding, show, handleClose, error}: CarsModalProps) {
    const [name, setName] = useState(''); 

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        if(!error) {
            try {
                onSubmit(name); 
                setName(''); 
            } catch (error) {
                console.error('Problem with adding a car'); 
            }
        }
    }

    const showHideClassName = show ? "modal display-flex" : "modal display-none"; 

    return (
        <div className={showHideClassName}> 
            <div className="modal-main form-container">
                <div className="modal-header">
                    <button className="btn-close" onClick={handleClose}>Close</button>
                </div>
                <form  className="modal-form" onSubmit={handleFormSubmit}>
                    <div className="form-title">
                        Add a car
                    </div>
                    <div className="form-group">
                        <input className="form-input" value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value) } />
                    </div>
                    <button className="btn-submit" type="submit" disabled={isAdding}>{isAdding ? '...Submitting' : 'Submit'}</button>
                </form>
                {
                    error 
                    &&
                    <span className="input-validate">Problem with adding car</span>
                }
            </div>
        </div>
    )
}