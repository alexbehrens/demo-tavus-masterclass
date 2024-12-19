import React from "react";
import { hatch } from 'ldrs';
import { Header } from "@/components/Header";

// Register the hatch loader
hatch.register();

export const ConversationLoading: React.FC = () => {
  return (
    <div className="flex size-full">
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <img 
          src="/images/back.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="absolute top-3 left-3 right-3 z-20">
        <Header />
      </div>

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
