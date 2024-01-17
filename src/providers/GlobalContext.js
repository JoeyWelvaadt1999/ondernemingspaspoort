import { createContext, useState } from "react";
import { useTabs } from "../hooks/useTabs";
import { BorderColor, FileCopy, Home, Key, Person, VideoChat } from "@mui/icons-material";

export const GlobalContext = createContext();

export const GlobalTabs = [
    {
        label: "Home",
        icon: <Home />
    },
    {
        label: "Gegevens",
        icon: <FileCopy />
    },
    {
        label: "Toegang",
        icon: <Key />
    },
    {
        label: "Profiel",
        icon: <Person />
    }
]

export const GlobalProvider = ({ children }) => {
    const { currentTab } = useTabs('home');
    const [authenticated, setAuthenticated] = useState(false);
    const [agreed, setAgreed] = useState(false)
    const [hasSelected, setHasSelected] = useState(false);
    const [walletNotifications, setWalletNotifications] = useState([]);
    const [walletData, setWalletData] = useState([
        {
            title: "Persoonsgegevens",
            data: [
                "Joey Welvaadt",
                "Heidelberglaan 15, 2015 EL Utrecht", 
                "11 november 1999",
                "BSN: 123654798"
            ],
            color: "linear-gradient(#3d76d1, #568ce3)"
        },
        {
            title: "UBO Register",
            data: [
                "11 november 1999, Nederland, Amsterdam",
                "TIN: 123654798",
                "Nederlands",
                "Heidelberglaan 15, 2015 EL Utrecht", 
            ],
            color: "linear-gradient(#a1a6d1, #c28fe3)"
        }
    ]);
    
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([
        {
            icon: <BorderColor />,
            title: "Vul de gegevens van je Cooperatie in",
            content: "Voor het oprichten van je cooperatie hebben we een aantal gegevens nodig. Vul deze gegevens aan om verder te kunnen.",
            link: '/kvk'
        },
        {
            icon: <VideoChat />,
            title: "Maak een afspraak bij de notaris",
            content: "Kies een notaris en plan een afspraak in.",
            link: '/notaris'
        },
        {
            icon: <Key />,
            title: "Akte van oprichting",
            content: "Akte van oprichting van notariaat wordt verstuurd",
            link: '/akte'
        },
        {
            icon: <Key />,
            title: "Goedkeuring KVK & belastingdienst",
            content: "De akte van oprichting moet worden goedgekeurd door de KVK & de belastingdienst",
            link: '/goedkeuring',
            action: () => setCurrentStep(prevState => prevState + 1)
        },
        {
            icon: <Key />,
            title: "Zakelijke bankrekening openen",
            content: "U kunt nu een zakelijke bankrekening openen en het oprichten van de ondernemingvoltooien",
            link: '/bank'
        }
    ])
    const [currentStepInformation, setCurrentStepInformation] = useState({
        title: "Start oprichting",
        next: "Intake gesprek notaris"
    });

    const changeStepInformation = (next) => {
        setCurrentStepInformation(prevState => ({
            title: prevState.next,
            next
        }))
    }

    return (
        <GlobalContext.Provider
            value={{
                currentTab,
                walletNotifications,
                authenticated,
                walletData,
                hasSelected,
                steps,
                currentStep,
                currentStepInformation,
                agreed,
                setAgreed,
                changeStepInformation,
                setCurrentStep,
                setSteps,
                setHasSelected,
                setWalletData,
                setAuthenticated,
                setWalletNotifications
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}