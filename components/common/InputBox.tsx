interface InputBoxProps{
    label: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?:string;
    name?:string;
    autoComplete?: string;
}


export const InputBox = ({label,placeholder,value,name,onChange,autoComplete}:InputBoxProps) =>{
    return(
        <div>
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input name={name} onChange={onChange} autoComplete={autoComplete} value={value} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5" placeholder={placeholder} required />
        </div>
        </div>
    )
}