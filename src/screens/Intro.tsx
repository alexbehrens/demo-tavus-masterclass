import React from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { apiTokenAtom } from "@/store/tokens";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { LockOpen } from "lucide-react";

export const Intro: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [token, setToken] = useAtom(apiTokenAtom);

  const handleClick = () => {
    setScreenState({ currentScreen: "instructions" });
  };

  return (
    <div className="flex size-full">
      {/* Dark background with image */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <img 
          src="/images/back.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Add dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="absolute top-3 left-3 right-3 z-20">
        <Header />
      </div>
      
      <div className="relative z-10 flex w-full items-center justify-center px-12">
        {/* Left side with image */}
        <div className="w-[35%]">
          <img 
            src="/images/master.webp" 
            alt="Demo Preview" 
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Right side with content */}
        <div className="w-[40%] pl-16">
          <h1 className="mb-4 text-5xl font-bold text-white leading-[1.1]">
            Expert advice when<br />you need it most.
          </h1>
          
          <p className="mb-8 text-lg font-medium text-white/80">
            Wisdom from the world's best, powered by AI
          </p>

          <div className="space-y-4">
            <Input
              type="text"
              value={token || ""}
              onChange={(e) => {
                const newToken = e.target.value;
                setToken(newToken);
                localStorage.setItem('tavus-token', newToken);
              }}
              placeholder="Enter Tavus API key"
              className="w-[60%] bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl 
                border-white/10 px-4 py-3 text-base placeholder:text-white/40
                focus:border-[#E22761] focus:ring-1 focus:ring-[#E22761] focus:outline-none 
                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                transition-colors duration-200"
            />

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleClick}
                disabled={!token}
                className="w-fit bg-[#E22761] hover:bg-[#C71E52] text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                <LockOpen className="h-5 w-5 stroke-[3]" />
                Sign Up
              </Button>

              <p className="text-sm text-white/60">
                Don't have a key?{" "}
                <a
                  href="https://platform.tavus.io/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#E22761] underline transition-colors duration-200"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
