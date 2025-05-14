
interface ButtonProps{
    label: string;
    onClick: ()=> void
}

export const Button = ({label,onClick}:ButtonProps)=>{
    return(
        <div>
            <button type="submit" onClick={onClick} className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">{label}</button>
        </div>
    )
}