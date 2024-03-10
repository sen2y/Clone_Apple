import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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

searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});

shadowEl.addEventListener("click", hideSearch);

function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
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
  stopScroll();
  console.log(headerMenuEls);
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / headerMenuEls.length + "s";
  });
  searchAutoEls.forEach(function (el, index) {
    el.style.transitionDelay = (0.4 * index) / searchAutoEls.length + "s";
  });
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// 헤더 메뉴 토글! [모바일]
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = ""; // 검색어 초기화
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색! [모바일]
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus(); // 검색어 입력창에 포커스
});
searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

// 최적화, 검색중 화면 크기 변경 시 검색 모드 종료
// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리.
window.addEventListener("resize", (event) => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

// 네비게이션 메뉴 토글! [모바일]
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");
navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

navMenuShadowEl.addEventListener("click", hideNavMenu);

window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
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

// 비디오 컨트롤
const playBtnEl = document.querySelector(".controller--play");
const pauseBtnEl = document.querySelector(".controller--pause");
const videoEl = document.querySelector("video");

playBtnEl.addEventListener("click", function () {
  playBtnEl.classList.add("hide");
  pauseBtnEl.classList.remove("hide");
  videoEl.play();
});

pauseBtnEl.addEventListener("click", function () {
  pauseBtnEl.classList.add("hide");
  playBtnEl.classList.remove("hide");
  videoEl.pause();
});

// '당신에게 맞는 iPad는? 렌더링!
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  // .createElement -> 요소를 js에서 생성
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color}"></li>`;
  });

  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />

  </div>
  <ul class="colors">
    ${colorList}

  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  // .appendChild -> 요소를 자식 요소로 추가
  itemsEl.appendChild(itemEl);
});

// 네비게이션 렌더링
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += `<li><a href="${map.url}">${map.name}</a></li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
    <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>`;

  navigationsEl.appendChild(mapEl);
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();
