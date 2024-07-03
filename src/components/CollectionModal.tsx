import { useState } from 'react'; 

// type addCollectionMutation = ReturnType<typeof useAddCollectionMutation>[0]; 

interface CollectionModalProps {
    handleFormSubmit: (x: {userId: number, name: string}) => void; 
    userId: number;   
    isAdding: boolean
}

export default function CollectionModal({ handleFormSubmit, userId, isAdding }: CollectionModalProps) {

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={handleChange} />
                <button type="submit" disabled={isAdding}>{ isAdding ? 'Submitting...' : 'Submit'}</button>
            </form>
        </div>
    )
}