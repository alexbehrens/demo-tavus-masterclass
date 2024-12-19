import { DialogWrapper } from "@/components/DialogWrapper";
import {
  DailyAudio,
  useDaily,
  useLocalSessionId,
  useParticipantIds,
  useAudioTrack,
} from "@daily-co/daily-react";
import React, { useCallback, useEffect, useState } from "react";
import Video from "@/components/Video";
import { conversationAtom } from "@/store/conversation";
import { useAtom, useAtomValue } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { endConversation } from "@/api/endConversation";
import {
  MicIcon,
  MicOffIcon,
  PhoneIcon,
} from "lucide-react";
import {
  clearSessionTime,
  getSessionTime,
  setSessionStartTime,
  updateSessionEndTime,
} from "@/utils";
import { Timer } from "@/components/Timer";
import { TIME_LIMIT } from "@/config";
import { niceScoreAtom } from "@/store/game";
import { naughtyScoreAtom } from "@/store/game";
import { apiTokenAtom } from "@/store/tokens";
import { hatch } from 'ldrs';
import { motion } from "framer-motion";
import { AnimatedTextBlockWrapper } from "@/components/DialogWrapper";
import { Header } from "@/components/Header";

// Register the hatch loader
hatch.register();

const timeToGoPhrases = [
  "I'll need to dash off soon—there’s still so much to prepare for Christmas! But let’s make these last moments count.",
  "The elves are calling me back to the workshop soon, but I've got a little more time for you!",
  "I'll be heading out soon—the reindeer are getting restless—but I'd love to hear one more thing before I go!",
];

const outroPhrases = [
  "It's time for me to go now—Christmas magic doesn't make itself! Take care, and I'll see you soon!",
  "I've got to get back to the North Pole—the workshop needs me! Be good, and Merry Christmas until we meet again!",
  "I must say goodbye for now—the magic of Christmas calls! Stay on the nice list, and I'll see you soon!",
];

export const Conversation: React.FC = () => {
  const [conversation, setConversation] = useAtom(conversationAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const [naughtyScore] = useAtom(naughtyScoreAtom);
  const [niceScore] = useAtom(niceScoreAtom);
  const token = useAtomValue(apiTokenAtom);

  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const localAudio = useAudioTrack(localSessionId);
  const isMicEnabled = !localAudio.isOff;
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (remoteParticipantIds.length && !start) {
      setStart(true);
      setTimeout(() => daily?.setLocalAudio(true), 4000);
    }
  }, [remoteParticipantIds, start]);

  useEffect(() => {
    if (!remoteParticipantIds.length || !start) return;

    setSessionStartTime();
    const interval = setInterval(() => {
      const time = getSessionTime();
      if (time === TIME_LIMIT - 60) {
        daily?.sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.echo",
          conversation_id: conversation?.conversation_id,
          properties: {
            modality: "text",
            text:
              timeToGoPhrases[Math.floor(Math.random() * 3)] ??
              timeToGoPhrases[0],
          },
        });
      }
      if (time === TIME_LIMIT - 10) {
        daily?.sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.echo",
          conversation_id: conversation?.conversation_id,
          properties: {
            modality: "text",
            text:
              outroPhrases[Math.floor(Math.random() * 3)] ?? outroPhrases[0],
          },
        });
      }
      if (time >= TIME_LIMIT) {
        leaveConversation();
        clearInterval(interval);
      } else {
        updateSessionEndTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [remoteParticipantIds, start]);

  useEffect(() => {
    if (conversation?.conversation_url) {
      daily
        ?.join({
          url: conversation.conversation_url,
          startVideoOff: false,
          startAudioOff: true,
        })
        .then(() => {
          daily?.setLocalAudio(false);
        });
    }
  }, [conversation?.conversation_url]);

  const leaveConversation = useCallback(() => {
    daily?.leave();
    daily?.destroy();
    if (conversation?.conversation_id && token) {
      endConversation(token, conversation.conversation_id);
    }
    setConversation(null);
    clearSessionTime();

    const naughtyScorePositive = Math.abs(naughtyScore);
    if (naughtyScorePositive > niceScore) {
      setScreenState({ currentScreen: "naughtyForm" });
    } else {
      setScreenState({ currentScreen: "niceForm" });
    }
  }, [daily, token]);

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
            <motion.div 
              className="absolute inset-0 size-full overflow-hidden rounded-lg border border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {remoteParticipantIds?.length > 0 ? (
                <>
                  <Timer />
                  <Video
                    id={remoteParticipantIds[0]}
                    className="size-full"
                    tileClassName="!object-cover"
                  />
                </>
              ) : (
                <div className="relative flex h-full items-center justify-center">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/src/assets/video/gloria.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
                  <div className="relative z-10">
                    <l-hatch
                      size="28"
                      stroke="4"
                      speed="3.5"
                      color="white"
                    ></l-hatch>
                  </div>
                </div>
              )}
              
              {localSessionId && (
                <Video
                  id={localSessionId}
                  tileClassName="!object-cover"
                  className="absolute bottom-24 right-4 aspect-video h-32 w-48 overflow-hidden rounded-lg border border-white/20 shadow-lg"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <img 
                    src="/images/headshot.png" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">Sarah Walker PhD</span>
                    <span className="text-white/60 text-xs">AI Whisperer</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => daily?.setLocalAudio(!isMicEnabled)}
                    className="hover:bg-white/10"
                  >
                    {isMicEnabled ? (
                      <MicIcon className="h-5 w-5 text-white" />
                    ) : (
                      <MicOffIcon className="h-5 w-5 text-white/60" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={leaveConversation}
                    className="bg-red-500/80 hover:bg-red-500 rounded-full h-10 w-10 flex items-center justify-center"
                  >
                    <PhoneIcon className="h-5 w-5 text-white rotate-[135deg]" />
                  </Button>
                </div>
              </div>
              
              <DailyAudio />
            </motion.div>
          </AnimatedTextBlockWrapper>
        </DialogWrapper>
      </div>
    </div>
  );
};
