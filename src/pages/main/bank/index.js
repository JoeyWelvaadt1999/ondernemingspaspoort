import { Box, Button, Card, CardHeader, Checkbox, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { GlobalContext } from "../../../providers/GlobalContext";
import { Iconify } from "../../../components/Iconify";
import { enqueueSnackbar } from "notistack";

export default () => {
    const [value, setValue] = useState("https://www.abnamro.nl/nl/prive/index.html");
    const { setWalletData, steps, currentStep, setCurrentStep, currentStepInformation, setWalletNotifications, walletData } = useContext(GlobalContext);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 0}}>
            <Stack
                direction={"row"}
                sx={{
                    p: 2,
                    backgroundColor: (theme) => theme.palette.grey[100]
                }}
            >
                <Stack
                    position={"relative"}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography>{currentStep + 1} of {steps.length}</Typography>
                    </Box>
                    <CircularProgress sx={(theme) => ({ position: "absolute", color: theme.palette.grey[200] })} size={80} variant='determinate' value={100}/>
                    <CircularProgress size={80} variant='determinate' value={(currentStep + 1) * (100 / steps.length)}/>
                </Stack>
                <Stack
                    justifyContent={"center"}
                    ml={2}
                >
                    <Typography variant="h5" fontWeight="bold">{currentStepInformation.title}</Typography>
                    <Typography variant="caption"><b>Volgende: </b>{currentStepInformation.next}</Typography>
                </Stack>
            </Stack>
            <Stack
                spacing={1}
                px={2}
            >
                    
                <Typography
                    variant={"h5"}
                    fontWeight={"bold"}
                >
                    Vraag zakelijke bankrekening aan
                </Typography>
                <TextField
                    label={"Kies je bank"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    select
                >
                    <MenuItem value={"https://www.abnamro.nl/nl/prive/index.html"}>ABN AMRO</MenuItem>
                    <MenuItem value={"https://www.ing.nl/particulier"}>ING</MenuItem>
                    <MenuItem value={"https://www.rabobank.nl/particulieren"}>rabobank</MenuItem>
                </TextField>
                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => {
                        window.open(value, '_blank');
                    }}
                >            
                    Akkoord        
                </Button>
            </Stack>
        </Box>
    )
}