$(function() {

  //=== Предзагрузка всех изображений из слайдеров ===//
  function preloadImages() {
    const imageUrls = new Set();

    // Собираем src всех изображений из equipment и clinics
    document.querySelectorAll('.equipment-slider-content__item img, .clinics-slider-content__item img, .laser-equipment-slider img')
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

  //=== Слайдер Акций в Клинике
  $('.clinic-promo-slider').slick({
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



  
  //=== Слайдер Клиник и Фильтрация по городам
  const hasSlick = typeof $ !== 'undefined' && $.fn.slick;

  // === 1. Обычные секции (без слайдера) ===
  document.querySelectorAll('.filterable-section:not(.has-slick)').forEach(section => {
    const buttons = section.querySelectorAll('[data-filter]');
    const items = section.querySelectorAll('[data-category]');

    const showItems = (category) => {
      items.forEach(item => {
        item.classList.toggle('hidden', item.dataset.category !== category);
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('clinics-nav__button--active'));
        btn.classList.add('clinics-nav__button--active');
        showItems(btn.dataset.filter);
      });
    });

    const def = buttons[0] || section.querySelector('[data-filter="moscow"]');
    if (def) {
      def.classList.add('clinics-nav__button--active');
      showItems(def.dataset.filter);
    }
  });

  // === 2. Секции со слайдером ===
  if (hasSlick) {
    document.querySelectorAll('.filterable-section.has-slick').forEach(section => {
      const buttons = section.querySelectorAll('[data-filter]');
      const sliderContainer = section.querySelector('.is-slick-slider');
      if (!sliderContainer) return;

      const $slider = $(sliderContainer);
      const originalItems = $slider.children().clone();
      let slickActive = false;

      const initSlider = (category) => {
        const filtered = originalItems.filter(`[data-category="${category}"]`);
        if (slickActive) $slider.slick('unslick');
        $slider.empty().append(filtered);
        $slider.slick({
          arrows: false,
          dots: true,
          slidesToShow: 3,
          responsive: [
            { breakpoint: 1100, settings: { slidesToShow: 2 } },
            { breakpoint: 700, settings: { slidesToShow: 1 } }
          ]
        });
        slickActive = true;
      };

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('clinics-nav__button--active'));
          btn.classList.add('clinics-nav__button--active');
          initSlider(btn.dataset.filter);
        });
      });

      const def = buttons[0] || section.querySelector('[data-filter="moscow"]');
      if (def) {
        def.classList.add('clinics-nav__button--active');
        initSlider(def.dataset.filter);
      }
    });
  }






  // === Универсальная функция для переключения "показать всё / скрыть" ===
  function toggleItemsList(container, list, button, isShowingAll, shouldScroll = false) {
    const textSpan = button?.querySelector('.clinic-services__button-text, .areas-box__button-text');
    if (!textSpan) return;

    if (isShowingAll) {
      list.classList.add('show-all');
      textSpan.textContent = button.dataset.hide;
    } else {
      list.classList.remove('show-all');
      textSpan.textContent = button.dataset.show;

      if (shouldScroll) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // === 1. Обработка блоков С фильтрами (как раньше) ===
  document.querySelectorAll('.filter-section').forEach(section => {
    const defaultFilter = section.dataset.defaultFilter;
    const buttons = section.querySelectorAll('.main-filter__button');
    const galleries = section.querySelectorAll('.gallery[data-category]');
    const toggleBtn = section.querySelector('.toggle-all-button');

    let isShowingAll = false;

    const setActiveGallery = (category) => {
      galleries.forEach(gal => gal.classList.remove('is-active', 'show-all'));
      const targetGallery = section.querySelector(`.gallery[data-category="${category}"]`);
      if (targetGallery) {
        targetGallery.classList.add('is-active');
        toggleItemsList(section, targetGallery, toggleBtn, isShowingAll, false);
      }
    };

    const applyFilter = (category) => {
      isShowingAll = false;
      buttons.forEach(btn => {
        btn.classList.toggle('main-filter__button--active', btn.dataset.filter === category);
      });
      setActiveGallery(category);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const wasShowingAll = isShowingAll;
        isShowingAll = !isShowingAll;

        const activeCategory =
          section.querySelector('.main-filter__button--active')?.dataset.filter || defaultFilter;
        const activeGallery = section.querySelector(`.gallery[data-category="${activeCategory}"]`);

        if (activeGallery) {
          toggleItemsList(section, activeGallery, toggleBtn, isShowingAll, wasShowingAll);
        }
      });
    }

    if (defaultFilter) applyFilter(defaultFilter);
  });

  // === 2. Обработка блоков БЕЗ фильтров: clinic-services ===
  document.querySelectorAll('.clinic-services').forEach(section => {
    const list = section.querySelector('.clinic-services__list');
    const toggleBtn = section.querySelector('.toggle-all-button');

    if (!list || !toggleBtn) return;

    let isShowingAll = false;

    toggleBtn.addEventListener('click', () => {
      isShowingAll = !isShowingAll;
      toggleItemsList(section, list, toggleBtn, isShowingAll, false);
    });

    // Инициализация: убедимся, что изначально всё в порядке
    list.classList.remove('show-all');
    const textSpan = toggleBtn.querySelector('.clinic-services__button-text');
    if (textSpan) textSpan.textContent = toggleBtn.dataset.show;
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

      // ✅ Откладываем инициализацию до полной загрузки страницы
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        initSlider(filteredItems);
      }, { once: true });
    } else {
      initSlider(filteredItems);
    }
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


  //== Слайдер Ощущения на странице ЛЭ
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



  //== Gallery Slider
  function swiperSlider3dCategory() {
    if ($('.gallery-slider__container').length) {
      var swiperCategory = new Swiper('.gallery-slider__container', {
          mode:'horizontal',
          loop: true,
          speed: 500,
          slidesPerView: 1,
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          parallax: true,
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
          1100: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          // 851: {
          //   slidesPerView: 3,
          //   effect: 'coverflow',
          //   autoHeight: false,
          // },
          // 1151: {
          //   slidesPerView: 3,
          //   effect: 'coverflow',
          // }
        }
      });
    }
  }

  swiperSlider3dCategory();


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
  

  // Слайдер Отзывов
  $('.info-slider').slick({
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


  //=====================================================//



  // === Видео Блок ===//
  document.querySelectorAll('.video-block__preview').forEach(preview => {
    preview.addEventListener('click', function() {
      const videoBlock = this.closest('.video-block');
      const video = videoBlock.querySelector('.video-block__video');
      const source = video.querySelector('source');

      const videoSrc = this.getAttribute('data-video');

      // Устанавливаем src только при первом клике
      if (!source.src || source.src !== videoSrc) {
        source.src = videoSrc;
        video.load(); // перезагружаем видео с новым src
      }

      // Добавляем controls
      video.setAttribute('controls', 'controls');

      const playPromise = video.play();

      // Обработка ошибок автовоспроизведения
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.warn('Видео не удалось воспроизвести автоматически');
        });
      }

      videoBlock.classList.add('is-playing');
    });
  });

  //=====================================================//
  



  //=== Плавный скролл от ссылки к блоку ===//
  function smoothScrollTo(targetY, duration = 1500) {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      function animateScroll(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Используем "ease-out" функцию для мягкого замедления в конце
          const easeOut = 1 - Math.pow(1 - progress, 3);

          window.scrollTo(0, startY + distance * easeOut);

          if (progress < 1) {
              requestAnimationFrame(animateScroll);
          }
      }

      requestAnimationFrame(animateScroll);
  }

  // Обработчик клика
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;

          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              e.preventDefault();
              const offsetTop = targetElement.offsetTop - 110; // отступ
              smoothScrollTo(offsetTop, 1500); // 1500 мс = 1.5 секунды
          }
      });
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