import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import HiddenField from '../components/HiddenField';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import InstallTabs from '../components/InstallTabs';
import requireLogin from '../hooks/requireLogin';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Terminal from 'react-animated-term';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Make a record', 'Install the CLI tool', 'Configure your CLI tool', 'Use your secrets as environment variables'];
}

const fetcher = url => fetch(url).then(res => res.json());

export default function Tutorial() {
  const { user, error, isLoading } = requireLogin();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { data: tokenData } = useSWR('/api/generateToken', fetcher);
  const [os, setOs] = useState("linux");

  useEffect(function () {
    if (window.navigator.appVersion.indexOf("Win") != -1) setOs("windows");
    else if (window.navigator.appVersion.indexOf("Mac") != -1) setOs("mac");
    else setOs("linux")
  }, [])

  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  function makeLoadLine(finishedText) {
    return {
      text: finishedText,
      cmd: false,
      repeat: true,
      repeatCount: 1,
      frames: spinner.map(spinner => {
        return {
          text: spinner,
          delay: 80
        }
      })
    };
  }

  const [recordName, setRecordName] = useState("My Awesome Record");
  const [name1, setName1] = useState("API_KEY");
  const [val1, setVal1] = useState("34r2ds");
  const [name2, setName2] = useState("SECRET");
  const [val2, setVal2] = useState("21ed5fg");

  function getStepContent(index) {
    let lines = [];
    switch (index) {
      case 0:
        return (
          <div>
            <Typography>
              KeySpot is a tool to help developers store, access, and share application secrets like API keys and database passwords. Anything you store is safely encrypted and accesible from the command line. KeySpot can also take your stored secrets and run commands with them as environment variables, removing the need for .env or config files!
            </Typography>
            <br />
            <Typography>
              Let&apos;s start by making a new record to store some secrets. Edit the record below:
            </Typography>
            <br />
            <TextField helperText="Record Name" value={recordName} variant="outlined" onChange={event => setRecordName(event.target.value)} />
            <Grid conatianer>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField helperText="Secret Name" value={name1} onChange={event => setName1(event.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField helperText="Secret Value" value={val1} onChange={event => setVal1(event.target.value)} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField helperText="Secret Name" value={name2} onChange={event => setName2(event.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField helperText="Secret Value" value={val2} onChange={event => setVal2(event.target.value)} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Typography>
              Records can be edited and created in the <Link href="/records">Records</Link> section.
            </Typography>
          </div>
        );
      case 1:
        return (
          <div>
            <Typography>Feel free to follow along on your own terminal.</Typography><br />
            <Typography>The KeySpot Command Line Tool can easily be installed for Windows, Mac, and Linux.</Typography><br />
            <Grid item xs={12} align="left" style={{ fontSize: "3rm" }}>
              <InstallTabs />
            </Grid>
          </div>
        );
      case 2:
        lines = [
          {
            text: 'keyspot configure <myToken>',
            cmd: true,
          },
          {
            text: '',
            cmd: false,
          },
          {
            text: 'Account successfully linked',
            cmd: false,
          },
        ];

        return (
          <div>
            <Typography>KeySpot can be used without configuration. However, configuring your CLI tool gives you access to all features and makes it even simpler to use.</Typography><br />
            <Typography>To configure, you will need a CLI token which we have generated for you.</Typography><br />
            <Typography>Your Token:</Typography><HiddenField style={{ wordBreak: 'break-all' }} value={tokenData ? tokenData.token : ''} />
            <Typography>If you loose your token, you can always generate new ones in the <Link href="/account">Account</Link> section.</Typography><br />
            <Grid item xs={12} align="left" style={{ fontSize: "3rm" }}>
              <Terminal
                white
                lines={lines}
                interval={60}
              // height={360}
              />
            </Grid>
          </div>
        );
      case 3:
        lines = [
          {
            text: `keyspot run myProgram -r "${recordName}"`,
            cmd: true,
          },
          {
            text: '',
            cmd: false,
          },
          makeLoadLine(`All your environment variables:\n.\n.\n.\n${name1}=${val1}\n${name2}=${val2}\n`),
          {
            text: 'Goodbye .env files!',
            cmd: false,
          },
        ];

        return (
          <div>
            <Typography>The final step is to use your secrets as environment variables with one of your programs.</Typography><br />
            <Typography>Let&apos;s assume we have a program called myProgram that prints all environment variables:</Typography><br />
            <Grid item xs={12} align="left" style={{ fontSize: "3rm" }}>
              <Terminal
                white
                lines={lines}
                interval={60}
                height={370}
              />
            </Grid>
            <br /><Typography>We&apos;ve just scratched the surface with all the ways you can use keyspot.</Typography><br />
            <Typography>If you want to learn more about how to use the CLI tool or use your secrets directly in code without the CLI tool, checkout the <Link href="/docs/cli-tool">Docs</Link> section.</Typography><br />
            <Typography>Click finish to go and start making your own records.</Typography><br />
          </div>
        );
    };
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let body;

  if (error) {
    body = <ErrorMessage message={error.toString()} />
  } else if (isLoading) {
    body = <Loading />
  } else {
    body = (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Link href={activeStep === steps.length - 1 ? '/records' : '#'} passHref>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }

  return (
    <HtmlBase>
      {body}
    </HtmlBase>
  );
}