import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from "@mui/material";
import { baseURL } from "../config/env";
import { getCookie, setCookie } from "../unit/cookie";

const GameList = (props) => {
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
              {/* <TableCell>Discription</TableCell> */}
              <TableCell>Hot Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData
              ? gameData.map((game) => (
                  <TableRow key={`key_${game.id}`}>
                    <TableCell>{game.id}</TableCell>
                    <TableCell>{game.productName}</TableCell>
                    <TableCell>{game.productType}</TableCell>
                    {/* <TableCell>{game.abstract}</TableCell> */}
                    <TableCell>{game.hotNum}</TableCell>
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

export const Game = (props) => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState(
    getCookie("page") ? parseInt(getCookie("page")) : 0
  );
  const [perPage, setPerPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalGameNum, setTotalGameNum] = useState(0);
  useEffect(() => {
    !getCookie("page") && setCookie("page", page, 9999);
    getGames(page);
  }, []);
  const getGames = (page) => {
    axios
      .get(`${baseURL}/product/getProductList/`, {
        params: {
          cId: 0,
          page: page + 1,
          authLoginCode: ""
        }
      })
      .then((res) => {
        let totalGameNum = parseInt(res.data.data.total);
        let perPage = res.data.data.rows.length;
        setPerPage(perPage);
        setTotalGameNum(totalGameNum);
        setTotalPage(parseInt((totalGameNum / perPage).toFixed()));
        setGameData(res.data.data.rows);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    !isLoading && (
      <GameList
        gameData={gameData}
        page={page}
        perPage={perPage}
        totalPage={totalPage}
        totalGameNum={totalGameNum}
        setPage={setPage}
        getGames={getGames}
      />
    )
  );
};
