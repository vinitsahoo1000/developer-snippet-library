import { useEffect, useState, useCallback } from "react";
import { SnippetCard } from "./SnippetCard";
import { CreateSnippet } from "./CreateSnippet";
import { SnippetEditor } from "./SnippetEditor";
import {  Snippet, getSnippets } from "@/app/actions/snippet"; 
import { SnippetView } from "./SnippetView";

export const SnippetGrid = () => {
    const [snippets, setSnippets] = useState<Snippet[]>([]); 
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [isCreateSnippetOpen, setCreateSnippetOpen] = useState<boolean>(false); 
    const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null); 
    const [snippetView,setSnippetView] = useState<Snippet | null>(null); 
    
    const fetchSnippets = useCallback(async () => {
        try {
            setIsLoading(true);
            const { snippets } = await getSnippets(); 
            setSnippets(snippets);
        } catch (error) {
            console.error("Failed to fetch snippets:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    

    useEffect(() => {
        fetchSnippets(); 
    }, [fetchSnippets]);

    const toggleCreateSnippetDialog = () => {
        setCreateSnippetOpen((prev) => !prev); 
    };

    
    const addSnippet = (newSnippet: Snippet) => {
        setSnippets((prevSnippets) => [newSnippet, ...prevSnippets]);
    };

    
    const removeSnippet = (snippetId: string) => {
        setSnippets((prevSnippets) => prevSnippets.filter((snippet) => snippet.id !== snippetId));
    };

    
    const updateSnippetInUI = (updatedSnippet: Snippet) => {
        setSnippets((prevSnippets) =>
            prevSnippets.map((snippet) =>
                snippet.id === updatedSnippet.id ? updatedSnippet : snippet
            )
        );
    };

    return (
        <div className="relative min-h-screen p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-blue-500">
                        Loading snippets...
                    </div>
                ) : snippets.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No snippets available. Please add some snippets.
                    </div>
                ) : (
                    snippets.map((snippet) => (
                        <SnippetCard
                            key={snippet.id} 
                            {...snippet} 
                            onDeleteSuccess={removeSnippet} 
                            onClick={() => setSelectedSnippet(snippet)} 
                            onView={()=> setSnippetView(snippet)}
                        />
                    ))
                )}
            </div>

            {selectedSnippet && (
                <SnippetEditor
                    snippet={selectedSnippet}
                    closeWindow={() => setSelectedSnippet(null)} 
                    updateSnippetInUI={updateSnippetInUI} 
                />
            )}
            {snippetView && (
                <SnippetView snippet={snippetView} 
                closeWindow={() => setSnippetView(null)}
                />
            )}
            <button
                onClick={toggleCreateSnippetDialog}
                className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Create Snippet"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            {isCreateSnippetOpen && (
                <CreateSnippet
                    addSnippet={addSnippet} 
                    closeWindow={toggleCreateSnippetDialog} 
                />
            )}
        </div>
    );
};
