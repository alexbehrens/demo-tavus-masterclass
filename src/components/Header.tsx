import { memo } from "react";
import { Button } from "./ui/button";
import { Settings, Check } from "lucide-react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import { settingsSavedAtom } from "@/store/settings";
import { apiTokenAtom } from "@/store/tokens";

export const Header = memo(() => {
  const [screenState, setScreenState] = useAtom(screenAtom);
  const [conversation] = useAtom(conversationAtom);
  const [settingsSaved] = useAtom(settingsSavedAtom);
  const [token] = useAtom(apiTokenAtom);

  const handleSettings = () => {
    if (screenState.currentScreen === "settings") {
      setScreenState({ 
        currentScreen: token ? "instructions" : "intro" 
      });
    }
    else if (!conversation) {
      setScreenState({ currentScreen: "settings" });
    }
  };

  return (
    <header className="flex w-full items-start justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center gap-1.5">
        <span className="text-white text-sm font-medium">ON_CALL</span>
        <span className="text-[10px] text-white/60 px-1 py-0.5 rounded border border-white/20">VIDEO ALPHA</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img src="/images/masterlogo.png" alt="Master Logo" className="h-8 w-auto" />
      </div>
      <div className="relative">
        {settingsSaved && (
          <div className="absolute -top-2 -right-2 z-20 rounded-full bg-green-500 p-1 animate-fade-in">
            <Check className="size-3" />
          </div>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={handleSettings}
          className="relative size-10 sm:size-14 border-0 bg-transparent hover:bg-zinc-800"
        >
          <Settings className="size-4 sm:size-6" />
        </Button>
      </div>
    </header>
  );
});
