import type { ReactNode } from 'react'; 
import { createPortal } from 'react-dom'; 
import classNames from 'classnames'; 

interface PromptProps {
    children: ReactNode;
    success?: boolean; 
    error?: boolean; 
    handleClose: () => void; 
}

export default function Prompt({ children, success, error, handleClose }: PromptProps) {
    const processedClassNames = classNames('prompt', {'prompt-success': success}, {'prompt-error': error})

    return createPortal(
        <div className={processedClassNames}>
            {children}
            <button 
                className="prompt-button"
                onClick={() => handleClose()}
            >
            X
            </button>
        </div>, 
        document.querySelector('.modal-container') as Element 
    )
}