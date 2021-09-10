import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HtmlBase from '../components/HtmlBase';
import Responsive from '../components/Responsive';
import CodeBlock from '../components/CodeBlock';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';
import appDev from '../public/app-dev.jpg';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import Fab from '@material-ui/core/Fab';
import SubjectIcon from '@material-ui/icons/Subject';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Terminal from 'react-animated-term';
import SwipeTabs from '../components/SwipeTabs';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
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
  heroButton: {
    padding: theme.spacing(3),
  },
  heroButtonItem: {
    margin: theme.spacing(1),
  }
}));

const tiers = [
  {
    title: 'Features',
    // price: '0',
    description: ['Unlimited Records', 'Unlimited Secrets', 'Unlimited Sharing', 'Unlimited Referencing Across Projects'],
    buttonText: 'Sign Up',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
    href: '/api/auth/login',
  },
  // {
  //   title: 'Pro',
  //   //   subheader: 'Most popular',
  //   price: '5',
  //   description: ['Unlimited Records', 'Unlimited Secrets per Record', 'Unlimited Sharing', 'Secrets Referencing', 'Secrets Referencing Across Projects'],
  //   buttonText: 'Get started',
  //   buttonVariant: 'contained',
  //   buttonColor: 'secondary',
  //   href: '/api/subscription',
  // },
];

function HeroButton({ href = "", icon = null, title = "", children = null }) {
  const classes = useStyles();

  return (
    <Responsive
      desktop={
        <Link href={href} passHref >
          <Fab
            variant="extended"
            color="secondary"
            className={classes.heroButton}
            style={{ minHeight: "5em", minWidth: "15em" }}
          >
            <div className={classes.heroButtonItem} >{icon}</div>
            <div className={classes.heroButtonItem} >{title}</div>
          </Fab>
        </Link>
      }
      mobile={
        <Link href={href} passHref >
          <Fab
            variant="extended"
            color="secondary"
            className={classes.heroButton}
            style={{ width: "18em" }}
          >
            <div className={classes.heroButtonItem} >{icon}</div>
            <div className={classes.heroButtonItem} >{title}</div>
          </Fab>
        </Link>
      }
    />
  );
}

function Hero({ dividers = false }) {
  const classes = useStyles();

  return (
    <Grid className={dividers ? classes.container : ""} container spacing={3}>
      <Grid item xs={12}>
        <Responsive
          desktop={<Typography variant="h2">Get your dev environment under control with KeySpot</Typography>}
          mobile={<Typography variant="h4">Get your dev environment under control with KeySpot</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Responsive
          desktop={<Typography variant="h4" >Store, use and share environment variables from the command line. Or right in your code with KeySpot.</Typography>}
          // mobile={<Typography variant="p" >Store, use and share environment variables from the command line. Or right in your code with KeySpot.</Typography>}
        />
      </Grid>
      <Responsive
        desktop={[
          <Grid key={0} item xs={3}></Grid>,
          <Grid key={1} item xs={3}>
            <HeroButton
              href="/api/auth/login"
              icon={<AccountCircleIcon />}
              title="Sign Up"
            />
          </Grid>,
          <Grid key={2} item xs={3}>
            <HeroButton
              href="/records"
              icon={<SubjectIcon />}
              title="Your Records"
            />
          </Grid>,
          <Grid key={3} item xs={3}></Grid>
        ]}
        mobile={[
          <Grid key={0} item xs={12}>
            <HeroButton
              href="/api/auth/login"
              icon={<AccountCircleIcon />}
              title="Sign Up"
            />
          </Grid>,
          <Grid key={1} item xs={12}>
            <HeroButton
              href="/records"
              icon={<SubjectIcon />}
              title="Your Records"
            />
          </Grid>,
          <DemoTerminal key={2} />
          // <Grid key={2} item xs={12}>
          //   <HeroButton
          //     href="/docs/cli-tool"
          //     icon={<GetAppIcon />}
          //     title="Installation Guide"
          //   />
          // </Grid>
        ]}
      />
    </Grid>
  );
}

function Install({ dividers = false }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(function () {
    if (window.navigator.appVersion.indexOf("Win") != -1) setValue(0);
    else if (window.navigator.appVersion.indexOf("Mac") != -1) setValue(1);
    else if (window.navigator.appVersion.indexOf("Linux") != -1) setValue(2);
    else setValue(2);
  }, [])

  const installTabs = [
    {
      label: "Windows",
      content: (
        <ReactMarkdown components={{ code: CodeBlock }} >
          {"```bash\n\
            # Add KeySpot scoop bucket\n\
            scoop bucket add keyspot https://github.com/keyspot/scoop-bucket\n\
            \n\
            scoop install keyspot"
          }
        </ReactMarkdown>
      ),
    },
    {
      label: "Mac",
      content: (
        <ReactMarkdown components={{ code: CodeBlock }} >
          {"```bash\n\
            # Add KeySpot homebrew tap\n\
            brew tap keyspot/cli\n\
            \n\
            brew install keyspot"
          }
        </ReactMarkdown>
      ),
    },
    {
      label: "Linux (Ubuntu/Debian)",
      content: (
        <ReactMarkdown components={{ code: CodeBlock }} >
          {"```bash\n\
            # Add KeySpot ppa\n\
            curl -s --compressed \"https://keyspot.github.io/cli-tool-ppa/KEY.gpg\" | sudo apt-key add -\n\
            sudo curl -s --compressed -o /etc/apt/sources.list.d/keyspot.list \"https://keyspot.github.io/cli-tool-ppa/keyspot.list\"\n\
            sudo apt update\n\
            \n\
            sudo apt install keyspot"
          }
        </ReactMarkdown>
      ),
    },
  ];

  return (
    <Grid className={dividers ? classes.container : ""} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2">Install</Typography>
        <Responsive
          desktop={<Typography variant="h4">Start using KeySpot today.</Typography>}
        />
      </Grid>
      <Grid item xs={12} align="left" >
        {/* <Card>
          <CardContent> */}
        <SwipeTabs tabs={installTabs} value={value} onChange={index => setValue(index)} />
        {/* </CardContent>
        </Card> */}
      </Grid>
    </Grid>
  );
}

function DemoTerminal() {
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const lines = [
    {
      text: 'keyspot run myWebApp -r myRecord',
      cmd: true,
    },
    {
      text: '',
      cmd: false,
    },
    {
      text: '👍 App setup complete. All environment variables are here with no .env file needed. Thanks KeySpot!',
      cmd: false,
      repeat: true,
      repeatCount: 2,
      frames: spinner.map(spinner => {
        return {
          text: spinner + ' Setting up app',
          delay: 80
        }
      })
    },
    {
      text: '',
      cmd: false,
    },
    {
      text: 'Web App is running on PORT 8080',
      cmd: false,
    },
  ];

  return (
    <Grid item xs={12} align="left" style={{ fontSize: "3rm" }}>
      <Terminal
        white
        lines={lines}
        interval={80}
        height={280}
      />
    </Grid>
  );

}

function Demo({ dividers = false }) {
  const classes = useStyles();

  return (
    <Grid className={dividers ? classes.container : ""} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2" >Say goodbye to .env files</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" >Inject your stored secrets right into your programs as environment variables.</Typography>
      </Grid>
      <DemoTerminal />
      <Responsive
        desktop={
          <>
            <Grid item xs={4}>
              <Typography variant="h5" >All environments in one place</Typography>
              <Typography variant="body2" >
                No more juggling .env files and using cloud specific secret managers. KeySpot puts all your variables in one place and is portable to any language and cloud provider.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" >Share with your team</Typography>
              <Typography variant="body2">
                KeySpot makes it easy to share your records with your team through our auto-generated access keys.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" >Easy to use API</Typography>
              <Typography variant="body2">
                Our API is designed to be as easy to use as possible. With one terminal command or one line of code, you can access and update your records.
              </Typography>
            </Grid>
          </>
        }
        mobile={
          <>
            <Grid item xs={12}>
              <Typography variant="h5" >All environments in one place</Typography>
              <Typography variant="body2" >
                No more juggling .env files and using cloud specific secret managers. KeySpot puts all your variables in one place and is portable to any language and cloud provider.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" >Share with your team</Typography>
              <Typography variant="body2">
                KeySpot makes it easy to share your records with your team through our auto-generated access keys.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" >Easy to use APIs</Typography>
              <Typography variant="body2">
                Our APIs are designed to be as easy to use as possible. In just one line of code you can access and update your records in any language.
              </Typography>
            </Grid>
          </>
        }
      />
    </Grid>
  );
}

function Testimonial({ dividers = false }) {
  const classes = useStyles();

  return (
    <Responsive
      desktop={
        <Grid className={dividers ? classes.container : ""} container spacing={3}>
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
      }
      mobile={
        <Grid className={dividers ? classes.container : ""} container spacing={3}>
          {/* <Grid item xs={1} /> */}
          <Grid item xs={12}>
            <Typography variant="h5">
              <p>{'"KeySpot is awesome, it makes it really easy for my team and I to manage our dev, test, staging, and prod environments across all our microservices."'}</p>
            </Typography>
            <Typography>
              <span>Carl Schader</span>
              <br></br>
              <span>Software Engineer</span>
            </Typography>
          </Grid>
          {/* <Grid item xs={1} />
                <Grid item xs={5}>
                  <Image src={appDev} alt="application development" />
                </Grid> */}
        </Grid>
      }
    />
  );
}

function Pricing({ dividers }) {
  const classes = useStyles();

  return (
    <Grid className={dividers ? classes.container : ""} container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h2">
          KeySpot is Completely Free
        </Typography>
      </Grid>
      <Grid item cs={12} >
        <Typography>
          Whether you are a small team or a large organization, empower your team by using KeySpot to manage environment variables, secrets, and sensitive data for your projects.
        </Typography>
      </Grid>
      {tiers.map(tier => <Grid key={tier.title} item xs={12 / tiers.length}><PricingCard tier={tier} /></Grid>)}
    </Grid>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <HtmlBase>
      <div className={classes.paper} >
        <Hero />
        <Responsive
          desktop={<Demo dividers />}
        />
        <Install dividers />
        {/* <Testimonial dividers /> */}

        <Pricing dividers />

        <Grid className={classes.containerBottom} container spacing={3}>
          <Footer />
        </Grid>
      </div>
    </HtmlBase>
  );
}