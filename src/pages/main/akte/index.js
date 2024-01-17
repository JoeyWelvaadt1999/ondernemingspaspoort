import { Box, Button, Card, CardHeader, Checkbox, CircularProgress, Stack, Typography } from "@mui/material"
import { useContext } from "react";
import { GlobalContext } from "../../../providers/GlobalContext";
import { Iconify } from "../../../components/Iconify";
import { enqueueSnackbar } from "notistack";

export default () => {
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
            <Card
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.light,
                    m: 2
                }}
            >
                <CardHeader 
                    title={
                        <Stack
                            direction={"row"}
                        >
                            <Iconify icon={"mdi:wallet"} />
                            <Typography
                                fontWeight={"bold"}
                                variant={"h5"}
                            >
                                Akte van oprichting ontvangen
                            </Typography>
                        </Stack>
                    }
                    subheader={"Bekijk de akte in u wallet"}

                />
            </Card>
            <Stack
                spacing={1}
                px={2}
            >
                    
                <Typography
                    variant={"h5"}
                    fontWeight={"bold"}
                >
                    Je gegevens met andere
                </Typography>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                >
                    <Iconify icon={"entypo:v-card"} sx={{ width: 64, height: 64, color: 'lightblue', mr: 2 }} />
                    <Typography variant="body" fontWeight="bold" >Gegevens delen met KvK</Typography>
                    <Box sx={{ flexGrow: 1}} />
                    <Checkbox 
                        checked
                    />
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                >
                    <Iconify icon={"entypo:v-card"} sx={{ width: 64, height: 64, color: 'lightblue', mr: 2 }} />
                    <Typography variant="body" fontWeight="bold" >Gegevens delen met belastingdienst</Typography>
                    <Box sx={{ flexGrow: 1}} />
                    <Checkbox 
                        checked
                    />
                </Stack>
                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => {
                        enqueueSnackbar("Er is een aanvraag verstuurd naar u wallet")
                        setWalletNotifications([3])
                    }}
                >            
                    Akkoord        
                </Button>
            </Stack>
        </Box>
    )
}