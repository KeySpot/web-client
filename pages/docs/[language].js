import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HtmlBase from '../../components/HtmlBase';
import Markdown from '../../components/Markdown';
import languages from '../../config/languages';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function Docs({ content, language }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <HtmlBase title="Docs" >
      <Container maxWidth="lg" >
        {/* <Paper className={classes.paper}> */}
          <Tabs
            value={language}
            indicatorColor="secondary"
            onChange={(event, newValue) => router.push(`/docs/${newValue}`)}
          >
            {Object.keys(languages).map(name => <Tab key={name} value={name} label={<>{languages[name].icon}{name}</>} />)}
          </Tabs>
          {/* <ReadmeDisplay url={languages[language].url} /> */}
          <Markdown>{content}</Markdown>
        {/* </Paper> */}
      </Container>
    </HtmlBase>
  );
}

function readmeUrl(githubUrl, branch='main') {
    const oldURL = new URL(githubUrl);
    const path = githubUrl.slice(githubUrl.length - 4) === '.git' ?
        oldURL.pathname.slice(0, oldURL.pathname.length - 4) :
        oldURL.pathname;
    return `https://raw.githubusercontent.com${path}/${branch}/README.md`
}

export async function getStaticProps(context) {
    const url = languages[context.params.language].url;
    const res = await fetch(readmeUrl(url));
    const data = await res.text();
    
    return {
      props: {
        content: data,
        language: context.params.language
      },
    }
  }
  
  export async function getStaticPaths() {
    return {
      paths: Object.keys(languages).map(key => ({ params: { language: key } })),
      fallback: false,
    }
  }