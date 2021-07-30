import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';
import AccessKeyContext from '../context/accessKeyContext.js';
import colors from '../public/colors.json';
import '../styles/styles.css';

const theme = createTheme(colors);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [accessKey, setAccessKey] = React.useState(null);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>KeySpot</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
          <UserProvider>  
            <AccessKeyContext.Provider value={[accessKey, setAccessKey]}>
              <Component {...pageProps} />
            </AccessKeyContext.Provider>
          </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};