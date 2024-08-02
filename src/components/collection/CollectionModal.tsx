import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';  
import { useForm, SubmitHandler } from 'react-hook-form'; 

import Prompt from '../Prompt'; 

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

    const [isError, setIsError] = useState(false); 
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm<CollectionFormValues>(); 

    const onSubmit: SubmitHandler<CollectionFormValues> = async ({ name, file }: CollectionFormValues) => {
        try {
            if(file){
                setFileName(file[0].name); 
            }
            await handleFormSubmit({userId, name, file});
            setFileName('');  
        } catch (error) {
            setIsError(true); 
            setTimeout(() => setIsError(false), 2000); 
        }
    }

    const [fileName, setFileName] = useState<string>(''); 

    useEffect(() => {
        if(isSubmitSuccessful){
            reset(); 
        }
    }, [isSubmitSuccessful, reset])

    const showHideClassName = show ? "modal display-flex" : "modal display-none"; 

    return ReactDOM.createPortal(
        <div className={showHideClassName}>
            { isError && <Prompt handleClose={() => setIsError(false)} error>Problem with adding a collection</Prompt>}
            <div className="modal-background" onClick={() => handleClose() }></div>
            <div className="modal-main form-container">
                <div className="modal-header">
                    <button className="btn-close" onClick={handleClose}>Close</button>
                </div>
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
                        <label>Add a picture</label>
                        <input 
                            className="form-input input-file" 
                            type="file"
                            id="file-upload"
                            {...register("file")}
                        />
                        <label className="label-file" htmlFor="file-upload">Upload</label>
                        {fileName && <span className="file-name">{fileName}</span>}
                    </div>
                        <button className="btn-submit" type="submit" disabled={isAdding}>{ isAdding ? 'Submitting...' : 'Submit'}</button>
                </form>
            </div>
        </div>, 

        document.querySelector('.modal-container') as Element
    )
}