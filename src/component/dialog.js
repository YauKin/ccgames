import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import axios from "axios";
import { setCookie, getCookie } from "../unit/cookie";
import { baseURL } from "../config/env";
export const RentGameDialog = (props) => {
    const { open, handleOpen, record, rentContent, setRentContent } = props
    const handleClose = () => {
        handleOpen(false);
    };
    const rentGame = () => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/creatRentOrder/`, {
                params: {
                    pId: record.pId,
                    userId: getCookie("userid"),
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200 || res.data.code == 10001 || res.data.code == 10002) {
                    setRentContent(res.data)
                }
                if (res.data.code == 10006) {
                    creatReserveOrder()
                }

            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    const creatReserveOrder = () => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/creatReserveOrder/`, {
                params: {
                    pId: record.pId,
                    userId: getCookie("userid"),
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setRentContent(res.data)
                }
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {record && record.productName}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {record && record.abstract}
                </DialogContentText>
                {
                    rentContent
                    &&
                    <>
                        <Box mt={2} />
                        <DialogContentText id="alert-dialog-description">
                            {`${rentContent.msg}`}
                        </DialogContentText>
                        {
                            rentContent.data.length > 0
                            &&
                            <DialogContentText id="alert-dialog-description">
                                {`Account: ${rentContent["data"][0].gameAccId} Password: ${rentContent["data"][0].gameAccPwd}`}
                            </DialogContentText>
                        }
                    </>
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>關閉</Button>
                <Button onClick={rentGame} autoFocus>
                    借Game
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export const OrderGiveBackDialog = (props) => {
    const { open, handleOpen, record, backContent, setBackContent } = props
    const handleClose = () => {
        handleOpen(false);
        window.location.reload()
    };
    const giveBackGame = () => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/order/orderGiveBack/`, {
                params: {
                    oId: record.oId,
                    userId: getCookie("userid"),
                    authLoginCode: getCookie("authCode") ? getCookie("authCode") : ""
                }
            })
            .then((res) => {
                setBackContent(res.data)
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {record && record.productName}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    是否歸還此遊戲？
                </DialogContentText>
                {
                    backContent
                    &&
                    <>
                        <Box mt={2} />
                        <DialogContentText id="alert-dialog-description">
                            {`${backContent.msg}`}
                        </DialogContentText>
                    </>
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>關閉</Button>
                <Button onClick={giveBackGame} autoFocus>
                    還Game
                </Button>
            </DialogActions>
        </Dialog>

    )
}