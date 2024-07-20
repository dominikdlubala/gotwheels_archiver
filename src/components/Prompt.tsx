import type { ReactNode } from 'react'; 
import classNames from 'classnames'; 

interface PromptProps {
    children: ReactNode;
    success?: boolean; 
    error?: boolean; 
}

export default function Prompt({ children, success, error }: PromptProps) {
    const processedClassNames = classNames('prompt', {'prompt-success': success}, {'prompt-error': error})

    return (
        <div className={processedClassNames}>
            {children}
        </div>
    )
}