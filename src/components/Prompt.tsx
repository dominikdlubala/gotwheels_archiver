import type { ReactNode } from 'react'; 
import ReactDOM from 'react-dom'; 
import classNames from 'classnames'; 

interface PromptProps {
    children: ReactNode;
    success?: boolean; 
    error?: boolean; 
}

export default function Prompt({ children, success, error }: PromptProps) {
    const processedClassNames = classNames('prompt', {'prompt-success': success}, {'prompt-error': error})

    return ReactDOM.createPortal(
        <div className={processedClassNames}>
            {children}
        </div>, 
        document.querySelector('.modal-container') as Element
    )
}