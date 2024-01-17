import { ArrowLeft } from "@mui/icons-material"
import { IconButton, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const WalletHeader = () => {
    const navigate = useNavigate();
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            mx={1.6}
            // pt={4}
            position={"absolute"}
            zIndex={100}
            top={53}
            left={0}
            right={0}
            sx={(theme) => ({
                color: 'black',
                borderBottom: '1px solid black',
            })}
        >
            <IconButton
                onClick={() => {
                    navigate('/home')
                }}
            >
                <ArrowLeft />
            </IconButton>
        </Stack>
    )
}