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
    if (item.classList.contains('open')) {
      item.classList.remove('open');
    } else {
      clearMenuState();
      item.classList.add('open');
    }
    updateHeaderMenuState(); 
  } else if (isSub || isSubSub) {
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

  //=====================================================//


  //=== Функция для обновления состояния header-top ===//
  function updateHeaderMenuState() {
  const hasOpenDesktopItem = !!document.querySelector('.main-menu__item.open');
  const header = document.querySelector('.header');
  const headerTop = document.querySelector('.header-top');
  const body = document.body;

  const isMobileMenuOpen = header?.classList.contains('header-menu-open') || false;
  const isAnyMenuOpen = hasOpenDesktopItem || isMobileMenuOpen;

  if (headerTop) {
    if (hasOpenDesktopItem) {
      headerTop.classList.add('main-menu-open');
    } else {
      headerTop.classList.remove('main-menu-open');
    }
  }

  if (isAnyMenuOpen) {
    body.classList.add('shadow');
  } else {
    body.classList.remove('shadow');
  }

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

  //=====================================================//



  // === Клонируем соцсети и телефон в ОДИН блок ===//
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


  //=== Слайдеры ===//

  //=== Слайдер Шапки
  $('.header-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true
  });


  //=== Слайдер Было/Стало
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


  //=== Двухуровневый слайдер
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


  //=== Слайдер Зоны
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


  //=== Слайдер Клиник
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

    const filteredItems = category
      ? originalItems.filter(`[data-category="${category}"]`)
      : originalItems;

    initSlider(filteredItems);
  };

  document.querySelectorAll('.clinics-slider-nav__button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.clinics-slider-nav__button').forEach(b => 
        b.classList.remove('clinics-slider-nav__button--active')
      );
      btn.classList.add('clinics-slider-nav__button--active');
      applyFilter(btn.dataset.filter);
    });
  });

  const defaultBtn = document.querySelector('[data-filter="moscow"]');
  if (defaultBtn) {
    defaultBtn.classList.add('clinics-slider-nav__button--active');
    applyFilter('moscow');
  }



  //=== Кнопки-фильтры для обычных блоков ===//
  document.querySelectorAll('.filter-section').forEach(section => {
    const defaultFilter = section.dataset.defaultFilter || null;
    const buttons = section.querySelectorAll('.main-filter__button');
    const galleries = section.querySelectorAll('.gallery[data-category]');
    const toggleBtn = section.querySelector('.toggle-all-button');
    
    let isShowingAll = false;

    // Обновление текста кнопки
      const updateButtonText = () => {
        if (!toggleBtn) return;
        const textSpan = toggleBtn.querySelector('.areas-box__button-text');
        if (textSpan) {
          textSpan.textContent = isShowingAll 
            ? toggleBtn.dataset.hide 
            : toggleBtn.dataset.show;
        }
      };

      // Активация галереи
      const setActiveGallery = (category) => {
        galleries.forEach(gal => {
          gal.classList.remove('is-active', 'show-all');
        });

        // Активируем нужную
        const targetGallery = section.querySelector(`.gallery[data-category="${category}"]`);
        if (targetGallery) {
          targetGallery.classList.add('is-active');
          if (isShowingAll) {
            targetGallery.classList.add('show-all');
          }
        }

        updateButtonText();
      };

      // Применение фильтра
      const applyFilter = (category) => {
        isShowingAll = false;
        buttons.forEach(btn => {
          btn.classList.toggle('main-filter__button--active', btn.dataset.filter === category);
        });
        setActiveGallery(category);
      };

      // Обработчики кнопок фильтра
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          applyFilter(btn.dataset.filter);
        });
      });

      // Обработчик кнопки "Показать всё / Скрыть"
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const wasShowingAll = isShowingAll;
          isShowingAll = !isShowingAll;

          const activeCategory = section.querySelector('.main-filter__button--active')?.dataset.filter || defaultFilter;
          setActiveGallery(activeCategory);

          // Если пользователь нажал "Скрыть" (то есть перешёл из режима "всё" в "ограничено")
          if (wasShowingAll && !isShowingAll) {
            // Плавная прокрутка к началу блока
            section.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }

      // Инициализация
      applyFilter(defaultFilter);
  });



  // Слайдер Лицензий
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

  // Слайдер Специалистов
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

  // Слайдер Отзывов
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

  //=== Слайдер Было/Стало на странице ЛЭ
  $('.laser-main-sect-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1100,
            settings: {
              variableWidth: false,
              slidesToShow: 3,
          },
        },
        {
          breakpoint: 900,
            settings: {
              variableWidth: false,
              slidesToShow: 2,
          },
        },
        {
          breakpoint: 700,
            settings: {
              variableWidth: false,
              slidesToShow: 1,
          },
        },
        // {
        //   breakpoint: 450,
        //     settings: {
        //       variableWidth: false,
        //       slidesToShow: 1,
        //   },
        // }
      ]
  });

    // Слайдер Специалистов
  $('.popular-slider').slick({
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

  
    /* Универсальный Slick-Slider для Оборудования ====================//

   * Создаёт фильтруемый Slick-слайдер
   * @param {Object} options
   * @param {string} options.sliderSelector — селектор контейнера .slick (например, '.my-slider__items')
   * @param {string} options.buttonGroupSelector — селектор всех кнопок фильтра (например, '.my-section .filter-btn')
   * @param {string} [options.activeButtonClass='equipment-filter__button--active'] — класс активной кнопки
   * @param {string|null} [options.defaultFilter=null] — значение data-filter по умолчанию
   * @param {number} [options.slidesToShow=1] — сколько слайдов показывать
   * @param {Array|null} [options.responsive=null] — массив responsive-настроек для Slick
   * @param {Object} [options.slickExtra={}] — любые дополнительные настройки Slick
   */
  function createFilteredSlider({
    sliderSelector,
    buttonGroupSelector,
    activeButtonClass = 'equipment-filter__button--active',
    defaultFilter = null,
    slidesToShow = 1,
    responsive = null,
    slickExtra = {}
  }) {
    const $slider = $(sliderSelector);
    if (!$slider.length) return;

    // Сохраняем оригинальные элементы для фильтрации
    const originalItems = $slider.children().clone();
    let slickActive = false;

    // Базовые настройки Slick
    const slickOptions = {
      arrows: false,
      dots: true,
      infinite: true,
      adaptiveHeight: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      ...slickExtra
    };

    // Добавляем responsive, если передан
    if (responsive) {
      slickOptions.responsive = responsive;
    }

    // Инициализация (или переинициализация) слайдера
    const initSlider = (items) => {
      if (slickActive) {
        $slider.slick('unslick');
      }
      $slider.empty().append(items);
      $slider.slick(slickOptions);
      slickActive = true;
    };

    // Применение фильтра
    const applyFilter = (category) => {
      if (!originalItems) return;

      let filteredItems = originalItems;
      if (category && category !== 'all') {
        filteredItems = originalItems.filter(`[data-category="${category}"]`);
      }

      initSlider(filteredItems);
    };

    // Навешиваем обработчики на кнопки
    document.querySelectorAll(buttonGroupSelector).forEach(btn => {
      btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок в группе
        document.querySelectorAll(buttonGroupSelector).forEach(b => {
          b.classList.remove(activeButtonClass);
        });
        // Добавляем активный класс текущей кнопке
        btn.classList.add(activeButtonClass);
        // Применяем фильтр (может быть null или 'all')
        applyFilter(btn.dataset.filter || null);
      });
    });

    // Устанавливаем фильтр по умолчанию
    if (defaultFilter !== null) {
      const defaultBtn = document.querySelector(`${buttonGroupSelector}[data-filter="${defaultFilter}"]`);
      if (defaultBtn) {
        defaultBtn.classList.add(activeButtonClass);
        applyFilter(defaultFilter);
      }
    }
  }

  //== Слайдер Оборудования на Главной странице
  createFilteredSlider({
    sliderSelector: '.equipment-slider-content__items',
    buttonGroupSelector: '.equipment .equipment-filter__button',
    defaultFilter: 'alexandrite',
    slidesToShow: 2,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 1 } }
    ]
  });

  //== Слайдер Оборудования на странице ЛЭ
  createFilteredSlider({
    sliderSelector: '.laser-equipment-slider-content__items',
    buttonGroupSelector: '.laser-equipment .equipment-filter__button',
    defaultFilter: 'alexandrite',
    slidesToShow: 1
    // responsive не нужен
  });


  // Слайдер Ощущения на странице ЛЭ
  const $slider = $('.feelings-slider');
  let isSliderInitialized = false;

  function updateLayout() {
    const isMobile = $(window).width() <= 1100;

    if (isMobile) {
      if (!isSliderInitialized) {
        $slider.removeClass('grid-mode').addClass('slider-mode');

        $slider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: false
        });

        isSliderInitialized = true;
      }
    } else {
      if (isSliderInitialized) {
        $slider.slick('unslick');
        isSliderInitialized = false;
      }
      $slider.removeClass('slider-mode').addClass('grid-mode');
    }
  }

  updateLayout();
  $(window).resize(updateLayout);


  //=== Фильтрация для раздела Цена на ЛЭ ===//
  document.querySelectorAll('.price-box').forEach(section => {
    const genderButtons = section.querySelectorAll('.main-filter__button[data-filter="woman"], .main-filter__button[data-filter="man"]');
    const laserButtons = section.querySelectorAll('.main-filter__button[data-filter="alexandrite"], .main-filter__button[data-filter="diode"]');
    const priceBlocks = section.querySelectorAll('.price-content');

    let currentGender = section.dataset.defaultGender || 'woman';
    let currentLaser = section.dataset.defaultLaser || 'alexandrite';

    const showMatchingBlock = () => {
      priceBlocks.forEach(block => {
        const genderMatch = block.dataset.gender === currentGender;
        const laserMatch = block.dataset.laser === currentLaser;
        block.classList.toggle('is-active', genderMatch && laserMatch);
      });
    };

    // Обработчики для кнопок пола
    genderButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        genderButtons.forEach(b => b.classList.remove('main-filter__button--active'));
        btn.classList.add('main-filter__button--active');
        currentGender = btn.dataset.filter;
        showMatchingBlock();
      });
    });

    // Обработчики для кнопок лазера
    laserButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        laserButtons.forEach(b => b.classList.remove('main-filter__button--active'));
        btn.classList.add('main-filter__button--active');
        currentLaser = btn.dataset.filter;
        showMatchingBlock();
      });
    });

    // Инициализация: активируем кнопки по умолчанию
    const defaultGenderBtn = section.querySelector(`.main-filter__button[data-filter="${currentGender}"]`);
    const defaultLaserBtn = section.querySelector(`.main-filter__button[data-filter="${currentLaser}"]`);

    if (defaultGenderBtn) defaultGenderBtn.classList.add('main-filter__button--active');
    if (defaultLaserBtn) defaultLaserBtn.classList.add('main-filter__button--active');

    // Показываем нужный блок
    showMatchingBlock();
  });
  

  //=====================================================//


  

  //=== Показать все кнопки для Аккордеона ===//
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


  // Пересчёт позиций всех слайдеров после небольшой задержки
  setTimeout(() => {
    $('.slick-initialized').slick('setPosition');
  }, 300);

});



//=== Аккордеоны ===//
class Accordion {
  constructor(el, options = {}) {
    this.el = el || {};
    this.multiple = options.multiple || false;
    this.topClass = options.topClass || '.accordion-menu__top';
    this.contentClass = options.contentClass || '.accordion-menu__content';

    const accordionLinks = this.el.find(this.topClass);
    accordionLinks.on('click', { accordion: this }, this.dropdown);
  }

  dropdown(e) {
    const self = e.data.accordion;
    const $this = $(this);
    const $next = $this.next();

    $this.toggleClass('active');
    $next.slideToggle().toggleClass('open');

    if (!self.multiple) {
      self.el.find(self.topClass)
        .not($this)
        .removeClass('active');

      self.el.find(self.contentClass)
        .not($next)
        .slideUp()
        .removeClass('open');
    }
  }
}

// Инициализация всех аккордеонов
new Accordion($('.accordion-menu'), {
  multiple: false,
  topClass: '.accordion-menu__top',
  contentClass: '.accordion-menu__content'
});

new Accordion($('.advantages-accordion'), {
  multiple: false,
  topClass: '.advantages-accordion__top',
  contentClass: '.advantages-accordion__content'
});

new Accordion($('.popular-offers-accordion'), {
  multiple: false,
  topClass: '.popular-offers-accordion__top',
  contentClass: '.popular-offers-accordion__content'
});