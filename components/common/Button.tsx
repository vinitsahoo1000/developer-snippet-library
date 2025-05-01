
interface ButtonProps{
    label: string;
}

export const Button = ({label}:ButtonProps)=>{
    return(
        <div>
            <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">{label}</button>
        </div>
    )
}