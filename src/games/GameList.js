import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Box, Typography, Grid, Paper, Card } from '@mui/material'
import { baseURL } from "../config/env";
import { setCookie, getCookie } from "../unit/cookie";
import axios from "axios";
import { RentGameDialog } from '../component/dialog'

const GameList = (props) => {
    const [page, setPage] = useState(
        getCookie("page") ? parseInt(getCookie("page")) : 1
    );
    const [games, setGames] = useState([])
    const [gameCount, setGameCount] = useState(localStorage.getItem("gamecount") ? localStorage.getItem("gamecount") : 0)
    const [hasMore, setHasMore] = useState(true)

    const [open, setOpen] = useState(false);
    const [selectGame, setSelectGame] = useState("")
    const [rentContent, setRentContent] = useState(false)
    const handleClick = (record) => {
        setOpen(true)
        setSelectGame(record)
        setRentContent("")
    }
    const getGames = (page) => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/product/getProductList/`, {
                params: {
                    cId: 0,
                    page: page,
                    authLoginCode: ""
                }
            })
            .then((res) => {
                setCookie("page", page, 9999);
                setPage(page)
                setGameCount(parseInt(res.data.data.total))
                updateGames(page, res.data.data.rows)
                localStorage.setItem("gamecount", parseInt(res.data.data.total))
            })
            .catch((e) => {
                setError(e);
            })
    };
    const updateGames = (currentPage, newGames) => {
        if (currentPage == 1) {
            setGames(newGames)
            localStorage.setItem("games", JSON.stringify(newGames))
        } else {
            setGames(oldGames => oldGames.concat(newGames))
        }
    }
    useEffect(() => {
        if (localStorage.getItem("games")) {
            let localData = JSON.parse(localStorage.getItem("games"))
            setGames(localData)
        } else {
            getGames(1)
        }
    }, [])
    useEffect(() => {
        games.length > 0 && localStorage.setItem("games", JSON.stringify(games))
    }, [games])
    const fetchMoreData = () => {
        if (games.length >= gameCount) {
            setHasMore(false)
        } else {
            setTimeout(() => {
                getGames(page + 1)
            }, 500);
        }
    };
    if (games.length == 0) {
        return null
    }
    return (
        <Paper sx={{ p: 2, width: "100%" }}  >
            <Grid container direction={'column'} >
                <Grid item display='flex' justifyContent="center">
                    <Typography variant='h6' ><b>遊戲列表</b></Typography>
                </Grid>
                <InfiniteScroll
                    dataLength={games.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>載入中...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>到底了。。。</b>
                        </p>
                    }
                >

                    {games.map((item) => (
                        <Card key={`${item.id}`} style={{ margin: "10px 0px" }} >
                            <Grid sx={{ p: 1 }} style={{ margin: "10px 0px" }} direction={'row'} container>
                                <Grid xs={3} item >
                                    <Box
                                        style={{
                                            borderRadius: 25,
                                            objectFit: "cover"
                                        }}
                                        component="img"
                                        sx={{
                                            height: 150,
                                            width: 150,
                                            maxHeight: { xs: 50, md: 200, },
                                            maxWidth: { xs: 50, md: 200 },
                                        }}
                                        alt={item.productName}
                                        src={item.banner}
                                    />
                                </Grid>
                                <Grid xs={7} direction={'column'} item>
                                    <Grid style={{ borderBottom: '1px dashed black' }} item >
                                        <Typography variant='body2' >{item.productName ? item.productName : "Loading..."}</Typography>
                                    </Grid>
                                    <Grid item display='flex' justifyContent="space-between" >
                                        <Typography color="gray" variant='caption' >{item.productType}</Typography>
                                        <Typography color="gray" variant='caption' >{item.hotNum}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid xs={2} item display="flex" alignItems="center" >
                                    <Button style={{ fontSize: 11 }} onClick={() => handleClick(item)} >借Game</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </InfiniteScroll>
            </Grid>
            <RentGameDialog rentContent={rentContent} setRentContent={setRentContent} record={selectGame} open={open} handleOpen={setOpen} />
        </Paper >
    )
}

export default GameList