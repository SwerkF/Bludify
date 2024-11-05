import React, { useEffect, useState } from "react";
import {
  BookAIcon,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./components/Card";
import Player from "./components/Player";
import usePlayer from "./store/usePlayer";

let Data = [
  {
    id: 1,
    title: "goofy ahh sounds",
    artist: "Explorers of the Internet",
    cover:
      "https://i1.sndcdn.com/artworks-DnQQeGWStLINfFJS-N6ziTw-t500x500.jpg",
    file: "/audio.mp3",
  },
  {
    id: 2,
    title: "Saddam's Hiding Place Ahh Waveform",
    artist: "Explorers of the Internet",
    cover:
      "https://i1.sndcdn.com/artworks-DnQQeGWStLINfFJS-N6ziTw-t500x500.jpg",
    file: "/audio.mp3",
  },
  {
    id: 3,
    title: "BRAIN ROT 🗿 (SKIBIDI SIGMA RIZZ 💀👨🏼‍🍳😈)",
    artist: "st3kz",
    cover:
      "https://i1.sndcdn.com/artworks-9SlKn6PPQHVADRMm-30EviQ-t500x500.jpg",
    file: "/audio.mp3",
  },
  {
    id: 4,
    title: "goofy ahh sounds",
    artist: "Explorers of the Internet",
    cover:
      "https://i1.sndcdn.com/artworks-DnQQeGWStLINfFJS-N6ziTw-t500x500.jpg",
    file: "/audio.mp3",
  },
  {
    id: 5,
    title: "Saddam's Hiding Place Ahh Waveform",
    artist: "Explorers of the Internet",
    cover:
      "https://i1.sndcdn.com/artworks-DnQQeGWStLINfFJS-N6ziTw-t500x500.jpg",
    file: "/audio.mp3",
  },
  {
    id: 6,
    title: "BRAIN ROT 🗿 (SKIBIDI SIGMA RIZZ 💀👨🏼‍🍳😈)",
    artist: "st3kz",
    cover:
      "https://i1.sndcdn.com/artworks-9SlKn6PPQHVADRMm-30EviQ-t500x500.jpg",
    file: "/audio.mp3",
  },
];

Data = [...Data, ...Data];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hide, setHide] = useState(false);
  const scrollRef = React.useRef(null);
  const [scrolledMax, setScrolledMax] = useState("left");
  const { playSong } = usePlayer();

  const handlePlay = (id) => {
    const song = Data.find((item) => item.id === id);
    playSong(song);
  };

  useEffect(() => {
    checkScroll();
  }, [scrollRef]);

  const handleNext = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + 400,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft - 400,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    scrollRef.current.addEventListener("scroll", () => {
      if (scrollRef.current.scrollLeft === 0) {
        setScrolledMax("left");
      } else if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth ===
        scrollRef.current.scrollWidth
      ) {
        setScrolledMax("right");
      } else {
        setScrolledMax("both");
      }
    });
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center whitespace-nowrap overflow-auto scrollbar-hide">
      <header className="w-full p-4 rounded-lg shadow-lg text-gray-200 flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Bludify</h1>
        <div className="search-bar bg-zinc-900 py-2 w-96 px-4 rounded-full flex flex-row gap-2">
          <Search size={24} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-gray-300 w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="bg-white text-black rounded-full py-2 px-4">
            <p className="font-medium">About Bludify</p>
          </div>
          <div className="bg-zinc-900 text-gray-200 rounded-full py-2 px-4 ml-2">
            <p className="font-medium">Sign In</p>
          </div>
        </div>
      </header>
      <section className="w-full flex-grow grid grid-cols-12 p-2 gap-2 shadow-lg text-gray-200">
        <nav className={`col-span-2 bg-zinc-950 rounded-lg p-6`}>
          <p>Nav</p>
        </nav>
        <AnimatePresence>
          <div className={`col-span-10 flex ${isPlaying ? "gap-2" : ""}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, width: !isPlaying ? 400 : 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="flex flex-col gap-4 bg-zinc-950 rounded-lg h-full max-w-full flex-grow p-6"
            >
              <h1 className="text-3xl px-3 font-semibold">
                Découvrez les nouveautés
              </h1>
              <div className="relative flex overflow-hidden gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: scrolledMax === "left" ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute left-0 z-40 w-16 transition transition-all bg-gradient-to-r to-transparent from-zinc-950 h-full`}
                >
                  <div className="flex flex-col justify-center items-center h-full">
                    <button
                      onClick={handlePrev}
                      className="text-gray-300 hover:text-gray-200 bg-zinc-900 rounded-full p-3"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  </div>
                </motion.div>
                <div
                  className="max-w-full flex gap-2 overflow-x-auto scrollbar-hide"
                  ref={scrollRef}
                >
                  {Data.map((item, index) => (
                    <Card
                      key={index}
                      id={item.id}
                      title={item.title}
                      artist={item.artist}
                      cover={item.cover}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: scrolledMax === "right" ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute right-0 z-40 w-16 transition transition-all bg-gradient-to-l to-transparent from-zinc-950 h-full`}
                >
                  <div className="flex flex-col justify-center items-center h-full">
                    <button
                      onClick={handleNext}
                      className="text-gray-300 hover:text-gray-200 bg-zinc-900 rounded-full p-3"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            {hide && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: 1,
                  width: isPlaying ? 400 : 0,
                  x: isPlaying ? 0 : 200,
                }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, width: 0, x: isPlaying ? 0 : -600 }}
                className={`flex flex-col items-center gap-4 bg-zinc-950 rounded-lg h-full ${
                  isPlaying ? "" : ""
                } `}
              >
                <div className="flex flex-row gap-4 p-6">
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeout(() => {
                        setHide(false);
                      }, 500);
                    }}
                    className="text-gray-300 hover:text-gray-200 bg-zinc-900 rounded-full p-3"
                  >
                    <X size={24} />
                  </button>
                  <h1 className="text-3xl font-semibold">Now Playing</h1>
                </div>
                <Card />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </section>
      <header className="w-full p-4 rounded-lg shadow-lg text-gray-200">
        <Player />
      </header>
    </main>
  );
}

export default App;
