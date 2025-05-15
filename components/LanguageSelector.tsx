import { Language } from "@prisma/client"; 
import { cn } from "@/lib/utils"; 

interface LanguageSelectorProps {
    value: Language;
    onChange: (value: Language) => void;
}

const LANGUAGES: Language[] = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "CSharp",
    "Ruby",
    "HTML",
    "CSS",
    "Go",
    "PHP",
];

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
    return (
        <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {LANGUAGES.map((lang) => (
            <button
                key={lang}
                type="button"
                onClick={() => onChange(lang)}
                className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-150",
                value === lang
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                )}
            >
                {lang}
            </button>
            ))}
        </div>
        </div>
    );
};
