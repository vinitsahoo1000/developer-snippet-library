"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { CodeBox } from "./common/CodeBox";
import { InputBox } from "./common/InputBox";
import { createSnippet, Snippet } from "@/app/actions/snippet"; // adjust path as needed



interface CreateSnippetProps {
    closeWindow: () => void;
    addSnippet: (newSnippet: Snippet) => void;
}

export const LANGUAGES = ["JavaScript","TypeScript","Python","Java","CSharp","Ruby","HTML","CSS","Go","PHP"];

export const CreateSnippet = ({ closeWindow, addSnippet }: CreateSnippetProps) => {
    const [formData, setFormData] = useState({ title: "", code: "", language: "JavaScript" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateSnippet = async () => {
        const { title, code, language } = formData;

        if (!title || !code || !language) {
        toast.error("Please fill in all required fields");
        return;
        }

        setLoading(true);

        const data = new FormData();
        data.append("title", title);
        data.append("code", code);
        data.append("language", language);

        try {
        const response = await createSnippet(data);

        if ("error" in response) {
            toast.error(String(response.error ?? "An unknown error occurred"));
            return;
        }
                
        if (response) {
            toast.success("Snippet created successfully");
            addSnippet(response);
            closeWindow();
        } else {
            toast.info("Snippet creation failed.");
        }
        } catch (error) {
        console.error("Error creating snippet:", error);
        toast.error("An error occurred while creating the snippet.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl space-y-6 relative">
            <button
            onClick={closeWindow}
            className="absolute top-4 right-4 text-xl font-semibold text-gray-600 hover:text-gray-900"
            >
            &times;
            </button>

            <InputBox
            name="title"
            label="Title"
            placeholder="Snippet title..."
            value={formData.title}
            onChange={handleChange}
            />

            <div className="mb-4">
            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">
                Language
            </label>
            <select
                name="language"
                id="language"
                value={formData.language}
                onChange={handleChange}
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
            name="code"
            value={formData.code}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, code: e.target.value })
            }
            />

            <div className="flex justify-center">
            <button
                onClick={handleCreateSnippet}
                className={`w-full py-2 px-4 text-white rounded-lg transition duration-300 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Snippet"}
            </button>
            </div>
        </div>
        </div>
    );
};
