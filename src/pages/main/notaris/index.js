import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../providers/GlobalContext";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Box, Button, Checkbox, CircularProgress, MenuItem, Stack, Typography } from "@mui/material";
import { Iconify } from "../../../components/Iconify";
import { FormProvider } from "../../../components/hookform/FormProvider";
import { RHFTextField } from "../../../components/hookform/TextField";
import { RHFSelect } from "../../../components/hookform/Select";
import Calendar from "react-calendar";
import { format } from 'date-fns'
import { RHFCheckbox } from "../../../components/hookform/Checkbox";

export default () => {
    const navigate = useNavigate();
    const { setWalletData, steps, currentStep, setCurrentStep, currentStepInformation, changeStepInformation, setWalletNotifications, agreed } = useContext(GlobalContext);
    const [showMeeting, setShowMeeting] = useState(false);
    const [finalizeMeeting, setFinalizeMeeting] = useState(false);
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState();

    const methods = useForm({
        defaultValues: {
            name: "",
            city: "",
            zipCode: "",
            early: false,
            mid: false,
            late: false
        }
    })

    const { 
        handleSubmit
    } = methods;

    const onSubmit = async (data) => { 
        setFinalizeMeeting(true)
        setData(data)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 0}}>
            {!finalizeMeeting &&
                <>
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
                    {!agreed && 
                        <Stack
                            spacing={1}
                            px={2}
                        >
                                
                            <Typography
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                Je gegevens met notaris delen
                            </Typography>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <Iconify icon={"entypo:v-card"} sx={{ width: 64, height: 64, color: 'lightblue', mr: 2 }} />
                                <Typography variant="body" fontWeight="bold" >UBO Gegevens</Typography>
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
                                <Typography variant="body" fontWeight="bold" >Persoonlijke gegevens</Typography>
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
                                    setWalletNotifications([2])
                                }}
                            >            
                                Akkoord        
                            </Button>
                        </Stack>
                    }
                    <FormProvider
                        methods={methods}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                    {agreed && 
                        <Stack
                            spacing={1}
                            px={2}
                        >
                                
                            <Typography
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                Maak een afspraak
                            </Typography>
                            <Typography>Je kunt hieronder een notaris naar keuze selecteren voor een afspraak om je onderneming op te richten. Je kunt zoeken op naam of locatie van de notaris.</Typography>
                            
                            <Stack
                                spacing={2}
                            >
                                <RHFSelect
                                    name={"name"}
                                    label={"Kies notaris"}
                                >
                                    <MenuItem value={"Aanke"}>Aanke Notariaat</MenuItem>
                                </RHFSelect>
                                <RHFSelect
                                    name={"city"}
                                    label={"Kies notaris"}
                                >
                                    <MenuItem value={"Rotterdam"}>Rotterdam</MenuItem>
                                    <MenuItem value={"Utrecht"}>Utrecht</MenuItem>
                                    <MenuItem value={"Amsterdam"}>Amsterdam</MenuItem>
                                    <MenuItem value={"Groningen"}>Groningen</MenuItem>
                                </RHFSelect>
                                <RHFTextField 
                                    name={"zipCode"}
                                    label={"Postcode (Optioneel)"}
                                />
                                {!showMeeting &&
                                    <Button
                                        variant={"contained"}
                                        onClick={() => setShowMeeting(true)}
                                    >
                                        Volgende
                                    </Button>
                                }
                            </Stack>
                        </Stack>
                    }
                    {showMeeting && 
                        <Stack
                            spacing={1}
                            px={2}
                            mt={2}
                            mb={4}
                        >
                            <Calendar onChange={setDate} value={date} />
                            <Typography
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                {format(date, "dd MMMM :")}
                            </Typography>
                            <RHFCheckbox 
                                name={"early"}
                                label={"13:00 - 14:00"}
                            />
                            <RHFCheckbox 
                                name={"mid"}
                                label={"14:00 - 15:00"}
                            />
                            <RHFCheckbox 
                                name={"late"}
                                label={"15:00 - 16:00"}
                            />
                            <Button
                                variant={"contained"}
                                type={"submit"}
                            >
                                Volgende
                            </Button>
                        </Stack>
                    }
                    </FormProvider>
                </>
            }
            {finalizeMeeting && 
                <Stack
                    spacing={1}
                >
                    <Typography
                        variant={"h5"}
                        fontWeight={"bold"}
                    >
                        Bevestig jouw afspraak
                    </Typography>
                    <Typography>Kloppen de onderstaande gegevens?</Typography>
                    <Typography>{data.name}</Typography>
                    <Typography>{data.city}</Typography>
                    <Typography>{format(date, "dd MMMM:")}</Typography>
                    <Typography>{data.early ? "13:00 - 14:00" : data.mid ? "14:00 - 15:00" : data.late ? "15:00 - 16:00" : ""}</Typography>
                    
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            
                            navigate('/home')
                            setWalletData(prevState => ([
                                ...prevState,
                                {
                                    title: "Akte van oprichting",
                                    data: [
                                        "Uitgever: Mrs. RJK Van Beek",
                                        `Tijd: ${new Date().toTimeString()}`
                                    ],
                                    color: "linear-gradient(#c742ac, #f06cd5)"
                                }
                            ]));
                            setCurrentStep(prevState => prevState + 1)
                            changeStepInformation("Akte van oprichting")
                            enqueueSnackbar("Afspraak is bevestigd")
                        }}
                        
                    >
                        Bevestigen
                    </Button>
                    <Button
                        variant={"outlined"}
                        onClick={() => setFinalizeMeeting(false)}
                    >
                        Wijzigen
                    </Button>
                </Stack>
            }
        </Box>
    )
}