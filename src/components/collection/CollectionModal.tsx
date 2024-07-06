import { useState } from 'react'; 

// type addCollectionMutation = ReturnType<typeof useAddCollectionMutation>[0]; 

interface CollectionModalProps {
    handleFormSubmit: (x: {userId: string, name: string}) => void; 
    userId: string;   
    isAdding: boolean; 
    handleClose: () => void; 
    show: boolean; 
}

export default function CollectionModal({ handleFormSubmit, userId, isAdding, handleClose, show }: CollectionModalProps) {

    const [name, setName] = useState(''); 

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value); 
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        try {
            await handleFormSubmit({userId, name}); 
            setName(''); 
        } catch (error) {
            console.error('Failed to add collection'); 
        }
    }

    const showHideClassName = show ? "modal display-block" : "modal display-none"; 

    return (
        <div className={showHideClassName}>
            <div className="modal-main form-container">
                <div className="modal-header-div">
                    <button className="btn-close" onClick={handleClose}>Close</button>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-title">
                        Add a collection
                    </div>
                    <div className="form-group">
                        <input className="form-input" value={name} onChange={handleChange} />
                    </div>
                        <button className="btn-submit" type="submit" disabled={isAdding}>{ isAdding ? 'Submitting...' : 'Submit'}</button>
                </form>
            </div>
        </div>
    )
}