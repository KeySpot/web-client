import { IconContext } from "react-icons";
import { DiNodejsSmall, DiPython } from 'react-icons/di';
import { BsTerminal as terminal } from 'react-icons/bs';
import { Icon } from '@iconify/react';
import golangIcon from '@iconify/icons-grommet-icons/golang';

const style = {
    size: '3em',
};

function wrapIcon(Icon, style) {
    return (
        <IconContext.Provider value={style} >
            <Icon />
        </IconContext.Provider>
    );
}

export default {
    "cli-tool": {
        url: "https://github.com/KeySpot/cli-tool",
        icon: wrapIcon(terminal, style),
    },
    nodejs: {
        url: "https://github.com/KeySpot/node-api",
        icon: wrapIcon(DiNodejsSmall, style),
    },
    python: {
        url: "https://github.com/KeySpot/python-api",
        icon: wrapIcon(DiPython, style),
    },
    go: {
        url: "https://github.com/keyspot/gopackage",
        icon: <Icon style={{ color: "#ffffff" }} width="40px" icon={golangIcon} />,
    },
};