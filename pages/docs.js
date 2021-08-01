import { useState } from 'react';

import Head from 'next/head';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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

const languages = [
    { name: 'Node.js', url: 'https://github.com/KeySpot/node-api', language: 'javascript' },
    { name: 'Python', url: 'https://github.com/KeySpot/python-api', language: 'python' },
];

export default function Docs() {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className="background scrollable">
            <AppBar hasSearch={true} title="Records" />
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
                                value={currentTab}
                                indicatorColor="secondary"
                                onChange={(event, newValue) => setCurrentTab(newValue)}
                            >
                                {languages.map(lang => <Tab key={lang.name} label={lang.name} />)}
                            </Tabs>
                            <ReadmeDisplay url={languages[currentTab].url} language={languages[currentTab].language} />
                        </Paper>
                    </Container>
                </div>
            </main>
        </div>
    );
}