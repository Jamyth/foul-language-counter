/// <reference types="react" />
interface State {
    accumulated: number;
    amount: number;
    delta: number;
    muted: boolean;
}
export declare const useMainState: <T>(fn: (state: State) => T) => T;
export declare const useMainStateAction: () => {
    onMount: () => void;
    clearAmount: () => void;
    add: () => void;
    playSound: () => void;
    toggleMute: () => void;
    updateDelta: (delta: number) => void;
};
export declare const MainComponent: import("react").MemoExoticComponent<() => JSX.Element | null>;
export {};
//# sourceMappingURL=index.d.ts.map