

export const CodeBox = ({ onChange,value, name }: { onChange: React.ChangeEventHandler<HTMLTextAreaElement>, value?: string, name: string }) =>{
    

    return(
        <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Code</label>
        <textarea onChange={onChange} value={value} id="description" name="code" rows={7} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Write your code here..."></textarea>
        </div>
    )
}