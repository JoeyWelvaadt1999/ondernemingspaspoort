import React, { useContext } from 'react';
import { Typography, Button, Container, Box, Stack, CardHeader, Card, CardContent, CircularProgress, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../providers/GlobalContext';

export default () => {
    const navigate = useNavigate();
    const { hasSelected, setHasSelected, steps, currentStep, currentStepInformation } = useContext(GlobalContext);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 0}}>
            <Box
                sx={{
                    backgroundImage: `url(assets/home.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    padding: 4,
                    color: 'white',
                    position: 'relative',
                    filter: `sepia(60%)`
                }}
            >
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2, zIndex: 10 }}>
                    Hello, Joey!
                </Typography>
                <Typography sx={{ mb: 3, zIndex: 10 }}>
                    Ga aan de slag met jouw onderneming. Via deze applicatie kun je al je credentials van jouw onderneming bewaren en beheren.
                </Typography>
            </Box>
            {!hasSelected &&
                <Stack>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', m: 2, zIndex: 10 }}>
                        Acties
                    </Typography>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        justifyContent={"space-evenly"}
                    >
                        <Card
                            onClick={() => {
                                setHasSelected(true)
                            }}
                            sx={(theme) => ({
                                background: theme.palette.primary.main,
                                width: '40%',
                                ":hover": {
                                    background: theme.palette.primary.dark,
                                }
                            })}
                        >
                            <CardContent>
                                <Typography variant="h6" color={"white"} fontWeight={"bold"}>Cooperatie oprichten</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={(theme) => ({
                                background: theme.palette.primary.main,
                                width: '40%'
                            })}
                        >
                            <CardContent>
                                <Typography variant="h6" color={"white"} fontWeight={"bold"}>BV oprichten</Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Stack>
            }
            {hasSelected && 
                <Stack
                    direction={"row"}
                    sx={{
                        m: 2
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
                        <Typography variant="h6" fontWeight="bold">{currentStepInformation.title}</Typography>
                        <Typography variant="caption"><b>Volgende: </b>{currentStepInformation.next}</Typography>
                    </Stack>
                </Stack>
            }
            <Stack>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', m: 2, zIndex: 10 }}>
                    Mijn overzicht
                </Typography>
                {!hasSelected && 
                    <Typography variant="caption" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', m: 2, zIndex: 10 }}>
                        Geen activiteiten beschikbaar
                    </Typography>
                }
                {hasSelected && 
                    steps.map((step, i) => {
                        return (
                            <Card
                                sx={(theme) => ({
                                    background: theme.palette.grey[300],
                                    m: 4
                                })}
                                key={i}
                            >
                                <CardHeader 
                                    title={
                                        <Stack
                                            direction={"row"}
                                        >
                                            {step.icon}
                                            <Typography variant='h6' fontWeight={"bold"}>{step.title}</Typography>
                                        </Stack>
                                    }
                                />
                                <CardContent>
                                    <Typography>{step.content}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        color={"primary"}
                                        variant={"contained"}
                                        sx={{
                                            color: "white"
                                        }}
                                        disabled={(currentStep != i)}
                                        onClick={() => {
                                            if(step.action) {
                                                step.action();
                                            }
                                            navigate(step.link)
                                        }}
                                    >
                                        {currentStep > i ? "Voltooid" : "Aan de slag"}
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Stack>
        </Box>
    );
};