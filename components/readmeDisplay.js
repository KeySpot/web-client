import useSWR from 'swr';
import ReactMarkdown from 'react-markdown';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CodeBlock from './codeBlock';
import MarkdownLink from './markdownLink';

const useStyles = makeStyles((theme) => ({

}));

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

export default function readmeDisplay({ url, language }) {
    const classes = useStyles();
    const { data, error } = useSWR(`/api/getReadme?url=${readmeUrl(url)}`, fetcher);

    if (error) {
        return (
            <Typography variant="h4" >
                Error: {error.toString()}
            </Typography>
        );
    } else if (!data) {
        return (
            <Typography variant="h4" >
                Loading...
            </Typography>
        );
    } else {
        return (
            <Typography>
                <ReactMarkdown components={components} children={data.content} />
            </Typography>
        );
    }
};