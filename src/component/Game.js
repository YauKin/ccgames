import React, { useState, useEffect } from "react";
import axios from "axios";

import { baseURL } from "../config/env";

const GameList = (props) => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(`${baseURL}/product/getProductList/`, {
        params: {
          cId: 0,
          page: 1,
          authLoginCode: ""
        }
      })
      .then((res) => {
        setGameData(res.data.data.rows);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    gameData.length > 0 && console.log("Game List: ", gameData);
  }, [gameData]);
  return <p>Testing API</p>;
};

export const Game = (props) => {
  return <GameList />;
};
