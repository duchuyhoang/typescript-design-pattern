interface Music {
  name: string;
  id: string;
  url: string;
  duration: number;
}

interface MusicConfigs {
  startTime: string;
}

class FrontendMusicPlayer {
  public static instance: FrontendMusicPlayer;
  private playingMusic!: Maybe<Music>;
  private audioDomInstance!: HTMLAudioElement;
  constructor() {
    if (FrontendMusicPlayer.instance) {
      return FrontendMusicPlayer.instance;
    }
    FrontendMusicPlayer.instance = this;
    this.playingMusic = null;
    // Remove this line for html
    this.audioDomInstance = document.createElement("audio");
  }

  public chooseMusic(music: Music) {
    this.playingMusic = music;
    this.audioDomInstance.setAttribute("src", music.url);
  }

  public getDomInstance() {
    return this.audioDomInstance;
  }
}
