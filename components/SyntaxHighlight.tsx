"use client"

import Prism from "prismjs";
import 'prismjs/components/prism-markup-templating';
import "prismjs/components/prism-markup"; 
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-php";
import { useEffect } from "react";

interface SyntaxHighlightProps {
    code: string;
    language: string;
}


export const SyntaxHighlight = ({code,language}:SyntaxHighlightProps)=>{
    useEffect(()=>{
                Prism.highlightAll();
            },[language, code])

    return(
        <code className={`language-${language}`}>
                {code}
        </code>
    )
}