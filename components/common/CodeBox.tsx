import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { cpp } from '@codemirror/lang-cpp';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';


interface CodeBoxProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
}

export const CodeBox = ({ onChange,value,language }: CodeBoxProps) =>{
    
    const getLanguageExtension = (language: string) => {
        switch (language.toLowerCase()) {
            case 'javascript':
            case 'typescript': 
                return javascript();
            case 'python':
                return python();
            case 'php':
                return php();
            case 'java':
                return java();
            case 'html':
                return html();
            case 'css':
                return css();
            case 'go':
                return go();
            case 'csharp':
                return cpp(); 
            case 'json':
                return json();
            default:
                return javascript(); 
        }
};


    return(
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Code
        </label>
        <CodeMirror
        value={value}
        height="250px"
        theme="dark"
        extensions={[getLanguageExtension(language), EditorView.lineWrapping]}
        onChange={(val) => onChange(val)}
        />
        </div>
    )
}