import { IconContext } from "react-icons";
import { DiNodejsSmall, DiPython } from 'react-icons/di';
import { Golang } from 'grommet-icons';

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
        icon: <Golang color="white" size="40px" />, 
    },
};