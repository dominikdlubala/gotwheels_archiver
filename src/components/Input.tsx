interface InputProps {
    onChange: (x: string) => void; 
    value: string;
}
export default function Input({ onChange, value }: InputProps) {

    return (
        <input
            className="search-input" 
            placeholder="Search..."
            value={value}
            onChange={(e:React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        />
    )
}