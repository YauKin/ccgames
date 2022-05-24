
import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { setCookie } from "../unit/cookie";
import { baseURL } from "../config/env";
export const Login = () => {
    const [ac, setAc] = useState("12916571888")
    const [pwd, setPwd] = useState("687608")
    const login = () => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/user/login/`, {
                params: {
                    phone: ac,
                    pwd: pwd
                }
            })
            .then((res) => {
                console.log("Login information: ", res.data)
                setCookie("authCode", res.data.data.authCode, 9999)
                window.location.reload()
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    return (
        <Grid container padding={5} >
            <Grid style={{ padding: 5, }} item xs={12} md={12} lg={12}>
                <Typography  align="center" variant="h4" gutterBottom component="div">
                    CCGames
                </Typography>   
            </Grid>
            <Grid style={{ padding: 5 }} item xs={12} md={5} lg={5}>
                <TextField fullWidth size="small" value={ac} onChange={(e) => setAc(e.target.value)} label="Account" />
            </Grid>
            <Grid style={{ padding: 5 }} item xs={12} md={5} lg={5}>
                <TextField fullWidth size="small" value={pwd} onChange={(e) => setPwd(e.target.value)} label="Password" type="password" />
            </Grid>
            <Grid style={{ padding: 5 }} item xs={12} md={2} lg={2}>
                <Button fullWidth variant="contained" onClick={() => login()} >Login</Button>
            </Grid>
        </Grid>
    )
}