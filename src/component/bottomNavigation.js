import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import { Game, GameSearch, User } from '../appResource';
import { setCookie, getCookie } from '../unit/cookie';
export default function FixedBottomNavigation() {
    const [value, setValue] = useState(getCookie("tabid") ? parseInt(getCookie("tabid")) : 0);
    const ref = useRef(null);

    useEffect(() => {
        console.log("value: ", value)
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
    const renderSwitch = (param) => {
        switch (value) {
            case 0:
                return <User />
            case 1:
                return <Game />
            case 2:
                return <GameSearch />
        }
    }
    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            {
                renderSwitch(value)
            }
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        setCookie("tabid", newValue, 9999);
                    }}
                >
                    <BottomNavigationAction label="用戶" icon={<PersonOutlineIcon />} />
                    <BottomNavigationAction label="遊戲" icon={<SportsEsportsIcon />} />
                    <BottomNavigationAction label="查詢" icon={<SearchIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
