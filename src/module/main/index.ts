import Recoil from 'recoil';
import { injectLifeCycle, useCoilState } from 'coil-react';
import { Main } from './Main';

interface State {
    accumulated: number;
    amount: number;
    delta: number;
    muted: boolean;
}

const initialState: State = {
    accumulated: 0,
    amount: 0,
    delta: 5,
    muted: false,
};

const MainState = Recoil.atom({
    key: 'MainState',
    default: initialState,
});

export const useMainState = <T>(fn: (state: State) => T): T => {
    const state = Recoil.useRecoilValue(MainState);
    return fn(state);
};

export const useMainStateAction = () => {
    const { getState, setState } = useCoilState(MainState);

    const onMount = () => {
        const rawItem = localStorage.getItem('@foul-counter');
        setState(rawItem ? JSON.parse(rawItem) : initialState);
    };

    const updateLocalStorage = () => {
        localStorage.setItem('@foul-counter', JSON.stringify(getState()));
    };

    const updateDelta = (delta: number) => {
        if (delta < 5) {
            throw new Error('罰金不能少於 5 喔');
        }
        setState((state) => (state.delta = delta));
        updateLocalStorage();
    };

    const toggleMute = () => {
        setState((state) => (state.muted = !state.muted));
        updateLocalStorage();
    };

    const clearAmount = () => {
        const amount = getState().amount;
        if (amount === 0) {
            throw new Error('冇數要找啵！');
        }
        setState((state) => {
            state.accumulated += state.amount;
            state.amount = 0;
        });
        updateLocalStorage();
    };

    const playSound = () => {
        if (getState().muted) {
            return;
        }
        setTimeout(() => {
            new Audio(require('./Main/asset/audio.mp3')).play();
        }, 0);
    };

    const add = () => {
        const delta = getState().delta;
        setState((state) => {
            state.amount += delta;
        });
        updateLocalStorage();
        playSound();
    };

    const deduct = () => {
        const delta = getState().delta;
        setState((state) => {
            const extra = delta - state.amount;
            if (extra > 0) {
                state.amount = 0;
                state.accumulated = Math.max(0, state.accumulated - extra);
                return;
            }
            state.amount = state.amount - delta;
        });
        updateLocalStorage();
    };

    return {
        onMount,
        clearAmount,
        add,
        playSound,
        toggleMute,
        updateDelta,
        deduct,
    };
};

export const MainComponent = injectLifeCycle(Main, useMainStateAction);
