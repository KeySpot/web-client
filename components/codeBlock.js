import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as syntaxStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeBlock({ children, className }) {
    const language = /language-(\w+)/.exec(className || '')[1];

    return (
        <SyntaxHighlighter language={language} style={syntaxStyle} >
            {children}
        </SyntaxHighlighter>
    );
}