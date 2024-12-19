import { GitFork, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 group">
      <div className="absolute bottom-0 left-0 right-0 h-24" />
      
      <footer className="flex w-full items-center justify-between gap-4 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-0 group-hover:delay-[1000ms]">
        <a
          href="https://github.com/Tavus-Engineering/tavus-examples"
          target="_blank"
          className="hover:shadow-footer-btn relative flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-2 py-3 text-sm text-white transition-all duration-200 hover:text-primary sm:p-4 h-[44px]"
        >
          <GitFork className="size-4" /> Fork the demo
        </a>

        <a href="https://tavus.io" target="_blank">
          <img 
            src="/images/logo.svg" 
            alt="Logo" 
            className="h-6"
          />
        </a>

        <a
          href="https://docs.tavus.io/sections/conversational-video-interface/cvi-overview"
          target="_blank"
          className="relative flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-2 py-3 text-sm text-white backdrop-blur-sm hover:bg-[rgba(255,255,255,0.15)] transition-colors duration-200 sm:p-4 h-[44px]"
        >
          How it works <ExternalLink className="size-4" />
        </a>
      </footer>
    </div>
  );
};
