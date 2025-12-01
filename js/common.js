$(function() {

  //=== Предзагрузка всех изображений из слайдеров ===//
  function preloadImages() {
    const imageUrls = new Set();

    // Собираем src всех изображений из equipment и clinics
    document.querySelectorAll('.equipment-slider-content__item img, .clinics-slider-content__item img')
      .forEach(img => {
        if (img.src) imageUrls.add(img.src);
      });

    // Загружаем каждую картинку в фоне
    imageUrls.forEach(src => {
      const img = new Image();
      img.src = src; // Браузер закэширует её
    });

    console.log('Предзагружено изображений:', imageUrls.size);
  }

  preloadImages(); // Вызов функции

  //=====================================================//




  //=== Бургер-меню, Мобильный поиск, Мобильное меню ===//
  const mainMenu = document.querySelector('.main-menu');
  const desktopContainer = document.querySelector('.header-top__menu');
  const mobileContainer = document.querySelector('.header-button-menu-body__main-menu');
  const header = document.querySelector('.header');
  const burgerMenu = header?.querySelector('.header-button-menu');
  const burgerBody = header?.querySelector('.header-button-menu-body');
  const searchMobileIcon = document.querySelector('.search-mobile__icon');
  const searchMobileInput = document.querySelector('.search-mobile__input');

  // === Функция: очистить состояние меню ===
  function clearMenuState() {
  // Убираем 'open' со всех уровней
  document.querySelectorAll(
    '.main-menu__item, .main-submenu__item, .main-sub-submenu__item'
  ).forEach(el => el.classList.remove('open'));
}

  // === Функция: закрыть поиск ===
  function closeSearch() {
    if (searchMobileInput) {
      searchMobileInput.classList.remove('active');
    }
  }

  // === Функция: закрыть всё (меню + поиск) ===
  function closeAll() {
    if (header) {
      header.classList.remove('header-menu-open');
    }
    if (burgerBody) {
      burgerBody.classList.remove('active');
    }
    closeSearch();
    clearMenuState();
    updateHeaderMenuState();
  }

  // === Перенос меню ===
  function isMobile() {
    return window.innerWidth <= 1100;
  }

  function moveMenu() {
    if (!mainMenu || !desktopContainer || !mobileContainer) return;
    if (isMobile()) {
      if (!mobileContainer.contains(mainMenu)) {
        mobileContainer.appendChild(mainMenu);
      }
    } else {
      if (!desktopContainer.contains(mainMenu)) {
        desktopContainer.appendChild(mainMenu);
      }
    }
  }

  if (mainMenu && desktopContainer && mobileContainer) {
    moveMenu();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(moveMenu, 250);
    });
  }

  // === Обработка кликов по меню ===
  document.addEventListener('click', function(e) {
  const base = e.target.closest('.main-menu__base');
  if (!base) {
    clearMenuState();
    updateHeaderMenuState(); 
    return;
  }

  const item = base.closest('.main-menu__item, .main-submenu__item, .main-sub-submenu__item');
  if (!item) return;

  e.stopPropagation();

  const isRoot = item.classList.contains('main-menu__item');
  const isSub = item.classList.contains('main-submenu__item');
  const isSubSub = item.classList.contains('main-sub-submenu__item');

  if (isRoot) {
    // Для корневого пункта: подменю — это .main-menu__submenu > .main-submenu
    if (item.classList.contains('open')) {
      item.classList.remove('open');
    } else {
      clearMenuState();
      item.classList.add('open');
    }
    updateHeaderMenuState(); 
  } else if (isSub || isSubSub) {
    // Для вложенных пунктов — подменю находится непосредственно внутри как .main-sub-submenu
    const parentUl = item.parentElement;
    if (parentUl) {
      parentUl.querySelectorAll('.main-submenu__item, .main-sub-submenu__item')
        .forEach(sibling => {
          if (sibling !== item) sibling.classList.remove('open');
        });
    }
    item.classList.toggle('open');
  }
  }, true);


  // Не закрывать меню при клике внутри подменю
  // Запрет закрытия при клике внутри подменю
  document.addEventListener('click', function(e) {
    if (e.target.closest('.main-menu__submenu, .main-submenu, .main-sub-submenu')) {
      e.stopPropagation();
    }
  }, true);

  // === Бургер: открывает/закрывает меню, закрывает поиск ===
  if (burgerMenu) {
    burgerMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSearch(); // Закрываем поиск при открытии меню
      header?.classList.toggle('header-menu-open');
      burgerBody?.classList.toggle('active');
      updateHeaderMenuState();
    });
  }

  // === Поиск: открывает/закрывает поиск, закрывает меню ===
  if (searchMobileIcon) {
    searchMobileIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (header?.classList.contains('header-menu-open')) {
        closeAll(); // Закрываем всё, если меню было открыто
      } else {
        searchMobileInput?.classList.toggle('active');
        if (searchMobileInput?.classList.contains('active')) {
          searchMobileInput.focus();
        }
      }
    });
  }

  if (searchMobileInput) {
    searchMobileInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // === Закрыть всё при клике вне ===
  document.addEventListener('click', (e) => {
    const isInsideBurger = e.target.closest('.header-button-menu, .header-button-menu-body');
    const isInsideSearch = e.target.closest('.search-mobile');

    if (!isInsideBurger && !isInsideSearch) {
      closeAll();
    }
  });

  // =============================================


  // Функция для обновления состояния header-top
  function updateHeaderMenuState() {
  const hasOpenDesktopItem = !!document.querySelector('.main-menu__item.open');
  const header = document.querySelector('.header');
  const headerTop = document.querySelector('.header-top');
  const body = document.body;

  const isMobileMenuOpen = header?.classList.contains('header-menu-open') || false;
  const isAnyMenuOpen = hasOpenDesktopItem || isMobileMenuOpen;

  // Обновляем main-menu-open у .header-top (только для десктопного меню)
  if (headerTop) {
    if (hasOpenDesktopItem) {
      headerTop.classList.add('main-menu-open');
    } else {
      headerTop.classList.remove('main-menu-open');
    }
  }

  // Управляем shadow на body: если открыто ЛЮБОЕ меню
  if (isAnyMenuOpen) {
    body.classList.add('shadow');
  } else {
    body.classList.remove('shadow');
  }

  // Если десктопное меню только что закрылось — обновляем active
  const wasDesktopMenuOpen = headerTop?.classList.contains('main-menu-open') || false;
  if (wasDesktopMenuOpen && !hasOpenDesktopItem) {
    applyScrollActiveState();
  }
}

  function applyScrollActiveState() {
    const headerTop = document.querySelector('.header-top');
    if (!headerTop) return;

    // Не применяем active, если меню открыто
    if (headerTop.classList.contains('main-menu-open')) {
      return;
    }

    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      headerTop.classList.add('active');
    } else {
      headerTop.classList.remove('active');
    }
  }

  // Слушатель скролла
  window.addEventListener('scroll', function () {
    applyScrollActiveState();
  });



  // === Клонируем соцсети и телефон в ОДИН блок ===
  const socials = document.querySelector('.header-top__socials');
  const phone = document.querySelector('.header-top__phone');
  const mobileSocialsContainer = document.querySelector('.header-button-menu-body__socials');

  if (mobileSocialsContainer) {
    mobileSocialsContainer.innerHTML = '';

    // Клонируем соцсети
    if (socials) {
      const socialsClone = socials.cloneNode(true);
      socialsClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      mobileSocialsContainer.appendChild(socialsClone);
    }

    // Клонируем телефон
    if (phone) {
      const phoneClone = phone.cloneNode(true);
      phoneClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      mobileSocialsContainer.appendChild(phoneClone);
    }
  }

  // === Клонирование поиска ===
  const search = document.querySelector('.search');
  const searchTarget = document.querySelector('.search-mobile__input');

  if (search && searchTarget && !searchTarget.querySelector('.search')) {
    const searchClone = search.cloneNode(true);
    searchClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    searchTarget.insertAdjacentElement('afterbegin', searchClone);
  }


  // === Слайдеры ===

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



// ======== CLINICS SLIDER (надёжная версия) ========
const sliderContainer = $('.clinics-slider-content__items');
let originalItems = null;
let slickActive = false;

if (sliderContainer.length) {
  originalItems = sliderContainer.children().clone();
}

const initSlider = (items) => {
  if (slickActive) {
    sliderContainer.slick('unslick');
  }

  sliderContainer.empty().append(items);

  sliderContainer.slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 700, settings: { slidesToShow: 1 } }
    ]
  });
  slickActive = true;
};

const applyFilter = (category) => {
  if (!originalItems) return;

  let filteredItems;
  if (category) {
    filteredItems = originalItems.filter(`[data-category="${category}"]`);
  } else {
    filteredItems = originalItems;
  }

  initSlider(filteredItems);
};

document.querySelectorAll('.clinics-slider-nav__button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.clinics-slider-nav__button').forEach(b => b.classList.remove('clinics-slider-nav__button--active'));
    btn.classList.add('clinics-slider-nav__button--active');
    applyFilter(btn.dataset.filter);
  });
});

const defaultBtn = document.querySelector('[data-filter="moscow"]');
if (defaultBtn) {
  defaultBtn.classList.add('clinics-slider-nav__button--active');
  applyFilter('moscow');
}


// ======== EQUIPMENT SLIDER (надёжная версия) ========
const sliderEContainer = $('.equipment-slider-content__items');
let originalItemsE = null;
let slickActiveE = false;

// Сохраняем оригинальные элементы
if (sliderEContainer.length) {
  originalItemsE = sliderEContainer.children().clone(); // клонируем, чтобы не потерять
}

const initSliderE = (items) => {
  // Удаляем старый слайдер
  if (slickActiveE) {
    sliderEContainer.slick('unslick');
  }

  // Очищаем и вставляем нужные элементы
  sliderEContainer.empty().append(items);

  // Запускаем слайдер
  sliderEContainer.slick({
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 1 } }
    ]
  });
  slickActiveE = true;
};

const applyFilterE = (category) => {
  if (!originalItemsE) return;

  let filteredItems;
  if (category) {
    filteredItems = originalItemsE.filter(`[data-category="${category}"]`);
  } else {
    filteredItems = originalItemsE;
  }

  // Если нет элементов — можно показать заглушку, но мы просто рендерим пустой
  initSliderE(filteredItems);
};

// Кнопки фильтрации
document.querySelectorAll('.equipment-slider-nav__button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.equipment-slider-nav__button').forEach(b => b.classList.remove('equipment-slider-nav__button--active'));
    btn.classList.add('equipment-slider-nav__button--active');
    applyFilterE(btn.dataset.filter);
  });
});

// Инициализация по умолчанию
const defaultBtnE = document.querySelector('[data-filter="alexandrite"]');
if (defaultBtnE) {
  defaultBtnE.classList.add('equipment-slider-nav__button--active');
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

  // ========================================


  // === Показать все кнопки ===
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

  

});

// // Header-Top Scroll
// window.addEventListener('scroll', function() {
//   const headerTop = document.querySelector('.header-top');
//   const scrollPosition = window.scrollY;

//   if (scrollPosition > 50) {
//     headerTop.classList.add('active');
//   } else {
//     headerTop.classList.remove('active');
//   }
// });


// === Аккордеон ===
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
      $this = $(this),                    
      $next = $this.next();          

  $this.toggleClass('active');

  $next.slideToggle();
  $next.toggleClass('open');

  if (!e.data.multiple) {
    $el.find('.accordion-menu__top')
      .not($this)                    
      .removeClass('active');        

    $el.find('.accordion-menu__content')
      .not($next)             
      .slideUp()                   
      .removeClass('open');      
  }
};

// Инициализация аккордеона (только один открытый элемент одновременно)
let accordion = new Accordion($('.accordion-menu'), false);
