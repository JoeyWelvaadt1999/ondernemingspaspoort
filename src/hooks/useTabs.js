import { useState } from 'react';

export const useTabs = (defaultValues) => {
    const [currentTab, setCurrentTab] = useState(defaultValues || '');

    return {
        currentTab,
        onChangeTab: (event, newValue) => {
            setCurrentTab(newValue);
        },
        setCurrentTab,
    };
}
