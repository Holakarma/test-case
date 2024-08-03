import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {CompaniesTable} from "widgets/companies-table";

const MainPage = () => {

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h2">
                        test case
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container><CompaniesTable/></Container>
        </>
    );
};

export default MainPage;