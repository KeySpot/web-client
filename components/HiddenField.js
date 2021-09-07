import { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Responsive from './Responsive';

export default function HiddenField({ value = '', defaultHidden = true }) {
    const [hidden, setHidden] = useState(defaultHidden);

    function copyToClipboard() {
        navigator.clipboard.writeText(value);
    }

    return (
        <Responsive
            desktop={
                <>
                    <span>{hidden ? '\u2022'.repeat(value.length) : value}</span>
                    <Tooltip title={hidden ? 'show' : 'hide'} ><IconButton onClick={() => setHidden(!hidden)} >{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></Tooltip>
                    <Tooltip title="Copy to Clipboard" ><IconButton onClick={copyToClipboard} ><FileCopyIcon /></IconButton></Tooltip>
                </>
            }
            mobile={
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={9}><span>{hidden ? '\u2022'.repeat(value.length) : value}</span></Grid>
                    <Grid item xs={3}>
                        <Grid container direction="coloumn">
                            <Grid item><Tooltip title={hidden ? 'show' : 'hide'} ><IconButton onClick={() => setHidden(!hidden)} >{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></Tooltip></Grid>
                            <Grid item><Tooltip title="Copy to Clipboard" ><IconButton onClick={copyToClipboard} ><FileCopyIcon /></IconButton></Tooltip></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
}