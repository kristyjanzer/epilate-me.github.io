$(function() {

    // Burger Menu
    const header = document.querySelector(".header");
    const burgerMenu = document.querySelector(".header .header-button-menu");
    const burgerBody = document.querySelector(".header .header-button-menu-body");


    burgerMenu.addEventListener("click", (e) => {
    header.classList.toggle("header-menu-open");
    burgerBody.classList.toggle("active");
    e.stopPropagation();


    if($('.header-menu-more').hasClass('active')) {
        $(".header").addClass("header-menu-open");
        $(".header .header-button-menu-body").addClass("active");
    }
    });

    $(".header-top__socials").clone().appendTo(".header-button-menu-body__socials");
    $(".header-top__phone").clone().appendTo(".header-button-menu-body__socials");
    $(".main-menu").clone().appendTo(".header-button-menu-body__main-menu");
    $(".search").clone().prependTo(".search-mobile__input");

    
});

document.addEventListener('DOMContentLoaded', () => {
  const searchMobile = document.querySelector('.search-mobile__icon');
  const searchElement = document.querySelector('.search-mobile__input');

  searchMobile?.addEventListener('click', (e) => {
    e.stopPropagation();
    searchElement?.classList.toggle('active');
    
    if (searchElement?.classList.contains('active')) {
      searchElement.focus();
    }
  });

  searchElement?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    const isIcon = e.target === searchMobile;
    const isInput = e.target === searchElement || searchElement?.contains(e.target);

    if (!isIcon && !isInput) {
      searchElement?.classList.remove('active');
    }
  });
});
