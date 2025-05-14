"use client"; 
import { Snippet } from "@/app/actions/snippet";
import { Button } from "./common/Button";
import { toast } from "react-toastify";



interface SnippetView {
    snippet: Snippet;
    closeWindow: () => void;
}

export const SnippetView = ({ snippet, closeWindow }:SnippetView)=>{

    const copyCode = async () => {
    if (!navigator.clipboard) {
        toast.error("Clipboard API not supported");
        return;
    }

    try {
        await navigator.clipboard.writeText(snippet.code || "");
        toast.success("Code copied to clipboard!");
    } catch (error) {
        toast.error("Failed to copy code");
        console.error("Clipboard error:", error);
    }
};


    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-6">
            <button
            onClick={closeWindow}
            className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-700"
            aria-label="Close"
            >
            &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            {snippet.title}
            </h2>
            <pre className="bg-gray-100 text-sm rounded-md p-4 overflow-x-auto border border-gray-200">
            <code>{snippet.code}</code>
            </pre>
            <div className="text-sm text-gray-500 italic">
            Language: {snippet.language}
            </div>
            <Button label="Copy Code" onClick={copyCode} />
        </div>
        </div>
    )
}