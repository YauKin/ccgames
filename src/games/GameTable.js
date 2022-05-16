import React from "react";
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
export const GameTable = (props) => {
    const { gameData, page, perPage, totalGameNum, setPage, getGames, pagination } = props;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setCookie("page", newPage, 9999);
        getGames(newPage);
    };

    const createHTML = (string) => {
        return { __html: string }
    }
    // console.log("Game List: ", props)
    return (
        <Paper>
            <TableContainer style={{ marginBottom: 10 }}>
                <Table aria-label="games table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Game Type</TableCell>
                            <TableCell >
                                <Grid className="tablecell">
                                    <LocalFireDepartmentOutlinedIcon /><span>Hot Number</span>
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
                                    <TableCell>{game.productName}</TableCell>
                                    <TableCell>{game.productType}</TableCell>
                                    <TableCell>
                                        <Grid className="tablecell">
                                            {game.hotNum}
                                        </Grid>
                                    </TableCell>
                                    {
                                        (getCookie("authCode") && getCookie("userid"))
                                        &&
                                        <TableCell align="center">
                                            <Grid className="tablecell">
                                                <Button>借Game</Button>
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
        </Paper>
    );
};