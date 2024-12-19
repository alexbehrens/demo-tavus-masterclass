import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import * as React from "react";
import { Header } from "@/components/Header";
import { LaptopIcon } from "lucide-react";

export const NiceForm: React.FC = () => {
  return (
    <div className="flex size-full">
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <img 
          src="/images/back.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="absolute top-3 left-3 right-3 z-20">
        <Header />
      </div>

      <div className="relative z-10 flex size-full items-center justify-center -mt-[25px]">
        <DialogWrapper>
          <AnimatedTextBlockWrapper>
            <div className="relative w-full max-w-2xl">
              <div className="flex flex-col items-center justify-center text-center p-8">
                <LaptopIcon 
                  className="mb-4 size-12 text-white"
                />
                <h2 className="text-2xl font-bold sm:max-w-full bg-[linear-gradient(91deg,_#FFF_16.63%,_#FF8B8B_86.96%)] bg-clip-text text-transparent">
                  Great Conversation!
                </h2>
                <p className="mt-2 text-white">
                  Thanks for the engaging discussion. Feel free to come back anytime for another chat!
                </p>
              </div>
            </div>
          </AnimatedTextBlockWrapper>
        </DialogWrapper>
      </div>
    </div>
  );
};
