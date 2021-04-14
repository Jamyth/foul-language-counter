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

const audio = new Audio(require('./Main/asset/audio.mp3'));

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
            return;
        }
        setState((state) => (state.delta = delta));
        updateLocalStorage();
    };

    const toggleMute = () => {
        setState((state) => (state.muted = !state.muted));
        updateLocalStorage();
    };

    const clearAmount = () => {
        setState((state) => (state.amount = 0));
        updateLocalStorage();
    };

    const playSound = () => {
        if (getState().muted) {
            return;
        }
        audio.play();
    };

    const add = () => {
        const delta = getState().delta;
        setState((state) => {
            state.amount += delta;
            state.accumulated += delta;
        });
        updateLocalStorage();
        playSound();
    };

    return {
        onMount,
        clearAmount,
        add,
        playSound,
        toggleMute,
        updateDelta,
    };
};

export const MainComponent = injectLifeCycle(Main, useMainStateAction);
