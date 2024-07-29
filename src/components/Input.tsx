interface InputProps {
    onChange: (x: string) => void; 
    value: string;
    className?: string
}
export default function Input({ onChange, value, className='' }: InputProps) {

    return (
        <input
            className={`search-input ${className}`} 
            placeholder="Search..."
            value={value}
            onChange={(e:React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        />
    )
}