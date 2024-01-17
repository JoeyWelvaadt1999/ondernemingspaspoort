import React, { useContext } from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses, timelineOppositeContentClasses } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Celebration } from '@mui/icons-material';
import { GlobalContext } from '../../providers/GlobalContext';
import { enqueueSnackbar } from 'notistack';

export default () => {
    const { setWalletNotifications } = useContext(GlobalContext);
    const navigate = useNavigate();

    const steps = [
        { text: 'Log in met je wallet', completed: true },
        { text: 'Vul je bedrijfsgegevens in en maak online een afspraak bij de notaris', completed: true },
        { text: 'Ontvang de akte van oprichting', completed: true },
        { text: 'Ontvang KVK- en BTW nummer', completed: true },
        { text: 'Open een zakelijke bankrekening', completed: true },
        { text: 'Jouw BV of coorperatie is opgericht!', completed: true, icon: <Celebration sx={{ fontSize: 14}} /> }
    ];

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
                    Hello!
                </Typography>
                <Typography sx={{ mb: 3, zIndex: 10 }}>
                    Ga aan de slag met jouw onderneming. Via deze applicatie kun je al je credentials van jouw onderneming bewaren en beheren.
                </Typography>
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', m: 1, zIndex: 10 }}>
                Hoe werkt het?
            </Typography>
            <Timeline 
                sx={{ 
                    maxWidth: '100%', 
                    bgcolor: 'background.paper',
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },  
                }}
            >
                {steps.map((step, index) => (
                    <TimelineItem key={index} disableGutters>
                        <TimelineSeparator>
                            <TimelineDot 
                                color="primary"
                                sx={{
                                    aspectRatio: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}    
                            >
                                <Typography variant={"caption"} fontWeight={"bold"}>{step.icon || index + 1}</Typography>
                            </TimelineDot>
                            {index < steps.length - 1 && <TimelineConnector sx={{ ml: 1.5 }} />}
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{
                                pt: 2,
                                ml: 1
                            }}  
                        >
                            {step.text}
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            <Button 
                onClick={() => {
                    enqueueSnackbar('A notification has been sent to your wallet')
                    setWalletNotifications([1])
                }} 
                variant="contained" 
                sx={{ m: 2, py: 1.5, px: 5 }}
            >
                Inloggen
            </Button>
        </Box>
    );
};