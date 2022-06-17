import React from 'react'
import { Card, Button, Box, Typography, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
const OrderList = (props) => {
    const { orderType, record, handleClick } = props
    if (!record) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }
    if (orderType == "ORDERING") {
        return (
            <Card sx={{ p: 2, width: "100%" }}  >
                <Grid container direction={'column'} >
                    <Grid item>
                        <Typography variant='subtitle1' ><b>訂單中</b></Typography>
                    </Grid>
                    {
                        record.length > 0
                            ?
                            record.map((item) => {
                                return (
                                    <Grid key={`${item.id}`} sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                        <Grid item style={{ borderBottom: '1px dashed black' }}>
                                            <Typography variant='body2' >{item.productName ? item.productName : "Loading..."}</Typography>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={6} ><Typography variant='caption' >Ac: {item.gameAccId ? item.gameAccId : "Loading..."}</Typography></Grid>
                                            <Grid item xs={6} ><Typography variant='caption' >Password: {item.gameAccPwd ? item.gameAccPwd : ""}</Typography></Grid>
                                            <Grid item xs={12} ><Typography variant='caption' >租出日期: {item.created ? item.created : ""}</Typography></Grid>
                                            <Button fullWidth onClick={() => handleClick(item)}  >歸還遊戲</Button>
                                        </Grid>
                                    </Grid>
                                )
                            })
                            :
                            <Grid sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                <Grid item style={{ borderBottom: '1px dashed black' }}>
                                    <Typography variant='body2' > 沒有紀錄</Typography>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={12} ><Typography variant='caption' >沒有紀錄</Typography></Grid>
                                </Grid>
                            </Grid>
                    }

                </Grid>
            </Card>
        )
    }

    if (orderType == "ORDER_HISTORY") {
        return (
            <Card sx={{ p: 2, width: "100%" }}  >
                <Grid container direction={'column'} >
                    <Grid item>
                        <Typography variant='subtitle1' ><b>訂單記錄</b></Typography>
                    </Grid>
                    {
                        record.length > 0
                            ?
                            record.map((item) => {
                                return (
                                    <Box key={`${item.id}`} mt={1}>
                                        <Grid sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                            <Grid item style={{ borderBottom: '1px dashed black' }}>
                                                <Typography variant='body2' >{item.productName ? item.productName : "Loading..."}</Typography>
                                            </Grid>
                                            <Grid container >
                                                <Grid item xs={6} ><Typography variant='caption' >Ac: {item.gameAccId ? item.gameAccId : "Loading..."}</Typography></Grid>
                                                <Grid item xs={6} ><Typography variant='caption' >Password: {item.gameAccPwd ? item.gameAccPwd : ""}</Typography></Grid>
                                                <Grid item xs={12} ><Typography variant='caption' >上次租借日期: {item.created ? item.created : ""}</Typography></Grid>
                                                <Grid item xs={12} ><Typography variant='caption' >上次歸還日期: {item.endTime ? item.endTime : ""}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                )
                            })
                            :
                            <Grid sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                <Grid item style={{ borderBottom: '1px dashed black' }}>
                                    <Typography variant='body2' > 沒有紀錄</Typography>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={12} ><Typography variant='caption' >沒有紀錄</Typography></Grid>
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </Card>
        )
    }
    if (orderType == "PRE_ORDER") {
        return (
            <Card sx={{ p: 2, width: "100%" }}  >
                <Grid container direction={'column'} >
                    <Grid item>
                        <Typography variant='subtitle1' ><b>預定紀錄</b></Typography>
                    </Grid>
                    {
                        record.length > 0
                            ?
                            record.map((item) => {
                                return (
                                    <Grid key={item.id} sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                        <Grid item style={{ borderBottom: '1px dashed black' }}>
                                            <Typography variant='body2' >{item.productName ? item.productName : "Loading..."}</Typography>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={12} ><Typography variant='caption' >預定日期: {item.created ? item.created : ""}</Typography></Grid>
                                            <Button fullWidth onClick={() => handleClick(item.oId)}  >取消預定</Button>
                                        </Grid>
                                    </Grid>
                                )
                            })
                            :
                            <Grid sx={{ p: 1 }} style={{ borderLeft: 'thick double black', borderRight: 'thick double black' }} direction={'column'} container>
                                <Grid item style={{ borderBottom: '1px dashed black' }}>
                                    <Typography variant='body2' > 沒有紀錄</Typography>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={12} ><Typography variant='caption' >沒有紀錄</Typography></Grid>
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </Card>
        )
    }
    return null
}

export default OrderList