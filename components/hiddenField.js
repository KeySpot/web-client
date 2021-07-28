import { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function HiddenField({ value='', defaultHidden=true }) {
    const [hidden, setHidden] = useState(defaultHidden);

    function copyToClipboard() {
        navigator.clipboard.writeText(value);
    }

    return (
        <>
            <span>{hidden ? '\u2022'.repeat(value.length) : value}</span>
            <Tooltip title={hidden ? 'show' : 'hide'} ><IconButton onClick={() => setHidden(!hidden)} >{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></Tooltip>
            <Tooltip title="Copy to Clipboard" ><IconButton onClick={copyToClipboard} ><FileCopyIcon /></IconButton></Tooltip>
        </>
    );
}