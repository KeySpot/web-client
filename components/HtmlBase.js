import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
}));

export default function HtmlBase({ children = [], title = "KeySpot" }) {
  const classes = useStyles();

  return (
    <div className="background scrollable">
      <AppBar />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div>
          <div className={classes.root} >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}