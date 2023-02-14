class Finfilter {
  constructor() {
    this.log = "Start finoz/finfilter";
    this.toolbar = document.querySelector(".searchtoolbar");
    if (!this.toolbar) {
      throw new Error("No search toolbar found");
    }
    this.input = this.toolbar.querySelector(".searchtoolbar-input");
    this.reset = this.toolbar.querySelector(".searchtoolbar-reset");
    this.styleId = "finfilter";
    if (!this.input || !this.reset) {
      throw new Error("No search input found");
    }
    this.target = this.toolbar.getAttribute("data-target");
    this.refs = this.toolbar
      .getAttribute("data-targetref")
      .split(",")
      .map((ref) => "data-" + ref);
  }

  init() {
    this.setFilterStyleTag();
    this.searchListener();
  }

  searchListener() {
    let filterstyle = "";
    let style = document.getElementById(this.styleId);
    if (style) {
      this.input.addEventListener("input", (e) => {
        if (e.target.value.length < 1) {
          filterstyle = "";
        } else {
          let string = e.target.value.toLowerCase();
          filterstyle = this.target;
          this.refs.forEach((ref) => {
            filterstyle += `:not([${ref}*="${string}"])`;
          });
          filterstyle += "{display:none;}";
        }
        console.log(filterstyle);
        style.innerHTML = filterstyle;
      });
    }
    this.toolbar.addEventListener("reset", (e) => {
      style.innerHTML = "";
    });
  }

  setFilterStyleTag() {
    const style = document.createElement("style");
    style.id = "finfilter";
    document.body.appendChild(style);
  }
}
export default Finfilter;
