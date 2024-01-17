import { useState } from "react";
import { GlobalTabs } from "../../providers/GlobalContext";
import { Drawer, IconButton, styled } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const MainNavigation = () => {
    const [value, setValue] = useState(0);
    return (
        <Drawer
            anchor={"left"}
            variant={"persistent"}
            open={true}
        >
            <DrawerHeader>
                <IconButton>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
        </Drawer>
    );
}