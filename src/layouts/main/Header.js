import { Home, Logout, Menu, Settings, Wallet } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover, Stack, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../providers/GlobalContext"
import { useNavigate } from "react-router-dom"
import { Iconify } from "../../components/Iconify"
import { format } from "date-fns"
import { HEADER_HEIGHT } from "../../utils/config"

export const PhoneHeader = () => {
    const [time, setTime] = useState(format(new Date(), "HH:mm"))
    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setTime(format(new Date(), "HH:mm"));
        }, 60 * 1000);

        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            px={6}
            pt={4}
            position={"absolute"}
            zIndex={100}
            left={0}
            right={0}
        >
            <Typography
                variant={"body1"}
                fontWeight={"bold"}
                fontSize={"14px"}
            >
                {time}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Iconify 
                icon={"ic:outline-wifi"} 
                sx={{
                    fontSize: '18px',
                    marginRight: 0.5
                }}    
            />
            <Iconify 
                icon={"fa:battery"} 
                sx={{
                    fontSize: '14px'
                }}    
            />
        </Stack>
    );
}

export const MainHeader = () => {
    const { walletNotifications } = useContext(GlobalContext);
    const [menuAnchor, setMenuAnchor] = useState(null)
    const navigate = useNavigate();

    const open = Boolean(menuAnchor);

    const handleClose = (to) => {
        navigate(to)
        setMenuAnchor(null)
    }

    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            px={5}
            // pt={4}
            position={"absolute"}
            zIndex={100}
            top={53}
            left={0}
            right={0}
        >
            <IconButton
                onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
                <Menu />
            </IconButton>
            <Popover
                // id={id}
                open={open}
                anchorEl={menuAnchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List>
                    <ListItemButton onClick={() => handleClose('/home')}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClose('/settings')}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClose('/')}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Popover>
            <Box sx={{ flexGrow: 1 }} />
            <Badge badgeContent={walletNotifications.length} color="primary">
                <IconButton
                    onClick={() => {
                        navigate('/wallet')
                    }}
                >
                    <Wallet />
                </IconButton>
            </Badge>
            <Settings sx={{ ml: 1 }} /> 
        </Stack>
    )

    return (
        <AppBar
            sx={{
                background: 'white',
                color: 'black',
                boxShadow: 'none',
                maxWidth: '430px',
                right: 'auto'
            }}
            position={"absolute"}
        >
            <Toolbar>
                <Menu />
                <Box sx={{ flexGrow: 1 }} />
                <Badge badgeContent={walletNotifications.length} color="primary">
                    <IconButton
                        onClick={() => {
                            navigate('/wallet')
                        }}
                    >
                        <Wallet />
                    </IconButton>
                </Badge>
                <Settings sx={{ ml: 1 }} />
            </Toolbar>
        </AppBar>
    )
}