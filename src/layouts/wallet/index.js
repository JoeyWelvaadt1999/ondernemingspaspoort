import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"
import { HEADER_HEIGHT } from "../../utils/config";
import { WalletHeader } from "./Header";
import { PhoneHeader } from "../main/Header";


export const WalletLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                maxHeight: '866px'
            }}
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
            <WalletHeader />
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