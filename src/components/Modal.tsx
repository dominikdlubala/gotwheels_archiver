import { ReactNode } from 'react'; 

interface ModalProps {
    handleClose: () => void; 
    children: ReactNode[]; 
    show: boolean; 
}
export default function Modal( {handleClose, show, children}: ModalProps ) {

    const showHideClass = show ? "modal display-block" : "modal display-none"; 

    return (
        <div className={showHideClass}>
            <section className="modal-main">
                {children}
            </section>
            <button className="btn-add" onClick={handleClose}>
                Close
            </button>
        </div>
    )
}
