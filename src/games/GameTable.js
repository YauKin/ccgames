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
    Button
} from "@mui/material";
import { setCookie } from "../unit/cookie";
export const GameTable = (props) => {
    const { gameData, page, perPage, totalGameNum, setPage, getGames } = props;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setCookie("page", newPage, 9999);
        getGames(newPage);
    };
    // console.log("Game List: ", props)
    return (
        <Paper>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="games table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Game Type</TableCell>
                            <TableCell>Hot Number</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameData
                            ? gameData.map((game) => (
                                <TableRow key={`key_${game.id}`}>
                                    <TableCell>{game.id}</TableCell>
                                    <TableCell>{game.productName}</TableCell>
                                    <TableCell>{game.productType}</TableCell>
                                    <TableCell>{game.hotNum}</TableCell>
                                    <TableCell><Button>View</Button></TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={totalGameNum}
                rowsPerPage={perPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
};