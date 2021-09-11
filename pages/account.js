import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HtmlBase from '../components/HtmlBase';
import Spinner from '../components/spinner';
import Markdown from '../components/Markdown';
import HiddenField from '../components/HiddenField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: 'auto',
    padding: '10px',
    wordBreak: 'break-all',
  },
  borderTop: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Account() {
  const classes = useStyles();
  const { user, error, isLoading } = useUser();
  const [token, setToken] = useState('');

  async function handleClick() {
    const response = await fetch('/api/generateToken');
    const data = await response.json();
    setToken(data.token);
  }

  function UserData() {
    if (error) {
      return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Typography className={classes.paperElement} variant="h3" >Failed to load: {error ? error.toString() : ''}</Typography>
        </Grid>
      );
    } else if (isLoading) {
      return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Grid item><Spinner className="centerScreenImage" size={100} /></Grid>
        </Grid>
      );
    } else if (!user) {
      return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12}><Typography variant="h3" >You must be logged in to view account information</Typography></Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Paper className={classes.paper} >
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
                  <Grid align="center" item xs={12}><Avatar alt={user.name} src={user.picture} style={{ height: "5em", width: '5em' }} /></Grid>
                  <Grid item xs={12}><Typography variant="h5" >{user.name}</Typography></Grid>
                  {/* <Grid item xs={3} /> */}
                  <Grid item xs={12}><Typography variant="h6" align="center">Email: {user.email}</Typography></Grid>
                  {/* <Grid item xs={3} /> */}
                  <Grid item xs={12}><Typography variant="h6" align="center">Sub Id: {user.sub}</Typography></Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} >
                <Grid container direction="row" alignItems="center" justifyContent="center" spacing={3}>
                  <Grid item xs={12}><Typography variant="h5">Generate CLI Token</Typography></Grid>
                  <Grid item xs={12} align="left">
                    <Typography variant="p">
                      In order to link your account to the KeySpot CLI Tool on a specific device, you need to configure your CLI Tool with a CLI Token. This will give you access to the full suite of features the CLI Tool offers such as being able to reference records by name when using commands instead of passing in an access key every time.
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="p">
                      You can have as many CLI Tokens as you want. Typically, a user will have one for each device they have running the KeySpot CLI Tool.
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="p">
                      Once you have generated a new token you will want to save it somewhere secure or immediately configure your CLI Tool with it because you won&apos;t be able to see it again on this website after being generated.
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="p">
                      Once you are issued a token, associate it with your CLI Tool by running:
                    </Typography>
                    <Markdown>
                      {'```bash\n\
                      $ keyspot configure <cli-token>'}
                    </Markdown>
                  </Grid>
                  <Grid item xs={12}><Button variant="contained" color="secondary" onClick={handleClick} >Generate New Token</Button></Grid>
                  {
                    token ?
                      <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center">
                          <Grid item xs={12} align="left"><Typography variant="p">Save this token somewhere secure or configure your CLI tool with it. You won&apos;t be able to see it again in the future here. If you lose this token you can generate a new one.</Typography></Grid>
                          <Grid item xs={12}>
                            <Grid container direction="column" className={classes.borderTop} justifyContent="center" alignItems="center">
                              <Grid item xs={12} align="center" ><Typography>Token: </Typography></Grid>
                              <Grid item xs={12} align="left"><HiddenField value={token} /></Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid> :
                      <></>
                  }
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} >
                <Grid item align="center">
                  <Link href="/api/auth/logout" passHref>
                    <Button color="secondary">logout</Button>
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <HtmlBase title="Account" >
      <Grid item xs={12} align="center"><Typography variant="h2" >Account</Typography></Grid>
      <UserData />
    </HtmlBase>
  );
}