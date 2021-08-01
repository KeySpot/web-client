import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as syntaxStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Typography from '@material-ui/core/Typography';

export default function CodeBlock({ children, className }) {
    const language = /language-(\w+)/.exec(className || '')[1];

    return (
        <div style={{ textAlign: 'left', fontSize: '1rem' }}>
            <Typography>{language}</Typography>
            <SyntaxHighlighter language={language} style={syntaxStyle} >
                {children}
            </SyntaxHighlighter>
        </div>
    );
}