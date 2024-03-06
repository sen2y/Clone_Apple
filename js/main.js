// 장바구니 !

const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

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
const headerEl = document.querySelector("header");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const shadowEl = searchWrapEl.querySelector(".shadow");
const headerMenuEls = [...document.querySelectorAll("ul.menu > li")];
const searchAutoEls = [...searchWrapEl.querySelectorAll("li")];
const searchInputEl = searchWrapEl.querySelector("input");

searchStarterEl.addEventListener("click", function () {
  showSearch();
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
});

searchCloserEl.addEventListener("click", hideSearch);

shadowEl.addEventListener("click", hideSearch);

function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / headerMenuEls.length + "s";
  });
  searchAutoEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / searchAutoEls.length + "s";
  });
  searchAutoEls.reverse();
  searchInputEl.value = "";
}

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  console.log(headerMenuEls);
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / headerMenuEls.length + "s";
  });
  searchAutoEls.forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / searchAutoEls.length + "s";
  });
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const els = document.querySelectorAll(".info");
els.forEach(function (el) {
  io.observe(el);
});
