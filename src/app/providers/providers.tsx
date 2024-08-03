import React, {ReactNode} from 'react';
import {createTheme, CssBaseline, darkScrollbar, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "../store";

interface ProvidersProps {
    readonly children: ReactNode
}

const Providers = ({children}) => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        ...darkScrollbar(),
                        scrollbarWidth: "thin"
                    }
                }
            }
        }
    })

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default Providers;