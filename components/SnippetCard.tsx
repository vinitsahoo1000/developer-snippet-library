import { FiTrash, FiEdit, FiEye } from "react-icons/fi";
import { format } from "date-fns";
import { deleteSnippet } from "@/app/actions/snippet";  
import { toast } from "react-toastify";
import { useState } from "react";
import { SyntaxHighlight } from "./SyntaxHighlight";

interface SnippetCardProps {
    id: string;
    title: string;
    code: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
    onDeleteSuccess?: (snippetId: string) => void;
    onClick?: () => void;  // For editing details
    onView? : () => void;  // For viewing details
}

export const SnippetCard = ({
    id,
    title,
    code,
    language,
    createdAt,
    updatedAt,
    onDeleteSuccess,
    onClick,
    onView
}: SnippetCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const formattedCreatedAt = format(new Date(createdAt), "dd MMM, yyyy");
    const formattedUpdatedAt = format(new Date(updatedAt), "dd MMM, yyyy");

    const onDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await deleteSnippet(id);
            if (response) {
                toast.info("Snippet deleted");
                if (onDeleteSuccess) {
                    onDeleteSuccess(id);
                }
            }
        } catch (error) {
            console.error("Error deleting snippet:", error);
            toast.error("An error occurred while deleting the snippet.");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <div className="relative bg-white shadow-lg rounded-xl p-6 w-[350px] h-[480px] hover:shadow-2xl transition-all duration-300 lg:w-[520px] lg:h-[480px]">
            <div className="text-2xl font-bold text-gray-800 text-center mb-2">
                {title}
            </div>
            <div className="text-gray-600 text-sm text-center mb-4">
                <span className="font-bold">Language: </span>
                {language}
            </div>
            <div className="mb-4">
                <pre className="bg-grey-900 p-4 rounded-md h-[250px] overflow-auto whitespace-pre-wrap text-sm">
                    <SyntaxHighlight language={language} code={code}/>
                </pre>
            </div>
            <div className="flex justify-between items-center text-gray-500 text-xs border-t border-gray-200 pt-2">
                <div className="flex items-center">
                    <span>Created: {formattedCreatedAt}</span>
                </div>
                <div className="flex items-center">
                    <span>Updated: {formattedUpdatedAt}</span>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md shadow transition-all duration-300 ${
                        isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                >
                    <FiTrash className="w-4 h-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onView}
                    className="flex items-center gap-1 text-xs bg-slate-500 text-white px-3 py-1 rounded-md shadow hover:bg-slate-600 transition-all duration-300"
                >
                    <FiEye className="w-4 h-4"/> View
                </button>
                <button
                    onClick={onClick}
                    className="flex items-center gap-1 text-xs bg-slate-500 text-white px-3 py-1 rounded-md shadow hover:bg-slate-600 transition-all duration-300"
                >
                    <FiEdit className="w-4 h-4" /> Edit
                </button>
            </div>
        </div>
    );
};
