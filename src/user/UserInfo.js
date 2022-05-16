import React, { useEffect, useState } from "react";
import {
    Grid,
    TextField,
    Box,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { setCookie, getCookie } from "../unit/cookie";
import { baseURL } from "../config/env";
export const UserInfo = () => {
    const [userID, setUserID] = useState(getCookie("userid") ? getCookie("userid") : "")
    const [userInfo, setUserInfo] = useState(getCookie("userInfo") ? getCookie("userInfo") : "")
    const [userOrder, setUserOrder] = useState([])
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false)
    const [isUserOrderOpen, setIsUserOrderOpen] = useState(false)
    const getUserInfo = (userID) => {
        axios
            .get(`${baseURL}/user/getUserInfo/`, {
                params: {
                    userId: userID,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                setUserInfo(res.data)
                setCookie("userid", res.data.userId, 9999)
                setCookie("userInfo", JSON.stringify(res.data), 9999)
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    const getUserOrder = (userID) => {
        axios
            .get(`${baseURL}/order/getUserOrderList/`, {
                params: {
                    userId: userID,
                    status: 1,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                setUserOrder(res.data.data.rows)
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    useEffect(() => {
        getCookie("userid") && getUserInfo(userID)
    }, [])
    useEffect(() => {
        getCookie("userid") && getUserOrder(userID)
    }, [userInfo])
    useEffect(() => {
        console.log(userOrder)
    }, [userOrder])
    // const getUserList = () => {
    //     for (var i = 59510; i <= 59550; i++) {
    //         getUserInfo(i)
    //     }
    // }
    // useEffect(() => {
    //     getUserList()
    // }, [])
    return (
        <Box padding={5}  >
            <Grid container style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Grid padding={1} item xs={10} md={10} lg={10}>
                    <TextField fullWidth size="small" value={userID} onChange={(e) => setUserID(e.target.value)} label="輸入用戶ID" />
                </Grid>
                <Grid padding={1} xs={2} md={2} lg={2} item>
                    <Button onClick={() => getUserInfo(userID)} fullWidth variant="outlined">Find</Button>
                </Grid>
            </Grid>
            {
                userID && userInfo
                &&
                <Grid container>
                    <Box mt={4} />
                    <List style={{ width: "100%" }} component="nav">
                        <ListItemButton onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}>
                            <ListItemText primary="User Information" />
                            {
                                isUserInfoOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isUserInfoOpen} timeout="auto" unmountOnExit>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} >User ID: </Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.userId}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} >Level Name: </Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.levelName}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} >Phone: </Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.phone}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} >Password: </Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.pwd}</Grid>
                            </Grid>
                        </Collapse>
                    </List>
                    <List style={{ width: "100%" }} component="nav">
                        <ListItemButton onClick={() => setIsUserOrderOpen(!isUserOrderOpen)}>
                            <ListItemText primary="User Order" />
                            {
                                isUserOrderOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isUserOrderOpen} timeout="auto" unmountOnExit>
                            <Table aria-label="order table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Account</TableCell>
                                        <TableCell>Password</TableCell>
                                        <TableCell align="center">
                                            <Grid className="tablecell">
                                                Action
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userOrder.length > 0
                                        ? userOrder.map((game) => (
                                            <TableRow key={`key_${game.id}`}>
                                                <TableCell>{game.productName}</TableCell>
                                                <TableCell>{game.gameAccId}</TableCell>
                                                <TableCell>{game.gameAccPwd}</TableCell>
                                                <TableCell align="center">
                                                    <Grid className="tablecell">
                                                        <Button>還Game</Button>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        : <Typography>沒有紀錄</Typography>}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </List>
                </Grid>
            }
        </Box >
    )
}