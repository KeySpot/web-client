import { IconContext } from "react-icons";
import { DiNodejsSmall, DiPython } from 'react-icons/di';
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
        // icon: <Golang color="white" size="40px" />, 
        icon: <Icon style={{ color: "#ffffff" }} width="40px" icon={golangIcon} />,
    },
};