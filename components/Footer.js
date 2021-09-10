import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
      Plandid LLC
      {/* </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  // {
  //   title: 'Company',
  //   description: ['Team', 'History', 'Contact us', 'Locations'],
  //   hrefs: [],
  // },
  {
    title: 'Contact us',
    description: ['Email: support@plandid.app', 'Phone: (720) 413-6933', ],
    hrefs: [],
  },
  // {
  //   title: 'Features',
  //   description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  //   hrefs: [],
  // },
  // {
  //   title: 'Resources',
  //   description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  //   hrefs: [],
  // },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
    hrefs: ['/privacy', '/terms'],
  },
];

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item, index) => (
                  <li key={item}>
                    <NextLink href={footer.hrefs[index] || '#'} passHref>
                      <Link variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </NextLink>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
        {/* <a style={{color: 'white'}} href='https://www.freepik.com/vectors/background'>Background vector created by freepik - www.freepik.com</a> */}
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}