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

    // Clinics Slider
    const slider = $('.clinics-slider-content__items');
    const filterButtons = document.querySelectorAll('.clinics-slider-nav__button');

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

    slider.slick('setPosition');
    slider.slick('refresh');

    const applyFilter = (category) => {
        slider.slick('slickUnfilter');
        
        if (category) {
            slider.slick('slickFilter', function() {
                return $(this).find('.clinics-slider-content__item').attr('data-category') === category;
            });
        }
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('clinics-slider-nav__button--active'));
            
            btn.classList.add('clinics-slider-nav__button--active');
            
            const category = btn.dataset.filter;
            
            applyFilter(category);
        });
    });

    const defaultButton = document.querySelector('[data-filter="moscow"]');
    if (defaultButton) {
        defaultButton.classList.add('clinics-slider-nav__button--active');
        applyFilter('moscow');
    }
        

    // Equipment Slider
    const sliderE = $('.equipment-slider-content__items');
    const filterButtonsE = document.querySelectorAll('.equipment-slider-nav__button');

    sliderE.slick({
        arrows: false,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            { 
                breakpoint: 1100, 
                settings: { 
                    slidesToShow: 1
                } 
            },
        ]
    });

    sliderE.slick('setPosition');
    sliderE.slick('refresh');

    const applyFilterE = (categoryE) => {
        sliderE.slick('slickUnfilter');
        
        if (categoryE) {
            sliderE.slick('slickFilter', function() {
                return $(this).find('.equipment-slider-content__item').attr('data-category') === categoryE;
            });
        }
    };

    filterButtonsE.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtonsE.forEach(b => b.classList.remove('equipment-slider-nav__button--active'));
            
            btn.classList.add('equipment-slider-nav__button--active');
            
            const categoryE = btn.dataset.filter;
            
            applyFilterE(categoryE);
        });
    });

    const defaultButtonE = document.querySelector('[data-filter="alexandrite"]');
    if (defaultButtonE) {
        defaultButtonE.classList.add('equipment-slider-nav__button--active');
        applyFilterE('alexandrite');
    }


    // Licenses Slider
    $('.licenses-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
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

    // Experts Slider
    $('.experts-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
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

    // Reviews Slider
    $('.reviews-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        adaptiveHeight: true,
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




// Accordion
let Accordion = function (el, multiple) {
  this.el = el || {};
  // more then one submenu open?
  this.multiple = multiple || false;

  let accordionMenuLink = this.el.find('.accordion-menu__link');
  accordionMenuLink.on('click',
    { el: this.el, multiple: this.multiple },
    this.dropdown);
};

Accordion.prototype.dropdown = function (e) {
  let $el = e.data.el,
    $this = $(this),
    //this is the ul.accordion-menu__content
    $next = $this.next();

  $next.slideToggle();
  $this.parent().toggleClass('open');

  if (!e.data.multiple) {
    //show only one menu at the same time
    $el.find('.accordion-menu__content').not($next).slideUp().parent().removeClass('open');
  }
}

let accordion = new Accordion($('.accordion-menu'), false);



// Show all button
$('.bookmakers-block__button').click(function (e) {
  e.preventDefault();
  e.returnValue = false;
  
  let length_before_toggle = $('.bookmakers-block-list__item:hidden').length;
  
  $('.bookmakers-block-list__item:hidden').slice(0, 10).toggle();
  
  if ($('.bookmakers-block-list__item:hidden').length == 0) {
    if (length_before_toggle == 0) {
      $('.bookmakers-block-list__item--hidden').toggle();
      
      $('html, body').animate({
        scrollTop: $('.bookmakers-block').offset().top
      }, 'slow');
      
      $('.bookmakers-block__button-text').text("Показать еще");
      $('.bookmakers-block__button').removeClass('hide');
    } else {
      $('.bookmakers-block__button-text').text("Скрыть");
      $('.bookmakers-block__button').addClass('hide');
    }
  } else {
    $('.bookmakers-block__button-text').text("Показать еще");
  }
});