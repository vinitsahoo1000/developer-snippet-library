import { useEffect, useState, useCallback } from "react";
import { CodeBox } from "./common/CodeBox";
import { InputBox } from "./common/InputBox";
import { editSnippet, getSnippet, Snippet } from "@/app/actions/snippet";
import { LANGUAGES } from "./CreateSnippet";
import { toast } from "react-toastify";



interface SnippetEditorProps {
    snippet: Snippet;
    closeWindow: () => void;
    updateSnippetInUI: (updatedSnippet: Snippet) => void;
}

export const SnippetEditor = ({ snippet, closeWindow, updateSnippetInUI }: SnippetEditorProps) => {
    const [formData, setFormData] = useState({
        title: snippet.title,
        language: snippet.language,
        code: snippet.code
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getSingleSnippet = useCallback(async () => {
        try {
            const response = await getSnippet(snippet.id);
            if (response.snippet) {
                setFormData({
                    title: response.snippet.title,
                    language: response.snippet.language,
                    code: response.snippet.code,
                });
            }
        } catch (error) {
            console.error("Error fetching snippet:", error);
        }
    }, [snippet.id]);

    useEffect(() => {
        getSingleSnippet();
    }, [getSingleSnippet]);

    const updateSnippet = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("language", formData.language);
            formDataToSend.append("code", formData.code);

            const response = await editSnippet(snippet.id, formDataToSend);

            if (response) {
                const updatedSnippet: Snippet = {
                    ...snippet,
                    ...formData
                };
                toast.success("Snippet updated successfully!!!")
                updateSnippetInUI(updatedSnippet);
                closeWindow();
            }
            
        } catch (error) {
            console.error("Error updating snippet:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-xl space-y-6 relative">
                <button
                    onClick={closeWindow}
                    className="absolute top-4 right-4 text-xl font-semibold text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <InputBox
                    value={formData.title}
                    name="title"
                    label="Title"
                    placeholder="Snippet title..."
                    onChange={handleInputChange}
                />
                <div className="mb-4">
            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">
                Language
            </label>
            <select
                name="language"
                id="language"
                value={formData.language}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg"
            >
                {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
                ))}
            </select>
            </div>
                <CodeBox
                    value={formData.code}
                    language={formData.language}
                    onChange={(value)=>{
                        setFormData((prev)=> ({...prev, code: value}))
                    }}
                />
                <div className="flex justify-center">
                    <button
                        onClick={updateSnippet}
                        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        Save Snippet
                    </button>
                </div>
            </div>
        </div>
    );
};
