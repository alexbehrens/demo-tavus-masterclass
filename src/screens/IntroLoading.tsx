import React, { useEffect, useState } from "react";
import { healthCheckApi } from "@/api";
import { screenAtom } from "@/store/screens";
import { useAtom } from "jotai";
import { hatch } from 'ldrs';

const screens = {
  error: "intro",
  success: "intro",
  outOfTime: "seasonEnded",
  settings: "settings"
} as const;

const useHealthCheck = () => {
  const [screenState, setScreenState] = useState<keyof typeof screens | null>(
    null,
  );

  const healthCheck = async (): Promise<void> => {
    try {
      const response = await healthCheckApi();
      if (response?.status) {
        setScreenState("success");
      } else {
        setScreenState("error");
      }
    } catch (error) {
      setScreenState("error");
    }
  };

  useEffect(() => {
    healthCheck();
  }, []);

  return { screenState };
};

hatch.register();

export const IntroLoading: React.FC = () => {
  const { screenState } = useHealthCheck();
  const [, setScreenState] = useAtom(screenAtom);

  useEffect(() => {
    if (screenState !== null) {
      const timer = setTimeout(() => {
        setScreenState({ currentScreen: screens[screenState] });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [screenState]);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <img 
          src="/images/back.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 flex size-full items-center justify-center">
        <l-hatch
          size="28"
          stroke="4"
          speed="3.5"
          color="white"
        ></l-hatch>
      </div>
    </div>
  );
};
