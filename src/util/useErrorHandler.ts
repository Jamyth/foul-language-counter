import Recoil from 'recoil';
import { ErrorState } from 'component/ErrorBoundary';

export const useErrorHandler = () => {
    const setError = Recoil.useSetRecoilState(ErrorState);

    return (e: any) => {
        if (e instanceof Error) {
            setError(e);
            return;
        }

        setError(new Error('伺服器發生錯誤'));
    };
};
