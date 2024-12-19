import { atom } from "jotai";

export type Screen = 
  | "introLoading"
  | "outage"
  | "outOfMinutes"
  | "intro" 
  | "instructions" 
  | "conversation" 
  | "niceForm" 
  | "naughtyForm" 
  | "finalScreen"
  | "seasonEnded"
  | "settings";

export interface ScreenState {
  currentScreen: Screen;
}

export const screenAtom = atom<ScreenState>({
  currentScreen: "intro",
});
