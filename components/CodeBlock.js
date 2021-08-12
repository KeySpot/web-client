import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as syntaxStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Typography from '@material-ui/core/Typography';
import Responsive from './Responsive';

export default function CodeBlock({ children, className }) {
  const language = /language-(\w+)/.exec(className || '')[1];

  return (
    <Responsive
      desktop={
        <div style={{ textAlign: 'left', fontSize: '1rem' }}>
          <Typography style={{ color: "white", paddingLeft: "1rem" }} >{language}</Typography>
          <SyntaxHighlighter language={language} style={syntaxStyle} >
            {children}
          </SyntaxHighlighter>
        </div>
      }
      mobile={
        <div style={{ textAlign: 'left', fontSize: '0.67rem' }}>
          <Typography>{language}</Typography>
          <SyntaxHighlighter language={language} style={syntaxStyle} >
            {children}
          </SyntaxHighlighter>
        </div>
      }
    />
  );
}