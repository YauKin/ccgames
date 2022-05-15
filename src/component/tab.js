import React from 'react'
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Box
} from '@mui/material';
import { Game, GameSearch, User } from "../appResource";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            style={{
                // backgroundColor:"red"
            }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                style={{
                    // backgroundColor: "blue",
                    minWidth: 200
                }}
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="User Information" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Game List" {...a11yProps(2)} />
                <Tab label="Game Search" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <User />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Game />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GameSearch />
            </TabPanel>
        </Box>
    );
}