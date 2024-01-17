import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom"
import { MainHeader, PhoneHeader } from "./Header";
import { HEADER_HEIGHT } from "../../utils/config";
import { useRef } from "react";


export const MainLayout = () => {
    const { pathname } = useLocation();
    const containerRef = useRef();
    console.log(pathname)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                maxHeight: '866px'
            }}
            ref={containerRef}
        >
            <Box 
                component={"img"}
                src={"assets/iphone.png"}
                position={"absolute"}
                zIndex={1}
                sx={{
                    pointerEvents: 'none'
                }}
            />
            <PhoneHeader />
            <MainHeader />
            <Box
                sx={{
                    height: `calc(100vh - ${HEADER_HEIGHT}px - 53px)`,
                    mt: `calc(${HEADER_HEIGHT}px + 53px)`,
                    mx: 3.5,
                    overflow:'auto'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}