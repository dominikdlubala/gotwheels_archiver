import ReactDOM from 'react-dom'; 
import { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form'; 
import Prompt from '../Prompt'; 

interface CarsModalProps {
    onSubmit: (name: string, file: FileList) => void; 
    isAdding: boolean; 
    show: boolean; 
    handleClose: () => void; 
}

interface CarFormValues {
    name: string; 
    fileList: FileList; 
}

export default function CarsModal({ onSubmit, isAdding, show, handleClose}: CarsModalProps) {
    const [fileName, setFileName] = useState<string>(''); 
    const [isError, setIsError] = useState(false); 
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<CarFormValues>(); 

    const handleFormSubmit = async ({ name, fileList }: CarFormValues) => {
        try {
            setFileName(fileList[0].name); 
            await onSubmit(name, fileList); 
        } catch (error) {
            setIsError(true); 
            setTimeout(() => setIsError(false), 2000); 
        }
    }

    useEffect(() => {
        isSubmitSuccessful && reset(); 
    }, [])

    const showHideClassName = show ? "modal display-flex" : "modal display-none"; 

    return ReactDOM.createPortal(
        <div className={showHideClassName}> 
            { isError && <Prompt error>Problem with adding a car</Prompt>}
            <div className="modal-background" onClick={() => handleClose() }></div>
            <div className="modal-main form-container">
                <div className="modal-header">
                    <button className="btn-close" onClick={handleClose}>Close</button>
                </div>
                <form  className="modal-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="form-title">
                        Add a car
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-input" 
                            type="text"
                            placeholder="Car name"
                            {...register("name", {
                                required: {
                                    value: true, 
                                    message: 'This field is required'
                                }
                            })}
                        />
                        { errors.name && <span className="input-validate">{errors.name.message}</span>}
                    </div>
                    <div className="form-group file-group">
                        <label>Add a picture</label>
                        <input
                            className="form-input input-file"
                            type="file"
                            id="file-upload"
                            {...register("fileList")}
                        />
                        <label className="label-file" htmlFor="file-upload">Upload</label>
                        {fileName && <span className="file-name">{fileName}</span>}
                        {/* { errors.fileList && <span className="input-validate">{errors.fileList.message}</span>} */}
                    </div>
                    <button className="btn-submit" type="submit" disabled={isAdding}>{isAdding ? '...Submitting' : 'Submit'}</button>
                </form>
            </div>
        </div>, 

        document.querySelector('.modal-container') as Element
    )
}