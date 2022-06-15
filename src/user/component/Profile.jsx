import React from 'react'
import { Card, Box, Typography, TextField, Chip, Grid } from '@mui/material'
import moment from "moment"
const Profile = (props) => {
    const { record } = props
    return (
        <Box >
            <Card sx={{ p: 2 }} >
                <Typography textAlign='center' variant='h6' >Profile</Typography>
                <Box mt={2} />
                <Grid container justifyContent='center' alignContent='center' >
                    <Typography variant='subtitle2' >User ID: {record.userId ? record.userId : "Loading..."}</Typography>
                    <Box width="10px" />
                    <Chip size='small' color="primary" label={record.levelName ? record.levelName : "Loading..."} variant="outlined" />
                </Grid>
                <Box mt={2} />
                <Grid container>
                    <Grid item xs={6} md={6} lg={6} >
                        <TextField
                            inputProps={{ style: { fontSize: 12 } }}
                            size='small'
                            disabled
                            fullWidth
                            id="createdOn"
                            label="Created On"
                            value={record.created ? moment(new Date(parseInt(`${record.created}000`))).format("YYYY-MM-DD HH:mm:ss") : "Loading..."} />
                    </Grid>
                    <Box mt={6} />
                    <Grid item xs={6} md={6} lg={6} >
                        <TextField
                            inputProps={{ style: { fontSize: 12 } }}
                            size='small'
                            disabled
                            fullWidth
                            id="lastUpdated"
                            label="Last Update"
                            value={record.lastUpTime ? moment(new Date(parseInt(`${record.lastUpTime}000`))).format("YYYY-MM-DD HH:mm:ss") : "Loading..."} />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} >
                        <TextField
                            inputProps={{ style: { fontSize: 13 } }}
                            size='small'
                            disabled
                            fullWidth
                            id="phone"
                            label="Phone"
                            value={record.phone ? record.phone : "Loading..."}
                            sx={{ fontSize: 13 }} />
                    </Grid>
                    <Box mt={6} />
                    <Grid item xs={6} md={6} lg={6} >
                        <TextField
                            inputProps={{ style: { fontSize: 13 } }}
                            size='small'
                            disabled
                            fullWidth
                            id="password"
                            label="Password"
                            value={record.pwd ? record.pwd : "Loading..."}
                            sx={{ fontSize: 13 }} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} >
                        <Typography align='center' sx={{ fontSize: 13 }} variant='h6' ><b>Game Auth Code:</b> </Typography>
                    </Grid>
                    <Grid style={{ backgroundColor: "#b8adad", padding: 5, marginBottom: 10 }} item xs={12} md={12} lg={12} >
                        <Typography align='center' sx={{ fontSize: 13 }} variant='h6' >{record.accountAuthCode ? record.accountAuthCode : "Null"}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} >
                        <TextField
                            inputProps={{ style: { fontSize: 13 } }}
                            disabled
                            fullWidth
                            id="logMessage"
                            label="Log Message"
                            value={record.lockMark ? record.lockMark : ""}
                            multiline
                            maxRows={5}
                            sx={{ fontSize: 13 }} />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}


export default Profile