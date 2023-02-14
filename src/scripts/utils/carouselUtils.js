const carouselUtils = {
  setSwiperMarkup: ({ $el, hasArrows = true, hasBullets = true }) => {
    if (!$el) {
      throw "setSwiperMarkup requires an element";
    }
    $el.classList.add("swiper");
    let $inner = $el.firstElementChild;
    $inner.classList.add("swiper-wrapper");
    for (let $child of $inner.children) {
      $child.classList.add("swiper-slide");
    }
    if (hasArrows) {
      let $prev = document.createElement("div");
      $prev.classList.add("swiper-button-prev");
      let $next = document.createElement("div");
      $next.classList.add("swiper-button-next");
      $el.appendChild($prev);
      $el.appendChild($next);
    }
    if (hasBullets) {
      let $bullets = document.createElement("div");
      $bullets.classList.add("swiper-pagination");
      $el.appendChild($bullets);
    }
  },
};

export default carouselUtils;
