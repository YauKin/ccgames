import React, { useEffect, useState } from "react";
import {
    Grid,
    TextField,
    Box,
    Button
} from "@mui/material";
import axios from "axios";
import { setCookie, getCookie } from "../unit/cookie";
import { baseURL } from "../config/env";
import { OrderGiveBackDialog } from "../component/dialog";
import Profile from "./component/Profile";
import OrderList from "./component/OrderList";

export const UserInfo = () => {
    const [userID, setUserID] = useState(getCookie("userid") ? getCookie("userid") : "")
    const [userInfo, setUserInfo] = useState(getCookie("userInfo") ? getCookie("userInfo") : "")
    const [userOrder, setUserOrder] = useState()
    const [orderHistory, setOrderHistory] = useState()
    const [bookOrder, setBookOrder] = useState()

    const [open, setOpen] = useState(false);
    const [selectGame, setSelectGame] = useState("")
    const [backContent, setBackContent] = useState(false)
    const handleClick = (record) => {
        setOpen(true)
        setSelectGame(record)
        setBackContent("")
    }

    const cancelOrder = (oid) => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/orderCancel/`, {
                params: {
                    userId: userID,
                    oId: oid,
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200) {
                    window.location.reload()
                } else {
                    errorHandling()
                }
            })
            .catch((e) => {
                errorHandling()
                console.log("Error: ", e)
            })
    }
    const errorHandling = () => {
        setCookie("userid", "", 0)
        setCookie("userInfo", "", 0)
        setCookie("authCode", "", 0)
        window.location.reload()
    }
    const getUserInfo = (userID) => {
        if (userID != "59509") {
            axios
                .get(`https://joegorccgames.herokuapp.com/${baseURL}/user/getUserInfo/`, {
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

    }
    const getUserPreOrder = (userID, status) => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/getUserPreOrderList/`, {
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
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/getUserOrderList/`, {
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
        <Box padding={3}  >
            <Grid container style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Grid padding={1} item xs={10} md={10} lg={10}>
                    <TextField error={userID == "59509"} helperText={userID == "59509" && "This UserID can't use!"} fullWidth size="small" value={userID} onChange={(e) => setUserID(e.target.value)} label="輸入用戶ID(建議輸入59500以上的用戶ID)" />
                </Grid>
                <Grid padding={1} xs={2} md={2} lg={2} item>
                    <Button onClick={() => getUserInfo(userID)} fullWidth variant="outlined">查詢</Button>
                </Grid>
            </Grid>
            {
                (!userInfo && !userOrder && !orderHistory && !bookOrder)
                    ?
                    null
                    :
                    <Box>
                        <Profile record={userInfo} />
                        <Box mt={2} />
                        <OrderList orderType="ORDERING" handleClick={handleClick} record={userOrder} />
                        <Box mt={2} />
                        <OrderList orderType="ORDER_HISTORY" record={orderHistory} />
                        <Box mt={2} />
                        <OrderList orderType="PRE_ORDER" handleClick={cancelOrder} record={bookOrder} />
                    </Box   >
            }
            <OrderGiveBackDialog backContent={backContent} setBackContent={setBackContent} record={selectGame} open={open} handleOpen={setOpen} />
        </Box >
    )
}