$(function() {

    // Burger Menu
    const header = document.querySelector('.header');
    const burgerMenu = header?.querySelector('.header-button-menu');
    const burgerBody = header?.querySelector('.header-button-menu-body');
    const searchMobileInput = document.querySelector('.search-mobile__input');

    if (burgerMenu && burgerBody) {
      burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (searchMobileInput && searchMobileInput.classList.contains('active')) {
          searchMobileInput.classList.remove('active');
        }
        
        header.classList.toggle('header-menu-open');
        burgerBody.classList.toggle('active');
      });
    }

    if (searchMobileInput) {
      searchMobileInput.addEventListener('click', (e) => {
        e.stopPropagation();
        searchMobileInput.classList.toggle('active');
      });
    }


    

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
        infinite: true,
        adaptiveHeight: true,
        responsive: [
            { 
                breakpoint: 1000, 
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



    // Clinics and Equipment Sliders
    // const initSlider = (selector, settings) => {
    //     const $slider = $(selector);
        
    //     $slider.slick(settings);
    //     $slider.slick('setPosition');
    //     $slider.slick('refresh');
        
    //     return $slider;
    // };

    // const applyFilter = ($slider, category, itemSelector, categoryAttr = 'data-category') => {
    //     $slider.slick('slickUnfilter');
        
    //     if (category) {
    //         $slider.slick('slickFilter', function() {
    //             return $(this).find(itemSelector).attr(categoryAttr) === category;
    //         });
    //     }
    // };

    // const setupFilterButtons = (buttonSelector, slider, itemSelector, defaultCategory) => {
    //     const filterButtons = document.querySelectorAll(buttonSelector);
        
    //     filterButtons.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             filterButtons.forEach(b => b.classList.remove('clinics-slider-nav__button--active', 'equipment-slider-nav__button--active'));
                
    //             btn.classList.add(
    //                 btn.classList.contains('clinics-slider-nav__button') 
    //                     ? 'clinics-slider-nav__button--active'
    //                     : 'equipment-slider-nav__button--active'
    //             );
                
    //             const category = btn.dataset.filter;
    //             applyFilter(slider, category, itemSelector);
    //         });
    //     });
        
    //     const defaultButton = document.querySelector(`[data-filter="${defaultCategory}"]`);
    //     if (defaultButton) {
    //         defaultButton.classList.add(
    //             defaultButton.classList.contains('clinics-slider-nav__button')
    //                 ? 'clinics-slider-nav__button--active'
    //                 : 'equipment-slider-nav__button--active'
    //         );
    //         applyFilter(slider, defaultCategory, itemSelector);
    //     }
    // };

    // const clinicsSlider = initSlider('.clinics-slider-content__items', {
    //     arrows: false,
    //     dots: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     responsive: [
    //         { breakpoint: 1100, settings: { slidesToShow: 2 } },
    //         { breakpoint: 900,  settings: { slidesToShow: 2 } },
    //         { breakpoint: 700,  settings: { slidesToShow: 1 } }
    //     ]
    // });

    // setupFilterButtons(
    //     '.clinics-slider-nav__button',
    //     clinicsSlider,
    //     '.clinics-slider-content__item',
    //     'moscow'
    // );

    // const equipmentSlider = initSlider('.equipment-slider-content__items', {
    //     arrows: false,
    //     dots: true,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     adaptiveHeight: true,
    //     responsive: [
    //         { breakpoint: 1000, settings: { slidesToShow: 1 } }
    //     ]
    // });

    // setupFilterButtons(
    //     '.equipment-slider-nav__button',
    //     equipmentSlider,
    //     '.equipment-slider-content__item',
    //     'alexandrite'
    // );


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


window.addEventListener('scroll', function() {
    const headerTop = document.querySelector('.header-top');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        headerTop.classList.add('active');
    } else {
        headerTop.classList.remove('active');
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




let Accordion = function (el, multiple) {
  this.el = el || {};
  // more than one submenu open?
  this.multiple = multiple || false;

  let accordionMenuLink = this.el.find('.accordion-menu__top');
  accordionMenuLink.on('click', {
    el: this.el,
    multiple: this.multiple
  }, this.dropdown);
};

Accordion.prototype.dropdown = function (e) {
  let $el = e.data.el,
      $this = $(this),                    // .accordion-menu__link (кликнутая ссылка)
      $next = $this.next();           // .accordion-menu__content (контент под ссылкой)

  // 1. Переключаем класс open у ссылки-триггера
  $this.toggleClass('active');

  // 2. Переключаем слайд и класс active у контента
  $next.slideToggle();
  $next.toggleClass('open');

  if (!e.data.multiple) {
    // Закрываем все остальные элементы, если режим single
    $el.find('.accordion-menu__top')
      .not($this)                        // все ссылки, кроме текущей
      .removeClass('active');            // убираем open у них

    $el.find('.accordion-menu__content')
      .not($next)                       // весь контент, кроме текущего
      .slideUp()                       // сворачиваем
      .removeClass('open');          // убираем active
  }
};

// Инициализация аккордеона (только один открытый элемент одновременно)
let accordion = new Accordion($('.accordion-menu'), false);





// Show all button
$('.accordion-menu-button').click(function (e) {
  e.preventDefault();
  e.returnValue = false;
  
  let length_before_toggle = $('.accordion-menu__item:hidden').length;
  
  $('.accordion-menu__item:hidden').slice(0, 10).toggle();
  
  if ($('.accordion-menu__item:hidden').length == 0) {
    if (length_before_toggle == 0) {
      $('.accordion-menu__item--hidden').toggle();
      
      $('html, body').animate({
        scrollTop: $('.accordion-menu').offset().top
      }, 'slow');
      
      $('.accordion-menu-button__text').text("Смотреть все");
      $('.accordion-menu-button').removeClass('hide');
    } else {
      $('.accordion-menu-button__text').text("Скрыть");
      $('.accordion-menu-button').addClass('hide');
    }
  } else {
    $('.accordion-menu-button__text').text("Смотреть все");
  }
});




// document.addEventListener('DOMContentLoaded', function() {
//   const submenuContainer = document.querySelector('.header-submenu');
//   let activeMenuItem = null;
//   let activeSubmenu = null;

//   // Основной обработчик кликов
//   document.addEventListener('click', function(e) {
//     const item = e.target.closest('.main-menu__item');
//     if (!item) return;

//     if (e.target.tagName === 'A') {
//       e.preventDefault();
//     }

//     toggleMainSubmenu(item);
//   });

//   function toggleMainSubmenu(item) {
//     // Если кликнули на активный пункт — закрываем
//     if (activeMenuItem === item) {
//       closeActiveMenu();
//       return;
//     }

//     // Закрываем предыдущее меню
//     if (activeMenuItem) {
//       closeActiveMenu();
//     }

//     // Открываем новое меню
//     openMenu(item);
//   }

//   function openMenu(item) {
//     activeMenuItem = item;
//     activeSubmenu = item.querySelector('.main-submenu');

//     if (!activeSubmenu) return;

//     // 1. Добавляем классы активному пункту
//     item.classList.add('active');

//     // 2. Перемещаем подменю в контейнер
//     submenuContainer.innerHTML = '';
//     submenuContainer.appendChild(activeSubmenu);
//     submenuContainer.style.maxHeight = activeSubmenu.scrollHeight + 'px';

//     // 3. Добавляем класс активному подменю ПОСЛЕ перемещения
//     activeSubmenu.classList.add('active');
//   }

//   function closeActiveMenu() {
//     if (!activeMenuItem || !activeSubmenu) return;

//     // 1. Убираем классы
//     activeMenuItem.classList.remove('active');
//     activeSubmenu.classList.remove('active');

//     // 2. Возвращаем подменю на место
//     activeMenuItem.appendChild(activeSubmenu);

//     // 3. Очищаем контейнер
//     submenuContainer.style.maxHeight = '0px';
//     submenuContainer.innerHTML = '';

//     // 4. Сбрасываем ссылки
//     activeMenuItem = null;
//     activeSubmenu = null;
//   }

//   // Обработчик для вложенных подменю (уровень 2+)
//   document.addEventListener('click', function(e) {
//     const nestedItem = e.target.closest('.main-submenu__item');
//     if (!nestedItem) return;

//     toggleNestedSubmenu(nestedItem);
//   });

//   function toggleNestedSubmenu(item) {
//     const isDirectChild = item.parentElement.classList.contains('main-submenu')
//       && !item.parentElement.classList.contains('main-submenu--level-2');

//     const nestedSubmenu = item.querySelector('.main-submenu--level-2');

//     if (isDirectChild) {
//       const isActive = item.classList.contains('active');

//       if (isActive) {
//         item.classList.remove('active');
//         if (nestedSubmenu) nestedSubmenu.classList.remove('active');
//       } else {
//         // Закрываем другие активные в этом же меню
//         const parentMenu = item.closest('.main-submenu');
//         parentMenu.querySelectorAll('.main-submenu__item.active').forEach(activeItem => {
//           activeItem.classList.remove('active');
//           const activeNested = activeItem.querySelector('.main-submenu--level-2');
//           if (activeNested) activeNested.classList.remove('active');
//         });

//         // Открываем текущее
//         item.classList.add('active');
//         if (nestedSubmenu) nestedSubmenu.classList.add('active');
//       }
//     } else if (nestedSubmenu) {
//       // Для уровня 2+
//       if (item.classList.contains('active')) {
//         nestedSubmenu.classList.remove('active');
//       } else {
//         nestedSubmenu.classList.add('active');
//       }
//     }
//   }
// });


// document.addEventListener('DOMContentLoaded', function() {
//   // Функция закрытия подменю (кроме указанных в исключениях)
//   function closeAllSubmenus(exceptIds) {
//     document.querySelectorAll('.main-menu__submenu--open, .main-submenu--level-2.main-menu__submenu--open')
//       .forEach(submenu => {
//         const id = submenu.getAttribute('data-submenu-id');
//         if (!exceptIds.includes(id)) {
//           submenu.classList.remove('main-menu__submenu--open');
//         }
//       });
//   }

//   // Обработчик клика по пункту меню
//   function handleMenuItemClick(e, item) {
//     e.stopPropagation(); // Останавливаем «пузырьковый» эффект

//     if (e.target.tagName === 'A') return; // Игнорируем клики по ссылкам

//     // Определяем тип пункта (родительский или дочерний)
//     const isSubmenuItem = item.closest('.main-submenu__item');
//     const submenu = isSubmenuItem
//       ? item.querySelector('.main-submenu--level-2')
//       : item.querySelector('.main-menu__submenu');

//     if (!submenu) return; // Если подменю нет — выходим

//     const currentId = submenu.getAttribute('data-submenu-id');
//     const parentId = item.getAttribute('data-parent-id') || item.getAttribute('data-menu-id');

//     // Формируем список исключений (какие подменю не закрывать)
//     const exceptIds = [];
//     if (isSubmenuItem) {
//       // Для дочернего пункта сохраняем открытыми: родительское и текущее подменю
//       exceptIds.push(parentId, currentId);
//     } else {
//       // Для родительского пункта — только текущее подменю
//       exceptIds.push(currentId);
//     }

//     // Логика открытия/закрытия
//     if (submenu.classList.contains('main-menu__submenu--open')) {
//       // Если подменю уже открыто — закрываем
//       submenu.classList.remove('main-menu__submenu--open');
//       console.log('Закрыто:', submenu.getAttribute('data-submenu-id'));
//     } else {
//       // Иначе: закрываем все, кроме исключённых, и открываем текущее
//       closeAllSubmenus(exceptIds);
//       submenu.classList.add('main-menu__submenu--open');
//       console.log('Открыто:', submenu.getAttribute('data-submenu-id'));
//     }
//   }

//   // Назначаем обработчики на все пункты меню
//   const allMenuItems = document.querySelectorAll('.main-menu__item, .main-submenu__item');
//   allMenuItems.forEach(item => {
//     item.addEventListener('click', e => handleMenuItemClick(e, item));

//     // Поддержка клавиатуры (Enter/Space)
//     item.addEventListener('keydown', e => {
//       if (e.key === 'Enter' || e.key === ' ') {
//         e.preventDefault();
//         handleMenuItemClick(e, item);
//       }
//     });
//   });

//   // Закрываем все подменю при клике вне меню
//   document.addEventListener('click', e => {
//     if (!e.target.closest('.header-top__menu')) {
//       document.querySelectorAll('.main-menu__submenu--open, .main-submenu--level-2.main-menu__submenu--open')
//         .forEach(submenu => submenu.classList.remove('main-menu__submenu--open'));
//     }
//   });
// });
















