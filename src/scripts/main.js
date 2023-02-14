import "../scss/main.scss";
import "what-input";
import Swiper, { A11y, Navigation, Pagination } from "swiper";
import carouselUtils from "./utils/carouselUtils";
import Finfilter from "./components/finfilter";

class Setup {
  constructor() {
    this.songbookUrl = "./songs/";
    this.promises = [];
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.log = "Start finoz/annaemich";
  }

  listenForComponents() {
    const compDispatcher = new ComponentDispatcher();
    compDispatcher.createAsyncComponents().then(() => {
      compDispatcher.observeDomChanges();
    });
  }

  init() {
    if (document.body.dataset.page === "canti") {
      this.setSongbook();
      let finfilter = new Finfilter();
      finfilter.init();
    } else {
      this.setCarousel();
    }
  }

  setCarousel() {
    let gallery = document.body.querySelector(".content-gallery");
    if (!gallery) return;
    carouselUtils.setSwiperMarkup({
      $el: gallery,
      hasArrows: true,
      hasBullets: true,
    });
    Swiper.use([Navigation, Pagination, A11y]);
    new Swiper(gallery, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
    });
  }

  async setSongbook() {
    if (!window.songbook) return;

    let alphabeticSongbook = window.songbook.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    alphabeticSongbook.forEach((song) => {
      this.promises.push(
        fetch(this.songbookUrl + song.id + ".html", {
          mode: "cors",
          headers: this.headers,
        })
          .then((response) => response.text())
          .then((text) => {
            song.text = text;
          })
      );
    });
    await Promise.all(this.promises).then((data) => {
      document.body.querySelector(".loading").remove();
      alphabeticSongbook.forEach((song) => {
        this.setSong(song);
      });
    });
  }

  async getSong(song) {
    let url = this.songbookUrl + song.id + ".html";
    const text = await this.getFetchedDom(url);
    song.text = text;
  }

  async setSong(song) {
    let songMarkup = this.buildSongMarkup(song);
    let songbook = document.body.querySelector(".page-content--canti");
    songbook.insertAdjacentHTML("beforeend", songMarkup);
  }

  buildSongMarkup(song) {
    let lowerTitle = song.title.toLowerCase();
    let lowerAuthor = song.author.toLowerCase();
    let songMarkup = `
			<details class="song" data-id="${song.id}" data-title="${lowerTitle}" data-author="${lowerAuthor}">
				<summary class="song-title">${song.title}</summary>
				<div>`;
    if (song.author) {
      songMarkup += `<p class="song-author">${song.author}</p>`;
    }
    songMarkup += `<div class="song-text">${song.text}</div>
		</div></details>
		`;
    return songMarkup;
  }
}

let setup = new Setup();
setup.init();
