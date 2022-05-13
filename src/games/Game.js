import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config/env";
import { getCookie, setCookie } from "../unit/cookie";
import { GameTable } from './GameTable';
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
      <GameTable
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