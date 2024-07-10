import { useEffect } from 'react'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 

// type addCollectionMutation = ReturnType<typeof useAddCollectionMutation>[0]; 

interface CollectionModalProps {
    handleFormSubmit: (x: {userId: string, name: string, file: FileList | undefined}) => void; 
    userId: string;   
    isAdding: boolean; 
    handleClose: () => void; 
    show: boolean; 
}

type CollectionFormValues = {
    name: string; 
    file?: FileList; 
}

export default function CollectionModal({ handleFormSubmit, userId, isAdding, handleClose, show }: CollectionModalProps) {


    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm<CollectionFormValues>(); 

    const onSubmit: SubmitHandler<CollectionFormValues> = async ({ name, file }: CollectionFormValues) => {
        try {
            await handleFormSubmit({userId, name, file}); 
        } catch (error) {
            console.error('Failed to add collection'); 
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset(); 
        }
    }, [isSubmitSuccessful, reset])

    const showHideClassName = show ? "modal display-block" : "modal display-none"; 

    return (
        <div className={showHideClassName}>
            <div className="modal-main form-container">
                <div className="modal-header">
                    <button className="btn-close" onClick={handleClose}>Close</button>
                </div>
                {/* <form className="modal-form" onSubmit={onSubmit}>
                    <div className="form-title">
                        Add a collection
                    </div>
                    <div className="form-group">
                        <input className="form-input" value={name} onChange={handleChange} />
                    </div>
                        <button className="btn-submit" type="submit" disabled={isAdding}>{ isAdding ? 'Submitting...' : 'Submit'}</button>
                </form> */}
                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-title">
                        Add a collection
                    </div> 
                    <div className="form-group">
                        <input 
                            className="form-input" 
                            type="text"
                            {...register("name", {
                                required: {
                                    value: true, 
                                    message: 'This field is required'
                                }
                            })}
                        />
                    </div>
                    {
                        errors.name
                        && 
                        <span className="input-validate">{errors.name.message}</span>
                    }
                    <div className="form-group">
                        <input 
                            className="form-input" 
                            type="file"
                            {...register("file")}
                        />
                    </div>
                        <button className="btn-submit" type="submit" disabled={isAdding}>{ isAdding ? 'Submitting...' : 'Submit'}</button>
                </form>
            </div>
        </div>
    )
}