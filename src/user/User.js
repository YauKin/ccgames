import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getCookie } from "../unit/cookie";
import { Login } from "./Login";
import { UserInfo } from "./UserInfo";
export const User = () => {
    const [isLogin, setIsLogin] = useState("")
    useEffect(() => {
        setIsLogin(getCookie("authCode") ? true : false)
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }} >
            {
                !isLogin && <Login />
            }
            {
                isLogin && <UserInfo />
            }
        </Box>
    )
}