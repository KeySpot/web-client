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
import Fab from '@material-ui/core/Fab';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Grid from '@material-ui/core/Grid';
import Terminal from 'react-animated-term';
import useForceUpdate from '../hooks/useForceUpdate';

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
  return [<Typography variant="h5">Make a record</Typography>, <Typography variant="h5">Install the CLI tool</Typography>, <Typography variant="h5">Configure your CLI tool</Typography>, <Typography variant="h5">Use your secrets as environment variables</Typography>];
}

const fetcher = url => fetch(url).then(res => res.json());

export default function Tutorial() {
  const { user, error, isLoading } = requireLogin();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { data: tokenData } = useSWR('/api/generateToken', fetcher);
  const [os, setOs] = useState("linux");
  const forceUpdate = useForceUpdate();

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

  const [recordName, setRecordName] = useState("My First Record");
  const [names, setNames] = useState(["API_KEY", "SECRET", "KEYSPOT"]);
  const [vals, setVals] = useState(["34r2ds", "21ed5fg", "isAwesome"]);

  useEffect(() => {}, [recordName, names.length, vals.length]);

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
              Let&apos;s start by making a new record to store some secrets.
            </Typography>
            <br />
            <TextField helperText="Record Name" value={recordName} variant="outlined" onChange={event => setRecordName(event.target.value)} />
            <br />
            <br />
            <Typography>
              Now that your record is named, try setting a few secrets.
            </Typography>
            <br />
            <Grid conatianer>
              {names.map((name, index) => (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField helperText="Secret Name" value={name} onChange={event => {
                        let newNames = names;
                        newNames[index] = event.target.value;
                        setNames(newNames);
                      }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField helperText="Secret Value" value={vals[index]} onChange={event => {
                        let newVals = vals;
                        newVals[index] = event.target.value;
                        setVals(newVals);
                      }} />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Fab color="secondary" onClick={() => {
                  let newNames = names;
                  let newVals = vals;
                  newNames.push("NEW_SECRET");
                  newVals.push("new value");
                  setNames(newNames);
                  setVals(newVals);
                  forceUpdate();
                }}><AddOutlinedIcon /></Fab>
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
            <Typography>If you lose your token, you can always generate new ones in the <Link href="/account">Account</Link> section.</Typography><br />
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
        let kvpString = "";
        for (let i = 0; i < names.length; i++) {
          kvpString += `${names[i]}=${vals[i]}\n`;
        }
        lines = [
          {
            text: `keyspot run myProgram -r "${recordName}"`,
            cmd: true,
          },
          {
            text: '',
            cmd: false,
          },
          makeLoadLine(`All your environment variables:\n.\n.\n.\n${kvpString}`),
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
                height={370 + (5 * names.length)}
              />
            </Grid>
            <br /><Typography>We&apos;ve just scratched the surface with all the ways you can use KeySpot.</Typography><br />
            <Typography>If you want to learn more about how to use the CLI tool or use your secrets directly in code without the CLI tool, checkout the <Link href="/docs/cli-tool">Docs</Link> section.</Typography><br />
            <Typography>Click finish to go and start making your own records.</Typography><br />
          </div>
        );
    };
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFinish = () => {
    let newBody = {};

    for (let i = 0; i < names.length; i++) {
      newBody[names[i]] = vals[i];
    }

    fetch(`/api/newName/${recordName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBody)
    })
      .catch(err => console.log(err))
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
            <Step key={index}>
              <StepLabel><Button onClick={() => setActiveStep(index)}>{label}</Button></StepLabel>
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
                        onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
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