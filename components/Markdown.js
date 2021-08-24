import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import CodeBlock from './CodeBlock';
import MarkdownLink from './MarkdownLink';

const components = {
    code: CodeBlock,
    a: MarkdownLink,
};

export default function Markdown({ children }) {
    return (
        <Typography>
            <ReactMarkdown components={components} >{children}</ReactMarkdown>
        </Typography>
    );
};