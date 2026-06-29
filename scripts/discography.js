let discographyTracks = [];

class DiscographyCarousel {
  constructor() {
    this.currentTrackIndex = 0;
    this.tracks = discographyTracks;
    this.audioPlayer = null;
    this.isInitialized = false;

    this.init();
  }

  async init() {
    if (this.isInitialized) return;

    try {
        const res = await fetch('/api/discography');
        discographyTracks = await res.json();
        this.tracks = discographyTracks;
    } catch(e) {
        console.error("Erro carregando discografia", e);
    }

    this.audioPlayer = document.getElementById("audio-player");

    if (!this.audioPlayer) {
      console.error("Player de áudio não encontrado!");
      return;
    }

    this.setupEventListeners();
    this.loadTrack(0);

    this.isInitialized = true;
    console.log("Carrossel de discografia inicializado com", this.tracks.length, "faixas");
  }

  setupEventListeners() {
    // Botões de navegação
    const prevBtn = document.getElementById("prev-track");
    const nextBtn = document.getElementById("next-track");
    const mobilePrevBtn = document.getElementById("mobile-prev");
    const mobileNextBtn = document.getElementById("mobile-next");

    if (prevBtn) prevBtn.addEventListener("click", () => this.previousTrack());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextTrack());
    if (mobilePrevBtn) mobilePrevBtn.addEventListener("click", () => this.previousTrack());
    if (mobileNextBtn) mobileNextBtn.addEventListener("click", () => this.nextTrack());

    // Eventos do player de áudio
    if (this.audioPlayer) {
      this.audioPlayer.addEventListener("ended", () => this.nextTrack());

      this.audioPlayer.addEventListener("error", (e) => {
        console.error("Erro no player de áudio:", e);
        this.showAudioError();
      });

      this.audioPlayer.addEventListener("canplay", () => {
        console.log("Áudio carregado e pronto para reprodução");
      });

      this.audioPlayer.addEventListener("loadstart", () => {
        console.log("Iniciando carregamento do áudio:", this.tracks[this.currentTrackIndex].audioFile);
      });
    }
  }

  loadTrack(index) {
    if (index < 0 || index >= this.tracks.length) return;

    const track = this.tracks[index];
    this.currentTrackIndex = index;

    console.log(`Carregando faixa ${index + 1}: ${track.title}`);
    console.log(`Arquivo: ${track.audioFile}`);

    // Parar áudio atual se estiver tocando
    if (this.audioPlayer && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
    }

    this.updateTrackInfo(track, index);
    this.updateAudioSource(track);
    this.updateIndicators();
    this.animateTrackChange();
  }

  updateTrackInfo(track, index) {
    const titleElement = document.getElementById("current-track-title");
    const artistElement = document.getElementById("current-track-artist");
    const descriptionElement = document.getElementById("current-track-description");
    const trackNumberElement = document.getElementById("current-track-number");

    if (titleElement) {
      titleElement.textContent = track.title;
      titleElement.style.opacity = "0";
      setTimeout(() => {
        titleElement.style.opacity = "1";
      }, 100);
    }

    if (artistElement) {
      artistElement.textContent = track.artist;
    }

    if (descriptionElement) {
      descriptionElement.textContent = track.description;
    }

    if (trackNumberElement) {
      trackNumberElement.textContent = index + 1;
    }
  }

  updateAudioSource(track) {
    if (!this.audioPlayer) return;

    // Limpar eventos antigos
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;

    // Definir nova fonte diretamente no elemento audio
    this.audioPlayer.src = track.audioFile + ".mp3";

    this.audioPlayer.load();
  }

  animateTrackChange() {
    const carousel = document.querySelector(".music-carousel");
    if (carousel) {
      carousel.style.transition = "transform 0.2s ease, opacity 0.2s ease";
      carousel.style.transform = "scale(0.99)";
      carousel.style.opacity = "0.95";

      setTimeout(() => {
        carousel.style.transform = "scale(1)";
        carousel.style.opacity = "1";
      }, 200);
    }
  }

  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack(nextIndex);
  }

  previousTrack() {
    const prevIndex = this.currentTrackIndex === 0 ? this.tracks.length - 1 : this.currentTrackIndex - 1;
    this.loadTrack(prevIndex);
  }

  togglePlayPause() {
    if (!this.audioPlayer) return;

    if (this.audioPlayer.paused) {
      this.audioPlayer.play().catch((e) => {
        console.error("Erro ao reproduzir áudio:", e);
        console.log(`Não foi possível carregar: ${this.tracks[this.currentTrackIndex].audioFile}`);
      });
    } else {
      this.audioPlayer.pause();
    }
  }

  isInViewport() {
    const section = document.querySelector(".discography-section");
    if (!section) return false;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;
  }
}

// Instância global do carrossel
let discographyCarousel;

// Exportar para uso global
window.DiscographyManager = {
  tracks: discographyTracks,
  carousel: () => discographyCarousel,
  init: () => {
    if (!discographyCarousel) {
      discographyCarousel = new DiscographyCarousel();
    }
    return discographyCarousel;
  },
};
