import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HtmlBase from '../components/htmlBase';
import CodeBlock from '../components/codeBlock';
import Footer from '../components/footer';
import PricingCard from '../components/pricingCard';
import appDev from '../public/app-dev.jpg';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
  },
  containerTop: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12)
  },
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  containerBottom: {
    marginTop: theme.spacing(12),
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 Records', '20 Secrets per Record', 'Unlimited Sharing', 'Secrets Referencing', 'Secrets Referencing Accross Projects'],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
    buttonColor: 'default',
    href: '/api/auth/login',
  },
  {
    title: 'Pro',
    //   subheader: 'Most popular',
    price: '5',
    description: ['Unlimited Records', 'Unlimited Secrets per Record', 'Unlimited Sharing', 'Secrets Referencing', 'Secrets Referencing Accross Projects'],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
    href: '/api/subscription',
  },
];

export default function Home() {
  const classes = useStyles();

  return (
    <HtmlBase>
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper} >
              <Grid className={classes.containerTop} container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Manage your application environments, API keys, and configurations with KeySpot</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography >Whether you are a small team or a large organization, KeySpot gives you the tools to manage environment variables, secrets, and sensitive data for your projects.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/api/auth/login" passHref>
                    <Button variant="contained" color="secondary" >Sign up for KeySpot</Button>
                  </Link>
                </Grid>
              </Grid>

              <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3" >Easy to Use</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ReactMarkdown components={{ code: CodeBlock }} >
                    {"\n```javascript\nconst keyspot = require('keyspot');\n\nconst record = await keyspot('61045a6e389ee691f945fd34');\n\nconsole.log(record);\n\n\n```"}
                  </ReactMarkdown>
                </Grid>
                <Grid item xs={12}>
                  <ReactMarkdown components={{ code: CodeBlock }} >
                    {"```bash\n$ npm i keyspot\n$ node index.js\n\n{\n\tapiKey: asi12mdkKAWS21d,\n\tenvironment: prod\n}\n```"}
                  </ReactMarkdown>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" >All environments in one place</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" >Share with your team</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" >Easy to use APIs</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    No more juggling .env files and using cloud specific secret managers. KeySpot puts all your variables in one place and is portable to any language and cloud provider.
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    KeySpot makes it easy to share your records with your team through our auto-generated access keys.
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    Our APIs are designed to be as easy to use as possible. In just one line of code you can access and update your records in any language.
                    </Typography>
                </Grid>
              </Grid>

              <Grid className={classes.container} container spacing={3}>
                <Grid item xs={1} />
                <Grid item xs={4}>
                  <Typography variant="h5">
                    <p>{'"KeySpot is awesome, it makes it really easy for my team and I to manage our dev, test, staging, and prod environments across all our microservices."'}</p>
                  </Typography>
                  <Typography>
                    <span>Carl Schader</span>
                    <br></br>
                    <span>Software Engineer</span>
                  </Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <Image src={appDev} alt="application development" />
                </Grid>
              </Grid>

              <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12} >
                  <Typography variant="h3">
                    Pricing
                    </Typography>
                </Grid>
                <Grid item cs={12} >
                  <Typography>
                    Whether you are a small team or a large organization, empower your team by using KeySpot to manage environment variables, secrets, and sensitive data for your projects.
                    </Typography>
                </Grid>
                {tiers.map(tier => <Grid key={tier.title} item xs={12 / tiers.length}><PricingCard tier={tier} /></Grid>)}
              </Grid>

              <Grid className={classes.containerBottom} container spacing={3}>
                <Footer />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </HtmlBase>
  );
}