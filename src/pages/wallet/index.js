import { Button, Card, CardActions, CardContent, CardHeader, Container, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { GlobalContext } from "../../providers/GlobalContext"
import { Check, Close, Info, InfoOutlined, Person, PersonOutlineSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default () => {
    const { walletNotifications, setWalletNotifications, walletData, setAuthenticated, setAgreed, setCurrentStep, setWalletData } = useContext(GlobalContext);
    const navigate = useNavigate();
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', p: 2}}>
            {walletNotifications[0] === 1 && 
                <Card
                    sx={{
                        background: 'gray',
                        color: 'white',
                        mb: 2,
                        borderRadius: 5
                    }}
                >
                    <CardHeader 
                        title={
                            <Stack
                                direction={"row"}
                                spacing={1}
                            >
                                <InfoOutlined sx={{ fontSize: 24 }}/>
                                <Typography variant="h6" fontWeight={"bold"}>Aanvraag op toegang</Typography>
                            </Stack>
                        }
                    />
                    <CardContent>
                        De app Ondernemingspaspoort vraagt toegang tot jouw wallet om gegevens toe te voegen en gebruiken.
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant={"contained"}
                            color={"success"}
                            onClick={() => {
                                setWalletNotifications([])
                                setAuthenticated(true)
                                navigate('/home')
                            }}
                        >
                            <Check />
                            Accepteren
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => {
                                setWalletNotifications([])
                                setAuthenticated(true)
                                navigate('/')
                            }}
                        >
                            <Close />
                            Weigeren
                        </Button>
                    </CardActions>
                </Card>
            }
            {walletNotifications[0] === 2 && 
                <Card
                    sx={{
                        background: 'gray',
                        color: 'white',
                        mb: 2,
                        borderRadius: 5
                    }}
                >
                    <CardHeader 
                        title={
                            <Stack
                                direction={"row"}
                                spacing={1}
                            >
                                <InfoOutlined sx={{ fontSize: 24 }}/>
                                <Typography variant="h6" fontWeight={"bold"}>Aanvraag op toegang</Typography>
                            </Stack>
                        }
                    />
                    <CardContent>
                        De app Ondernemingspaspoort wilt informatie gaan delen met de notaris.
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant={"contained"}
                            color={"success"}
                            onClick={() => {
                                setWalletNotifications([])
                                setAgreed(true)
                                navigate('/notaris')
                            }}
                        >
                            <Check />
                            Accepteren
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => {
                                setWalletNotifications([])
                                navigate('/')
                            }}
                        >
                            <Close />
                            Weigeren
                        </Button>
                    </CardActions>
                </Card>
            }
            {walletNotifications[0] === 3 && 
                <Card
                    sx={{
                        background: 'gray',
                        color: 'white',
                        mb: 2,
                        borderRadius: 5
                    }}
                >
                    <CardHeader 
                        title={
                            <Stack
                                direction={"row"}
                                spacing={1}
                            >
                                <InfoOutlined sx={{ fontSize: 24 }}/>
                                <Typography variant="h6" fontWeight={"bold"}>Aanvraag op toegang</Typography>
                            </Stack>
                        }
                    />
                    <CardContent>
                        KvK en de belastingdienst willen toegang tot u gegevens, zodat er nieuwe credentials aan u kunnen worden toegekend.
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant={"contained"}
                            color={"success"}
                            onClick={() => {
                                enqueueSnackbar("KvK en belastingsdienst credentials zijn toegevoegd aan u wallet")
                                setWalletNotifications([])
                                setCurrentStep(prevState => prevState + 1)
                                setWalletData(prevState => ([
                                    ...prevState,
                                    {
                                        title: "Inschrijving Cooperatie",
                                        data: [
                                            "Uitgever: KvK",
                                            "Generic BV",
                                            "Heidelberglaan 15, 2015 EL Utrecht", 
                                            "Software ontwikkeling"
                                        ],
                                        color: "linear-gradient(#65a2ff, #ff8c42)"
                                    },
                                    {
                                        title: "Belastingsdienst",
                                        data: [
                                            "Uitgever: Belastingsdienst",
                                            `Tijd: ${new Date().toTimeString()}`,
                                            "BTW: NL1233444359B01",
                                            "Omzet: 102930128B01"
                                        ],
                                        color: "linear-gradient(#42e1ff, #ffa742)"
                                    }
                                ]));
                                navigate('/home')
                            }}
                        >
                            <Check />
                            Accepteren
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => {
                                setWalletNotifications([])
                                navigate('/')
                            }}
                        >
                            <Close />
                            Weigeren
                        </Button>
                    </CardActions>
                </Card>
            }
            {walletData.map((entry, i) => {
                return (
                    <Card
                        key={i}
                        sx={{
                            background: entry.color,
                            color: 'white',
                            borderRadius: 5,
                            mb: 2
                        }}
                    >
                        <CardHeader 
                            title={
                                <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                >
                                    <Typography variant={"h6"} fontWeight={"bold"}>{entry.title}</Typography>
                                    <PersonOutlineSharp />
                                </Stack>
                            }
                        />
                        <CardContent>
                            <Stack
                                spacing={1}
                            >
                                {entry.data.map((dataPoint, j) => {
                                    return (
                                        <Typography
                                            key={j}
                                        >
                                            {dataPoint}
                                        </Typography>
                                    )
                                })}
                            </Stack>
                        </CardContent>
                    </Card>
                )
            })}
        </Container>
    )
}