import React from 'react';
import Recoil from 'recoil';
import { useToast } from '@chakra-ui/react';

export const ErrorState = Recoil.atom<any>({
    key: 'ErrorState',
    default: null,
});

export const ErrorBoundary = React.memo(() => {
    const error = Recoil.useRecoilValue(ErrorState);
    const toast = useToast();

    React.useEffect(() => {
        if (error !== null) {
            toast({
                title: '唷，有錯誤喔！',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    }, [error]);

    return null;
});
