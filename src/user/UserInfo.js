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
import { OrderGiveBackDialog } from "../component/dialog";
export const UserInfo = () => {
    const [userID, setUserID] = useState(getCookie("userid") ? getCookie("userid") : "")
    const [userInfo, setUserInfo] = useState(getCookie("userInfo") ? getCookie("userInfo") : "")
    const [userOrder, setUserOrder] = useState([])
    const [orderHistory, setOrderHistory] = useState([])
    const [bookOrder, setBookOrder] = useState([])
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false)
    const [isUserOrderOpen, setIsUserOrderOpen] = useState(false)
    const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
    const [isBookOrderOpen, setIsBookOrderOpen] = useState(false)

    const [open, setOpen] = useState(false);
    const [selectGame, setSelectGame] = useState("")
    const [backContent, setBackContent] = useState(false)
    const handleClick = (record) => {
        setOpen(true)
        console.log("Record: ", record)
        setSelectGame(record)
        setBackContent("")
    }
    const errorHandling = () => {
        setCookie("userid", "", 0)
        setCookie("userInfo", "", 0)
        setCookie("authCode", "", 0)
        window.location.reload()
    }
    const getUserInfo = (userID) => {
        axios
            .get(`${baseURL}/user/getUserInfo/`, {
                params: {
                    userId: userID,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setUserInfo(res.data)
                    setCookie("userid", res.data.userId, 9999)
                    setCookie("userInfo", JSON.stringify(res.data), 9999)
                } else {
                    errorHandling()
                }
            })
            .catch((e) => {
                errorHandling()
                console.log("Error: ", e)
            })
    }
    const getUserPreOrder = (userID, status) => {
        axios
            .get(`${baseURL}/order/getUserPreOrderList/`, {
                params: {
                    userId: userID,
                    status: status,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200) {
                    if (status == 0) {
                        setBookOrder(res.data.data.rows)
                    }
                } else {
                    errorHandling()
                }
            })
            .catch((e) => {
                errorHandling()
                console.log("Error: ", e)
            })
    }
    const getUserOrder = (userID, status) => {
        axios
            .get(`${baseURL}/order/getUserOrderList/`, {
                params: {
                    userId: userID,
                    status: status,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200) {
                    if (status == 1) {
                        setUserOrder(res.data.data.rows)
                    }
                    if (status == 2) {
                        setOrderHistory(res.data.data.rows)
                    }
                } else {
                    errorHandling()
                }
            })
            .catch((e) => {
                errorHandling()
                console.log("Error: ", e)
            })
    }
    useEffect(() => {
        (getCookie("authCode") && getCookie("userid")) && getUserInfo(userID)
    }, [])
    useEffect(() => {
        if (getCookie("authCode") && getCookie("userid")) {
            getUserPreOrder(userID, 0)
            getUserOrder(userID, 1)
            getUserOrder(userID, 2)
        }
    }, [userInfo])
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
                            <ListItemText primary="用戶資料" />
                            {
                                isUserInfoOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isUserInfoOpen} timeout="auto" unmountOnExit>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} ><b>User ID: </b></Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.userId}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} ><b>Level Name: </b></Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.levelName}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} ><b>Phone: </b></Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.phone}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} ><b>Password: </b></Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.pwd}</Grid>
                            </Grid>
                            <Grid style={{ borderBottomColor: "black", borderWidth: 1 }} padding={2} container>
                                <Grid item xs={6} md={6} lg={6} ><b>Game Auth Code: </b></Grid>
                                <Grid item xs={6} md={6} lg={6} >{userInfo.accountAuthCode}</Grid>
                            </Grid>
                        </Collapse>
                    </List>
                    <List style={{ width: "100%" }} component="nav">
                        <ListItemButton onClick={() => setIsUserOrderOpen(!isUserOrderOpen)}>
                            <ListItemText primary="訂單中" />
                            {
                                isUserOrderOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isUserOrderOpen} timeout="auto" unmountOnExit>
                            <Table aria-label="order table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Account</b></TableCell>
                                        <TableCell><b>Password</b></TableCell>
                                        <TableCell align="center">
                                            <Grid className="tablecell">
                                                <b>Action</b>
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
                                                        <Button onClick={() => handleClick(game)}>還Game</Button>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        : <TableRow>
                                            <TableCell colSpan={4}>沒有紀錄</TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </List>
                    <List style={{ width: "100%" }} component="nav">
                        <ListItemButton onClick={() => setIsOrderHistoryOpen(!isOrderHistoryOpen)}>
                            <ListItemText primary="訂單記錄" />
                            {
                                isOrderHistoryOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isOrderHistoryOpen} timeout="auto" unmountOnExit>
                            <Table aria-label="order table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Account</b></TableCell>
                                        <TableCell><b>Password</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderHistory.length > 0
                                        ? orderHistory.map((game) => (
                                            <TableRow key={`key_${game.id}`}>
                                                <TableCell>{game.productName}</TableCell>
                                                <TableCell>{game.gameAccId}</TableCell>
                                                <TableCell>{game.gameAccPwd}</TableCell>
                                            </TableRow>
                                        ))
                                        : <TableRow>
                                            <TableCell colSpan={4}>沒有紀錄</TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </List>
                    <List style={{ width: "100%" }} component="nav">
                        <ListItemButton onClick={() => setIsBookOrderOpen(!isBookOrderOpen)}>
                            <ListItemText primary="預定記錄" />
                            {
                                isBookOrderOpen ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItemButton>
                        <Collapse in={isBookOrderOpen} timeout="auto" unmountOnExit>
                            <Table aria-label="order table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Account</b></TableCell>
                                        <TableCell><b>Password</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookOrder.length > 0
                                        ? bookOrder.map((game) => (
                                            <TableRow key={`key_${game.id}`}>
                                                <TableCell>{game.productName}</TableCell>
                                                <TableCell>{game.gameAccId}</TableCell>
                                                <TableCell>{game.gameAccPwd}</TableCell>
                                            </TableRow>
                                        ))
                                        : <TableRow>
                                            <TableCell colSpan={4}>沒有紀錄</TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </List>
                </Grid>
            }
            <OrderGiveBackDialog backContent={backContent} setBackContent={setBackContent} record={selectGame} open={open} handleOpen={setOpen} />
        </Box >
    )
}