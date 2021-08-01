import { useRouter } from 'next/router';
import Head from 'next/head';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../components/appBar';
import ReadmeDisplay from '../components/readmeDisplay';

import languages from '../config/languages';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
    },
    modalPaper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function Docs() {
    const classes = useStyles();
    const router = useRouter();
    const language = router.query.language && router.query.language.toLowerCase() in languages ? router.query.language.toLowerCase() : 'nodejs';

    return (
        <div className="background scrollable">
            <AppBar hasSearch={true} title="Docs" />
            <Head>
                <title>Docs</title>
                <meta name="description" content="Written by Carl Schader" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main" >
                <div className={classes.root}>
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
                </div>
            </main>
        </div>
    );
}