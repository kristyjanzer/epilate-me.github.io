$(function() {

    // Burger Menu
    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const burgerMenu = document.querySelector(".header .header-button-menu");
    const burgerBody = document.querySelector(".header .header-button-menu__body");


    burgerMenu.addEventListener("click", (e) => {
    header.classList.toggle("header-menu-open");
    burgerBody.classList.toggle("active");
    body.classList.toggle("lock");
    e.stopPropagation();


    if($('.header-menu-more').hasClass('active')) {
        $(".header").addClass("header-menu-open");
        $(".header .header-button-menu__body").addClass("active");
    }
    });

    $(".header-top__socials").clone().appendTo(".header-button-menu__socials");
    $(".header-top__phone").clone().appendTo(".header-button-menu__socials");

});

