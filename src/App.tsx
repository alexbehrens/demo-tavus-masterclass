import { useAtom } from "jotai";
import { screenAtom } from "./store/screens";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  IntroLoading,
  Outage,
  OutOfMinutes,
  Intro,
  Instructions,
  Conversation,
  NiceForm,
  FinalScreen,
  SeasonEnded,
  NaughtyForm,
  Settings,
} from "./screens";
import BackgroundAudio from "./components/BackgroundAudio";

function App() {
  const [{ currentScreen }] = useAtom(screenAtom);

  const renderScreen = () => {
    switch (currentScreen) {
      case "introLoading":
        return <IntroLoading />;
      case "outage":
        return <Outage />;
      case "outOfMinutes":
        return <OutOfMinutes />;
      case "intro":
        return <Intro />;
      case "settings":
        return <Settings />;
      case "instructions":
        return <Instructions />;
      case "conversation":
        return <Conversation />;
      case "niceForm":
        return <NiceForm />;
      case "naughtyForm":
        return <NaughtyForm />;
      case "finalScreen":
        return <FinalScreen />;
      case "seasonEnded":
        return <SeasonEnded />;
      default:
        return <IntroLoading />;
    }
  };

  return (
    <main className="flex h-svh flex-col items-center justify-between gap-3 p-5 sm:gap-4 lg:p-8 bg-black">
      <Header />
      {renderScreen()}
      {currentScreen !== "introLoading" && <Footer />}
      <BackgroundAudio />
    </main>
  );
}

export default App;
