import process from 'process';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './AppBar';
import Responsive from './Responsive';


const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
}));

export default function HtmlBase({ children = [], title = "KeySpot" }) {
  const classes = useStyles();

  return (
    <div className="background scrollable noHorizontalScroll">
      <AppBar />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6665226199759525" crossOrigin="anonymous"></script>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}>
        </script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${googleAnalyticsId}');`
          }}
        />
      </Head>

      <main className="main">
        <Responsive
          desktop={
            <Container spacing={3} className={classes.root} >
              {children}
            </Container>
          }
          mobile={
            <div className={classes.root} >
              {children}
            </div>
          }
        />
      </main>
    </div>
  );
}