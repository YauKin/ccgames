import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
    Grid
} from "@mui/material";
import './game.css'
import { setCookie, getCookie } from "../unit/cookie";
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Box } from "@mui/system";
import { RentGameDialog } from '../component/dialog'
export const GameTable = (props) => {
    const { gameData, page, perPage, totalGameNum, setPage, getGames, pagination } = props;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setCookie("page", newPage, 9999);
        getGames(newPage);
    };
    const [open, setOpen] = useState(false);
    const [selectGame, setSelectGame] = useState("")
    const [rentContent, setRentContent] = useState(false)
    const handleClick = (record) => {
        setOpen(true)
        setSelectGame(record)
        setRentContent("")
    }

    return (
        <Paper>
            <TableContainer style={{ marginBottom: 10 }}>
                <Table aria-label="games table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell >
                                <Grid className="tablecell">
                                    <LocalFireDepartmentOutlinedIcon />
                                </Grid>
                            </TableCell>
                            {
                                (getCookie("authCode") && getCookie("userid"))
                                &&
                                <TableCell align="center">
                                    <Grid className="tablecell">
                                        Action
                                    </Grid>
                                </TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameData
                            ? gameData.map((game) => (
                                <TableRow key={`key_${game.id}`}>
                                    {/* <TableCell>{game.id}</TableCell> */}
                                    <TableCell>
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
                                            alt={game.productName}
                                            src={game.banner}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:11}}>{game.productName}</TableCell>
                                    <TableCell style={{fontSize:11}}>{game.productType}</TableCell>
                                    <TableCell>
                                        <Grid style={{fontSize:11}} className="tablecell">
                                            {game.hotNum}
                                        </Grid>
                                    </TableCell>
                                    {
                                        (getCookie("authCode") && getCookie("userid"))
                                        &&
                                        <TableCell align="center">
                                            <Grid className="tablecell">
                                                <Button style={{fontSize:11}} onClick={() => handleClick(game)} >借Game</Button>
                                            </Grid>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
                {
                    pagination
                    &&
                    <TablePagination
                        rowsPerPageOptions={[20]}
                        component="div"
                        count={totalGameNum}
                        rowsPerPage={perPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                }
            </TableContainer>
            <RentGameDialog rentContent={rentContent} setRentContent={setRentContent} record={selectGame} open={open} handleOpen={setOpen} />
        </Paper>
    );
};