import React, { useState } from "react";
import {
  Play,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import usePlayer from "../store/usePlayer";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const {
    playing,
    setPlaying,
    currentSong,
    setCurrentSong,
    songs,
    setSongs,
    playSong,
    pauseSong,
    playNextSong,
    playPreviousSong,
    soundVolume,
    setSoundVolume,
    progress,
    setProgress,
    shuffle,
    onShuffle,
    repeat,
    onRepeat,
  } = usePlayer();

  const changeSoundVolume = (volume: number) => {
    setSoundVolume(volume);
  };

  return (
    <div className="w-full h-14 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={currentSong?.cover} alt="cover" className="w-12 h-12" />
        <div className="flex flex-col">
          <span className="text-white font-bold">{currentSong?.name}</span>
          <span className="text-gray-400">{currentSong?.artist}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="center-menu flex items-center justify-center gap-6">
          <button className="transition transition-all" onClick={onShuffle}>
            <Shuffle
              size={20}
              className={`${
                shuffle
                  ? "text-purple-400 hover:text-purple-500"
                  : "text-white hover:text-gray-200"
              } transition transition-all`}
            />
          </button>
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={playPreviousSong}
          >
            <SkipBack size={20} fill="white" />
          </button>
          <button className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full text-black flex items-center cursor-pointer justify-center hover:scale-105 transition transition-all">
            <Play size={22} className="ml-0.5" fill="black" />
          </button>
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={playNextSong}
          >
            <SkipForward size={20} fill="white" />
          </button>
          <button className="transition transition-all" onClick={onRepeat}>
            <Repeat
              size={20}
              className={`${
                repeat
                  ? "text-purple-400 hover:text-purple-500"
                  : "text-white hover:text-gray-200"
              } transition transition-all`}
            />
          </button>
        </div>
        <div className="flex items-center text-xs min-w-[600px] max-w-[600px] gap-3">
          <span>
            {currentSong ? (
              <>
                {Math.floor(progress / 60)}:
                {("0" + Math.floor(progress % 60)).slice(-2)}
              </>
            ) : (
              "0:00"
            )}
          </span>
          <ProgressBar
            progress={progress}
            setProgress={setProgress}
            min={0}
            max={1}
          />
          <span>
            {currentSong ? (
              <>
                {Math.floor(currentSong?.duration / 60)}:
                {("0" + Math.floor(currentSong?.duration % 60)).slice(-2)}
              </>
            ) : (
              "0:00"
            )}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 min-w-[140px] max-w-[140px]">
        {soundVolume === 0 ? (
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={() => setSoundVolume(50)}
          >
            <VolumeX size={20} />
          </button>
        ) : soundVolume < 30 ? (
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={() => setSoundVolume(0)}
          >
            <Volume size={20} />
          </button>
        ) : soundVolume > 30 && soundVolume <= 70 ? (
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={() => setSoundVolume(0)}
          >
            <Volume1 size={20} />
          </button>
        ) : (
          <button
            className="text-white hover:text-gray-200 transition transition-all"
            onClick={() => setSoundVolume(0)}
          >
            <Volume2 size={20} />
          </button>
        )}
        <ProgressBar
          progress={soundVolume}
          setProgress={changeSoundVolume}
          min={0}
          max={1}
        />
      </div>
    </div>
  );
};

export default Player;
