$(function() {

    // Burger Menu
    const header = document.querySelector(".header");
    const burgerMenu = document.querySelector(".header .header-button-menu");
    const burgerBody = document.querySelector(".header .header-button-menu-body");

    burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();

    header.classList.toggle("header-menu-open");
    burgerBody.classList.toggle("active");

        if (document.querySelector('.header-menu-more.active')) {
            header.classList.add("header-menu-open");
            burgerBody.classList.add("active");
        }
    });

    

    // Clone Elements
    const socials = document.querySelector('.header-top__socials');
    const socialsTarget = document.querySelector('.header-button-menu-body__socials');
    
    if (socials && socialsTarget) {
        const clone = socials.cloneNode(true);
        socialsTarget.appendChild(clone);
    }

    const phone = document.querySelector('.header-top__phone');
    const phoneTarget = document.querySelector('.header-button-menu-body__socials');

    if (phone && phoneTarget) {
        const clone = phone.cloneNode(true);
        phoneTarget.appendChild(clone);
    }

    const mainMenu = document.querySelector('.main-menu');
    const mainMenuTarget = document.querySelector('.header-button-menu-body__main-menu');

    if (mainMenu && mainMenuTarget) {
        const clone = mainMenu.cloneNode(true);
        mainMenuTarget.appendChild(clone);
    }

    const search = document.querySelector('.search');
    const searchTarget = document.querySelector('.search-mobile__input');

    if (search && searchTarget) {
        const clone = search.cloneNode(true);
        searchTarget.insertAdjacentElement('afterbegin', clone);
    }


    // Content Ranks Slider
    $('.header-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        // responsive: [
        //   {
        //     breakpoint: 1400,
        //       settings: {
        //         dots: true,
        //         arrows: false,
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //     },
        //   }
        // ]
    });
});



// Search Button
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
