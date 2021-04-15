import React from 'react';
import { startApp, async } from 'coil-react';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import { useErrorHandler } from 'util/useErrorHandler';
import { ErrorBoundary } from 'component/ErrorBoundary';

const MainComponent = async(() => import('module/main'), 'MainComponent');

const App = React.memo(() => {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ErrorBoundary />
            <MainComponent />
        </ChakraProvider>
    );
});

startApp({
    MainComponent: App,
    entryElement: document.getElementById('app'),
    useError: useErrorHandler,
});
