import { Box, Button, CircularProgress, InputAdornment, MenuItem, Stack, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../../../providers/GlobalContext"
import { FormProvider } from "../../../components/hookform/FormProvider"
import { useForm } from "react-hook-form"
import { RHFTextField } from "../../../components/hookform/TextField"
import { RHFSelect } from "../../../components/hookform/Select"
import { RHFCheckbox } from "../../../components/hookform/Checkbox"

export default () => {
    const navigate = useNavigate();
    const { setWalletData, steps, currentStep, setCurrentStep, currentStepInformation, changeStepInformation, walletData } = useContext(GlobalContext);
    const [localCurrentStep, setLocalCurrentStep] = useState(0);

    const methods = useForm({
        defaultValues: {
            name: "",
            email: "",
            statue: "",
            activities: "",
            descriptionActivities: "",
            sales: "",
            locationSales: "",
            export: false,
            zipCode: "",
            number: "",
            street: "",
            city: "",
            country: "Nederland",
            bookYear: "",
            fullTime: "",
            partTime: "",
            loan: false,
            owner: "",
            ownerCeo: false,
            ownerUbo: false
        }
    })

    const { 
        handleSubmit
    } = methods;

    const onSubmit = async () => {
        navigate('/home')
        setCurrentStep(prevState => prevState + 1)
        changeStepInformation("Inschrijving & goedkeuring KVK")
        enqueueSnackbar("Informatie is verstuurd naar de notaris")
    }

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
                sx={{
                    mb: 4,
                    padding: 2
                }}
            >
                <Stack
                    spacing={1}
                    mb={1}
                >
                        
                    <Typography
                        variant={"h5"}
                        fontWeight={"bold"}
                    >
                        Vul de gegevens van jouw Cooperatie in
                    </Typography>
                    <Typography>Vul het onderstaande formulier in. Deze infromatie is nodig voor het oprichten van jouw onderneming en voor het maken van een afspraak met de notaris.</Typography>
                    
                    <Stack
                        spacing={2}
                        direction={"row"}
                    >
                        <Box 
                            sx={{
                                height: 7,
                                flexGrow: 1,
                                backgroundColor: (theme) => theme.palette.primary.main
                            }}
                        />
                        <Box 
                            sx={{
                                height: 7,
                                flexGrow: 1,
                                backgroundColor: (theme) => localCurrentStep === 0 ? theme.palette.grey[100] : theme.palette.primary.main
                            }}
                        />
                    </Stack>
                </Stack>
                <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {localCurrentStep === 0 &&
                        <Stack
                            spacing={1}
                        >
                            <Typography
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                Persoonsgegevens
                            </Typography>
                            <Stack
                                spacing={0.5}
                            >
                                {walletData[0].data.map((entry, i) => {
                                    return <Typography key={i}>{entry}</Typography>
                                })}
                            </Stack>
                            <Typography
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                UBO Gegevens
                            </Typography>
                            <Stack
                                spacing={0.5}
                            >
                                {walletData[1].data.map((entry, i) => {
                                    return <Typography key={i}>{entry}</Typography>
                                })}
                            </Stack>
                            {/* <Typography
                                mt={1}
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                Bedrijfsinformatie
                            </Typography>
                            <Stack
                                spacing={2}
                            >
                                <RHFTextField 
                                    name={"name"}
                                    label={"Bedrijfsnaam"}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">B.V.</InputAdornment>,
                                    }}
                                />
                                <RHFTextField 
                                    name={"email"}
                                    label={"E-mail contactpersoon"}
                                />
                                <RHFTextField 
                                    name={"statue"}
                                    label={"Statutaire zetel"}
                                />
                                <RHFSelect
                                    name={"activities"}
                                    label={"Activiteit van het bedrijf"}
                                >
                                    <MenuItem value={"Marketing"}>Marketing</MenuItem>
                                    <MenuItem value={"Software"}>Software development</MenuItem>
                                </RHFSelect>
                                <RHFTextField 
                                    name={"descriptionActivities"}
                                    label={"Toelichting van de activiteiten"}
                                />
                                <RHFTextField 
                                    name={"sales"}
                                    label={"Verkoop aan consumenten door onderneming"}
                                />
                                <RHFTextField 
                                    name={"locationSales"}
                                    label={"Waar worden de producten verkocht?"}
                                />
                                <RHFCheckbox 
                                    name={"export"}
                                    label={"Producten worden geexporteerd"}
                                />
                                <Typography
                                    variant={"h6"}
                                    fontWeight={"bold"}
                                >
                                    Vestegingsadres
                                </Typography>
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                >
                                    <RHFTextField 
                                        name={"number"}
                                        label={"Huisnummer"}
                                    />
                                    <RHFTextField 
                                        name={"zipCode"}
                                        label={"Postcode"}
                                    />
                                </Stack>
                                <RHFTextField 
                                    name={"street"}
                                    label={"Straat"}
                                />
                                <RHFTextField 
                                    name={"city"}
                                    label={"Stad"}
                                />
                                <RHFTextField 
                                    name={"country"}
                                    label={"Land"}
                                    disabled
                                />
                            </Stack> */}
                            <Stack
                                direction={"row"}
                                justifyContent={"end"}
                            >
                                
                                <Button
                                    onClick={() => setLocalCurrentStep(1)}
                                    variant="contained"
                                >
                                    Next
                                </Button>
                            </Stack>
                        </Stack>
                    }
                    {localCurrentStep === 1 &&
                        <Stack
                            spacing={2}
                        >
                            <Typography
                                mt={1}
                                variant={"h5"}
                                fontWeight={"bold"}
                            >
                                Bedrijfsinformatie
                            </Typography>
                            
                            {/* <RHFTextField 
                                name={"bookYear"}
                                label={"Eerste boekjaar"}
                            />
                            <RHFTextField 
                                name={"fullTime"}
                                label={"Aantal fulltime (+15 uur) werknemers"}
                            />
                            <RHFTextField 
                                name={"partTime"}
                                label={"Aantal parttime werknemers"}
                            />
                            <RHFCheckbox 
                                name={"loan"}
                                label={"Er is sprake van incidenteel uitlenen van werknemers"}
                            /> */}
                            <RHFTextField 
                                name={"owner"}
                                label={"Bestuurder"}
                            />
                            <RHFCheckbox 
                                name={"ownerCeo"}
                                label={"Oprichter is bestuurder"}
                            />
                            {/* <RHFCheckbox 
                                name={"ownerUbo"}
                                label={"Oprichter is UBO"}
                            /> */}
                        </Stack>
                    }
                    {localCurrentStep === 1 &&
                    <Button
                        sx={{
                            mb: 2,
                            mx: 2,
                            color: 'white'
                        }}
                        variant={"contained"}
                        type={"submit"}
                    >
                        Verstuur
                    </Button>
                }
                </FormProvider>
            </Stack>
            
        </Box>
    )
}