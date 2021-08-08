import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HtmlBase from '../components/HtmlBase';
import ReadmeDisplay from '../components/ReadmeDisplay';
import languages from '../config/languages';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function Docs() {
  const classes = useStyles();
  const router = useRouter();
  const language = router.query.language && router.query.language.toLowerCase() in languages ? router.query.language.toLowerCase() : 'nodejs';

  return (
    <HtmlBase title="Docs" >
      <Container maxWidth="lg" >
        <Paper className={classes.paper}>
          <Tabs
            value={language}
            indicatorColor="secondary"
            onChange={(event, newValue) => router.push(`/docs?language=${newValue}`)}
          >
            {Object.keys(languages).map(name => <Tab key={name} value={name} label={<>{languages[name].icon}{name}</>} />)}
          </Tabs>
          <ReadmeDisplay url={languages[language].url} />
        </Paper>
      </Container>
    </HtmlBase>
  );
}