// 장바구니 !

basketStarterEl = document.querySelector("header .basket-starter");
basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}

function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색 !
headerEl = document.querySelector("header");
searchStarterEl = headerEl.querySelector(".search-starter");
searchWrapEl = headerEl.querySelector(".search-wrap");
searchCloserEl = searchWrapEl.querySelector(".search-closer");
shadowEl = searchWrapEl.querySelector(".shadow");
headerMenuEls = [...document.querySelectorAll("ul.menu > li")];
// searchTextEl = [...searchWrapEl.querySelectorAll("textfield")]

searchStarterEl.addEventListener("click", showSearch);

searchCloserEl.addEventListener("click", hideSearch);

shadowEl.addEventListener("click", hideSearch);

function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / headerMenuEls.length + "s";
  });
}

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  console.log(headerMenuEls);
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / headerMenuEls.length + "s";
  });
}
