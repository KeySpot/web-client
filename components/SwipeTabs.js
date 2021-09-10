import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Responsive from './Responsive';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
    content: {
        
    }
}));

// each item in tabs is an object with keys: { label: string, content: jsx }
export default function SwipeTabs({ tabs = [], value = 0, onChange = index => { } }) {
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    const handleChangeIndex = (index) => {
        onChange(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    // textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {tabs.map((tab, index) => <Tab key={index} label={tab.label} {...a11yProps(index)} />)}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((tab, index) => <TabPanel className={classes.content} key={index} value={value} index={index} dir={theme.direction}>{tab.content}</TabPanel>)}
            </SwipeableViews>
        </div>
    );
}
