import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "../unit/cookie";
import { UserInfo } from "./UserInfo";
import { baseURL } from "../config/env";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
export const User = () => {
    const login = () => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/user/login/`, {
                params: {
                    phone: "12916571888",
                    pwd: "687608"
                }
            })
            .then((res) => {
                setCookie("authCode", res.data.data.authCode, 9999)
                window.location.reload()
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    useEffect(() => {
        !getCookie("authCode") && login()
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }} >
            {
                !getCookie("authCode") ?
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <UserInfo />
            }
        </Box>
    )
}