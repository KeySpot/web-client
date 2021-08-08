import useSWR from 'swr';
import ReactMarkdown from 'react-markdown';

import Typography from '@material-ui/core/Typography';

import Spinner from './spinner';
import CodeBlock from './CodeBlock';
import MarkdownLink from './MarkdownLink';

function readmeUrl(githubUrl, branch='main') {
    const oldURL = new URL(githubUrl);
    const path = githubUrl.slice(githubUrl.length - 4) === '.git' ?
        oldURL.pathname.slice(0, oldURL.pathname.length - 4) :
        oldURL.pathname;
    return `https://raw.githubusercontent.com${path}/${branch}/README.md`
}

const fetcher = url => fetch(url).then(res => res.json());

const components = {
    code: CodeBlock,
    a: MarkdownLink,
};

export default function ReadmeDisplay({ url }) {
    const { data, error } = useSWR(`/api/getReadme?url=${readmeUrl(url)}`, fetcher);

    if (error) {
        return (
            <Typography variant="h4" >
                Error: {error.toString()}
            </Typography>
        );
    } else if (!data) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spinner size={100} />
            </div>
        );
    } else {
        return (
            <Typography>
                <ReactMarkdown components={components} >{data.content}</ReactMarkdown>
            </Typography>
        );
    }
};