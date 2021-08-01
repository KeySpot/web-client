import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../components/appBar';
import ReadmeDisplay from '../components/readmeDisplay';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
    //   backgroundColor: 'white',
    //   color: 'black'
    },
    modalPaper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));

const languages = {
    'node.js': { url: 'https://github.com/KeySpot/node-api' },
    'python': { url: 'https://github.com/KeySpot/python-api' },
};

const querySearch = 'language=';

export default function Docs() {
    const classes = useStyles();
    const router = useRouter();
    const queryIndex = router.asPath.indexOf(querySearch);
    const [language, setLanguage] = useState(queryIndex !== -1 && router.asPath.substring(queryIndex + querySearch.length).toLowerCase() in languages ? 
        router.asPath.substring(queryIndex + querySearch.length).toLowerCase() : 'node.js');

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
                                onChange={(event, newValue) => setLanguage(newValue)}
                            >
                                {Object.keys(languages).map(name => <Tab key={name} value={name} label={name} />)}
                            </Tabs>
                            <ReadmeDisplay url={languages[language].url} />
                        </Paper>
                    </Container>
                </div>
            </main>
        </div>
    );
}