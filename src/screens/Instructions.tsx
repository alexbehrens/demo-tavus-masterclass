import { createConversation } from "@/api";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Video, Phone } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationError } from "./ConversationError";
import { apiTokenAtom } from "@/store/tokens";
import { hatch } from 'ldrs';
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ConversationLoading } from "./ConversationLoading";

// Register the hatch loader
hatch.register();

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const token = useAtomValue(apiTokenAtom);

  const createConversationRequest = async () => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      const conversation = await createConversation(token);
      setConversation(conversation);
      setScreenState({ currentScreen: "conversation" });
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

const questions = [
  { 
    question: "How to make my AI avatar more engaging?", 
    expert: "Sarah Walker PhD" 
  },
  { 
    question: "Best practices for AI video scripts", 
    expert: "Sarah Walker PhD" 
  },
  { 
    question: "Integrating AI videos into my website", 
    expert: "Sarah Walker PhD" 
  },
  { 
    question: "Making AI responses more natural", 
    expert: "Sarah Walker PhD" 
  },
  { 
    question: "Choosing the right AI voice", 
    expert: "Sarah Walker PhD" 
  },
  { 
    question: "AI avatar body language tips", 
    expert: "Sarah Walker PhD" 
  }
];

export const Instructions: React.FC = () => {
  const daily = useDaily();
  const { currentMic } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [error, setError] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setError(true);
    }, []),
  );

  const startConversation = async () => {
    try {
      setIsCreatingConversation(true);
      
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        micDeviceId = res?.mic?.deviceId;

        if (!micDeviceId) {
          setError(true);
          return;
        }
      }

      await createConversationRequest();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsCreatingConversation(false);
    }
  };

  if (isCreatingConversation) {
    return <ConversationLoading />;
  }

  if (error) {
    return <ConversationError onClick={startConversation} />;
  }

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

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-12">
        <h1 className="mb-6 -mt-8 text-3xl font-bold text-white text-center">
          START AN <span className="bg-white text-black px-4 py-1 rounded-full">AI ✧</span> CALL
        </h1>

        <div className="flex gap-8 mb-12">
          <motion.button 
            onClick={startConversation}
            className="text-center hover:opacity-90 transition-opacity"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative mb-2">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-[#4A90E2]">
                <img 
                  src="/images/head.png" 
                  alt="Sarah Walker PhD"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#8B5CF6] rounded-full p-2">
                <Video className="h-5 w-5 text-white" />
              </div>
            </div>
            <h3 className="text-white font-medium">Sarah Walker PhD</h3>
            <p className="text-gray-400 text-sm">AI Expert</p>
          </motion.button>

          <button 
            onClick={startConversation}
            className="text-center hover:opacity-90 transition-opacity"
          >
            <div className="relative mb-2">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-[#E77FB3]">
                {/* Expert image would go here */}
                <img src="/images/chris.jpg" alt="Chris Voss" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#27AE60] rounded-full p-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
            </div>
            <h3 className="text-white font-medium">Chris Voss</h3>
            <p className="text-gray-400 text-sm">Communication Expert</p>
          </button>
        </div>

        <div className="w-full max-w-3xl">
          <h2 className="text-white text-xl mb-4">Ask me anything</h2>
          <div className="grid grid-cols-2 gap-4">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={startConversation}
                className="flex items-center justify-between bg-[#1A1A1A] text-white p-4 rounded-2xl hover:bg-[#252525] text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-left text-sm">{q.question}</p>
                  <p className="text-sm text-gray-400">{q.expert}</p>
                </div>
                <Video className="h-5 w-5 ml-3 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PositiveFeedback: React.FC = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative z-10 flex flex-col items-center text-center">
        <img src="/images/positive.png" alt="Positive Feedback" className="mb-6 w-32" />
        <h2 className="mb-4 text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(91deg,_#43BF8F_16.63%,_#FFF_86.96%)]">
          Great Conversation!
        </h2>
        <p className="text-gray-400">
          Thanks for the engaging discussion. Feel free to come back anytime for another chat!
        </p>
      </div>
    </div>
  );
};
