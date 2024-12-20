import { atom } from "jotai";

interface Settings {
  name: string;
  language: string;
  interruptSensitivity: string;
  greeting: string;
  context: string;
  persona: string;
  replica: string;
  enableRecording?: boolean;
  enableTranscription?: boolean;
  applyGreenscreen?: boolean;
  maxCallDuration?: number;
  participantLeftTimeout?: number;
}

const getInitialSettings = (): Settings => {
  const savedSettings = localStorage.getItem('tavus-settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    name: "",
    language: "english",
    interruptSensitivity: "medium",
    greeting: "",
    context: "",
    persona: "",
    replica: "",
    enableRecording: false,
    enableTranscription: false,
    applyGreenscreen: false,
    maxCallDuration: 3600,
    participantLeftTimeout: 60,
  };
};

export const settingsAtom = atom<Settings>(getInitialSettings());

export const settingsSavedAtom = atom<boolean>(false); 