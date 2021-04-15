import { useToast } from '@chakra-ui/react';

export const useErrorHandler = () => {
    const toast = useToast();
    return (e: any) => {
        if (e instanceof Error) {
            toast({
                title: '唷，有錯誤喔！',
                description: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        toast({
            title: '不知名錯誤',
            description: '伺服器發生錯誤',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    };
};
