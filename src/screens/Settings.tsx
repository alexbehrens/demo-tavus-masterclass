import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { cn } from "@/utils";
import { useAtom } from "jotai";
import { getDefaultStore } from "jotai";
import { settingsAtom, settingsSavedAtom } from "@/store/settings";
import { screenAtom } from "@/store/screens";
import { X } from "lucide-react";
import * as React from "react";
import { apiTokenAtom } from "@/store/tokens";
import { Header } from "@/components/Header";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "ghost" | "outline";
    size?: "icon";
  }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        {
          "border border-input bg-transparent hover:bg-accent": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "size-10": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-[#404040] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32652] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Textarea Component
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-[#404040] bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32652] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Switch Component
const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      role="switch"
      className={cn(
        "peer h-6 w-11 rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Switch.displayName = "Switch";

// Label Component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

// Select Component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-lg border border-[#404040] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32652] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

// Add this component near the top with other component definitions
const ActiveIndicator = () => (
  <div className="size-2 rounded-full bg-green-500 inline-block ml-2" />
);

// Add a new InactiveIndicator component
const InactiveIndicator = () => (
  <div className="size-2 rounded-full bg-red-500 inline-block ml-2" />
);

export const Settings: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const [token, setToken] = useAtom(apiTokenAtom);
  const [, setSettingsSaved] = useAtom(settingsSavedAtom);

  const languages = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Italian", value: "italian" },
    { label: "Portuguese", value: "portuguese" },
  ];

  const interruptSensitivities = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handleClose = () => {
    setScreenState({ 
      currentScreen: token ? "instructions" : "intro" 
    });
  };

  const handleSave = async () => {
    console.log('Current settings before save:', settings);
    
    // Create a new settings object to ensure we have a fresh reference
    const updatedSettings = {
      ...settings,
      greeting: settings.greeting,  // explicitly set the greeting
    };
    
    // Save to localStorage
    localStorage.setItem('tavus-settings', JSON.stringify(updatedSettings));
    
    // Update the store with the new settings object
    const store = getDefaultStore();
    store.set(settingsAtom, updatedSettings);
    
    // Wait a moment to ensure the store is updated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check both localStorage and store
    const storedSettings = localStorage.getItem('tavus-settings');
    const storeSettings = store.get(settingsAtom);
    
    console.log('Settings in localStorage:', JSON.parse(storedSettings || '{}'));
    console.log('Settings in store after save:', storeSettings);
    
    setSettingsSaved(true);
    handleClose();
  };

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
            <div className="relative w-full max-w-2xl flex flex-col h-full">
              <div className="sticky top-0 pt-8 pb-6 z-10 bg-background/30 backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="absolute right-0 top-8 size-10 sm:size-14 border-0 bg-transparent hover:bg-zinc-800 rounded-full"
                >
                  <X className="size-4 sm:size-6" />
                </Button>
                
                <h2 className="text-2xl font-bold text-white">Conversation Settings</h2>
              </div>
              
              <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                <div className="h-5" />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name <ActiveIndicator /></Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      placeholder="Enter your name"
                      className="bg-black/20 font-mono"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language <InactiveIndicator /></Label>
                    <Select
                      id="language"
                      value={settings.language}
                      disabled
                      className="bg-black/20 font-mono opacity-50 cursor-not-allowed"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    >
                      {languages.map((lang) => (
                        <option 
                          key={lang.value} 
                          value={lang.value}
                          className="bg-black text-white font-mono"
                          style={{ fontFamily: "'Source Code Pro', monospace" }}
                        >
                          {lang.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interruptSensitivity">Interrupt Sensitivity <InactiveIndicator /></Label>
                    <Select
                      id="interruptSensitivity"
                      value={settings.interruptSensitivity}
                      disabled
                      className="bg-black/20 font-mono opacity-50 cursor-not-allowed"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    >
                      {interruptSensitivities.map((sensitivity) => (
                        <option 
                          key={sensitivity.value} 
                          value={sensitivity.value}
                          className="bg-black text-white font-mono"
                          style={{ fontFamily: "'Source Code Pro', monospace" }}
                        >
                          {sensitivity.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="greeting">Custom Greeting <ActiveIndicator /></Label>
                    <Input
                      id="greeting"
                      value={settings.greeting}
                      onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                      placeholder="Enter custom greeting"
                      className="bg-black/20 font-mono"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="context">Custom Context <ActiveIndicator /></Label>
                    <Textarea
                      id="context"
                      value={settings.context}
                      onChange={(e) => setSettings({ ...settings, context: e.target.value })}
                      placeholder="Paste or type custom context"
                      className="min-h-[100px] bg-black/20 font-mono"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="persona">Set Custom Persona ID <ActiveIndicator /></Label>
                    <Input
                      id="persona"
                      value={settings.persona}
                      onChange={(e) => setSettings({ ...settings, persona: e.target.value })}
                      placeholder="p2fbd605"
                      className="bg-black/20 font-mono"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="replica">Set Custom Replica ID <InactiveIndicator /></Label>
                    <Input
                      id="replica"
                      value={settings.replica}
                      disabled
                      className="bg-black/20 font-mono opacity-50 cursor-not-allowed"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between opacity-50">
                      <Label htmlFor="enableRecording">Enable Recording <InactiveIndicator /></Label>
                      <Switch
                        id="enableRecording"
                        checked={settings.enableRecording}
                        disabled
                      />
                    </div>

                    <div className="flex items-center justify-between opacity-50">
                      <Label htmlFor="enableTranscription">Enable Transcription <InactiveIndicator /></Label>
                      <Switch
                        id="enableTranscription"
                        checked={settings.enableTranscription}
                        disabled
                      />
                    </div>

                    <div className="flex items-center justify-between opacity-50">
                      <Label htmlFor="applyGreenscreen">Apply Greenscreen <InactiveIndicator /></Label>
                      <Switch
                        id="applyGreenscreen"
                        checked={settings.applyGreenscreen}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiToken">API Token <ActiveIndicator /></Label>
                    <Input
                      id="apiToken"
                      value={token || ""}
                      onChange={(e) => {
                        const newToken = e.target.value;
                        setToken(newToken);
                        localStorage.setItem('tavus-token', newToken);
                      }}
                      placeholder="Enter Tavus API Key"
                      className="bg-black/20 font-mono"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    />
                  </div>
                </div>

                <div className="h-5" />
              </div>

              <div className="flex-shrink-0 border-t border-gray-700 pt-6 pb-8">
                <button
                  onClick={handleSave}
                  className="hover:shadow-[0_0_30px_rgba(227,38,82,0.5)] relative flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:text-[#E32652]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </AnimatedTextBlockWrapper>
        </DialogWrapper>
      </div>
    </div>
  );
}; 