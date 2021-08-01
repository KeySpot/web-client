import { IconContext } from "react-icons";
import { DiNodejsSmall, DiPython } from 'react-icons/di';

const style = {
    size: '3em',
};

function wrapIcon(Icon) {
    return (
        <IconContext.Provider value={style} >
            <Icon />
        </IconContext.Provider>
    );
}

export default {
    nodejs: {
        url: "https://github.com/KeySpot/node-api",
        icon: wrapIcon(DiNodejsSmall),
    },
    python: {
        url: "https://github.com/KeySpot/python-api",
        icon: wrapIcon(DiPython),
    },
};