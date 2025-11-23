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
        infinite: true
    });

    // Main Section Slider
    $('.main-sect-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 1100,
              settings: {
                slidesToShow: 2,
            },
          },
          {
            breakpoint: 700,
              settings: {
                slidesToShow: 1,
            },
          }
        ]
    });

    // Two-Level Slider
    $('.two-level-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 1300,
              settings: {
                slidesToShow: 3,
            },
          },
          {
            breakpoint: 1000,
              settings: {
                slidesToShow: 2,
            },
          },
          {
            breakpoint: 700,
              settings: {
                slidesToShow: 1,
            },
          }
        ]
    });

    // Areas Slider
    $('.areas-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        // variableWidth: true,
        responsive: [
          {
            breakpoint: 1100,
              settings: {
                slidesToShow: 3,
            },
          },
          {
            breakpoint: 900,
              settings: {
                slidesToShow: 2,
            },
          },
          {
            breakpoint: 700,
              settings: {
                slidesToShow: 1,
            },
          }
        ]
    });


    // Filter Slider
    const slider = $('.filter-slider-content__items');
    const filterButtons = document.querySelectorAll('.filter-slider-nav__button');

    try {
        slider.slick({
            arrows: false,
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            responsive: [
                { 
                    breakpoint: 1100, 
                    settings: { 
                        slidesToShow: 2
                    } 
                },
                { 
                    breakpoint: 900, 
                    settings: { 
                        slidesToShow: 2 
                    } 
                },
                { 
                    breakpoint: 700, 
                    settings: { 
                        slidesToShow: 1
                    } 
                }
            ]
        });
        // Принудительное обновление после инициализации
        slider.slick('setPosition');
        slider.slick('refresh');
    } catch (initError) {
        console.error('Ошибка инициализации Slick:', initError);
        return;
    }


    // const applyFilter = (category) => {
    //     slider.slick('slickUnfilter');
        
    //     if (category) {
    //         slider.slick('slickFilter', function() {
    //             return $(this).find('.filter-slider-content__item').attr('data-category') === category;
    //         });
    //     }
    // };

    // filterButtons.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         filterButtons.forEach(b => b.classList.remove('filter-slider-nav__button--active'));
            
    //         btn.classList.add('filter-slider-nav__button--active');
            
    //         const category = btn.dataset.filter;
            
    //         applyFilter(category);
    //     });
    // });

    // const defaultButton = document.querySelector('[data-filter="moscow"]');
    // if (defaultButton) {
    //     defaultButton.classList.add('filter-slider-nav__button--active');
    //     applyFilter('moscow');
    // }

    const applyFilter = (category) => {
        try {
        if (!slider.hasClass('slick-initialized')) {
            console.warn('Слайдер не инициализирован!');
            return;
        }

        slider.slick('slickUnfilter');

        if (category) {
            slider.slick('slickFilter', function() {
            const item = $(this).find('.filter-slider-content__item');
            return item.attr('data-category') === category;
            });
        }

        slider.slick('setPosition');
        slider.slick('refresh');

        const visibleSlides = slider.find('.slick-slide:not(.slick-cloned)').filter((i, el) => {
            return $(el).find('.filter-slider-content__item').length > 0;
        });

        if (visibleSlides.length === 0) {
            console.warn('Нет видимых слайдов для категории:', category);
            slider.slick('slickUnfilter');
            slider.slick('refresh');
        }
        } catch (filterError) {
        console.error('Ошибка фильтрации:', filterError);

        try {
            slider.slick('slickUnfilter');
            slider.slick('refresh');
        } catch (recoveryError) {
            console.error('Не удалось восстановить слайдер:', recoveryError);
        }
        }
    };


    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('filter-slider-nav__button--active'));
        btn.classList.add('filter-slider-nav__button--active');
        const category = btn.dataset.filter;
        applyFilter(category);
        });
    });

    if (filterButtons.length > 0) {
        const firstButton = filterButtons[0];
        firstButton.classList.add('filter-slider-nav__button--active');
        const initialCategory = firstButton.dataset.filter;
        applyFilter(initialCategory);
    }
        
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
