import { create } from "zustand";

interface Song {
  id: string;
  file: string;
  [key: string]: any;
}

interface PlayerState {
  playing: boolean;
  soundVolume: number;
  currentSong: any;
  songs: Song[];
  progress: number;
  shuffle: boolean;
  repeat: boolean;
  onShuffle: () => void;
  onRepeat: () => void;
  setPlaying: (playing: boolean) => void;
  setCurrentSong: (currentSong: Song) => void;
  setSongs: (songs: Song[]) => void;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  setSoundVolume: (soundVolume: number) => void;
  setProgress: (progress: number) => void;
}

const usePlayer = create<PlayerState>((set, get) => ({
  playing: false,
  setPlaying: (playing: boolean) => set({ playing }),
  currentSong: null,
  setCurrentSong: (currentSong: Song) => set({ currentSong }),
  songs: [],
  setSongs: (songs: Song[]) => set({ songs }),
  playSong: (song: Song) => {
    if (get().currentSong) {
      get().currentSong.pause();
      get().currentSong.currentTime = 0;
    }
    let audio = new Audio(song.file);
    set({ currentSong: audio, playing: true });
    let currSong = get().currentSong;
    currSong.play();
    currSong.volume = get().soundVolume;
    currSong.addEventListener("timeupdate", () => {
      set({ progress: (currSong.currentTime / currSong.duration) * 100 * 2 });
    });

    currSong.addEventListener("ended", () => {
      if (get().repeat) {
        currSong.currentTime = 0;
        currSong.play();
      } else {
        get().playNextSong();
      }
    });

    currSong.addEventListener("error", () => {
      get().playNextSong();
    });
  },
  pauseSong: () => {
    set({ playing: false });
  },
  playNextSong: () => {
    const currentSongIndex = get().songs.findIndex(
      (song) => song.id === get().currentSong?.id
    );
    const nextSongIndex = (currentSongIndex + 1) % get().songs.length;
    get().playSong(get().songs[nextSongIndex]);
  },
  playPreviousSong: () => {
    const currentSongIndex = get().songs.findIndex(
      (song) => song.id === get().currentSong?.id
    );
    const previousSongIndex =
      (currentSongIndex - 1 + get().songs.length) % get().songs.length;
    get().playSong(get().songs[previousSongIndex]);
  },
  soundVolume: 0.5,
  setSoundVolume: (soundVolume: number) => {
    set({ soundVolume });
    if (get().currentSong) {
      get().currentSong.volume = soundVolume;
    }

    localStorage.setItem("soundVolume", soundVolume.toString());
  },
  progress: 0,
  setProgress: (progress: number) => set({ progress }),
  shuffle: false,
  repeat: false,
  onShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  onRepeat: () => set((state) => ({ repeat: !state.repeat })),
}));

export default usePlayer;
