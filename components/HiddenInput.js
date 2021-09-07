import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Responsive from './Responsive';

export default function HiddenInput({ value, label, autoFocus, variant, onChange, defaultValue, defaultHidden = true, icons = true }) {
  const [hidden, setHidden] = useState(defaultHidden);

  function copyToClipboard() {
    navigator.clipboard.writeText(defaultValue);
  }

  return (
    <Responsive
      desktop={
        <>
          <TextField inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }} autoComplete="off" value={value} label={label} autoFocus={autoFocus} variant={variant} onChange={onChange} defaultValue={defaultValue} type={hidden && value.length > 0 ? 'password' : 'text'} />
          {
            icons ?
              <>
                <Tooltip title={hidden ? 'show' : 'hide'} ><IconButton onClick={() => setHidden(!hidden)} >{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></Tooltip>
                <Tooltip title="Copy to Clipboard" ><IconButton onClick={copyToClipboard} ><FileCopyIcon /></IconButton></Tooltip>
              </>
              :
              <></>
          }
        </>
      }
      mobile={
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <TextField inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }} autoComplete="off" value={value} label={label} autoFocus={autoFocus} variant={variant} onChange={onChange} defaultValue={defaultValue} type={hidden && value.length > 0 ? 'password' : 'text'} />
          </Grid>
          <Grid item xs={3}>
            {
              icons ?
                <Grid container direction="column">
                  <Grid item><Tooltip title={hidden ? 'show' : 'hide'} ><IconButton onClick={() => setHidden(!hidden)} >{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></Tooltip></Grid>
                  <Grid item><Tooltip title="Copy to Clipboard" ><IconButton onClick={copyToClipboard} ><FileCopyIcon /></IconButton></Tooltip></Grid>
                </Grid> :
                <></>
            }
          </Grid>
        </Grid>
      }
    />
  );
}