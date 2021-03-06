import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config/env";
import { TextField, Box } from "@mui/material";
import { GameTable } from './GameTable';
export const GameSearch = (props) => {
    const [gameData, setGameData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const getGames = (key) => {
        axios
            .get(`https://joegorccgames.herokuapp.com/${baseURL}/product/getProductList/`, {
                params: {
                    key: key,
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
    };
    const handleChange = (e) => {
        getGames(e.target.value)
    }
    return (
        <Box padding={3}>
            <TextField label="Search" size="small" onChange={handleChange} fullWidth />
            {
                gameData.length > 0
                &&
                <GameTable
                    pagination={false}
                    gameData={gameData} />
            }

        </Box>

    );
};
