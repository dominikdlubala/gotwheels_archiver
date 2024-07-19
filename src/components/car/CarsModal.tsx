import ReactDOM from 'react-dom'; 
import { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
interface CarsModalProps {
    onSubmit: (name: string, file: FileList) => void; 
    isAdding: boolean; 
    show: boolean; 
    handleClose: () => void; 
    error: boolean;
}

interface CarFormValues {
    name: string; 
    fileList: FileList; 
}

export default function CarsModal({ onSubmit, isAdding, show, handleClose, error}: CarsModalProps) {
    const [fileName, setFileName] = useState<string>(''); 
    const { register, handleSubmit } = useForm<CarFormValues>(); 

    const handleFormSubmit = async ({ name, fileList }: CarFormValues) => {
        if(!error) {
            try {
                setFileName(fileList[0].name); 
                await onSubmit(name, fileList); 
            } catch (error) {
                console.error('Problem with adding a car'); 
            }
        }
    }

    const showHideClassName = show ? "modal display-flex" : "modal display-none"; 

    return ReactDOM.createPortal(
        <div className={showHideClassName}> 
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
                            {...register("name")}
                        />
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
                    </div>
                    <button className="btn-submit" type="submit" disabled={isAdding}>{isAdding ? '...Submitting' : 'Submit'}</button>
                </form>
                {
                    error 
                    &&
                    <span className="input-validate">Problem with adding car</span>
                }
            </div>
        </div>, 

        document.querySelector('.modal-container') as Element
    )
}