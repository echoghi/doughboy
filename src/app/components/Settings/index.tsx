import React, { useEffect } from 'react';

import AccountInfo from './AccountInfo';
import GeneralInfo from './GeneralInfo';
import GoalsInfo from './GoalsInfo';
import DeleteAccount from './DeleteAccount';
import { SettingsWrapper, Container } from './styles';

export default function Settings() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <SettingsWrapper>
                <GeneralInfo />
                <AccountInfo />
                <GoalsInfo />
                <DeleteAccount />
            </SettingsWrapper>
        </Container>
    );
}
