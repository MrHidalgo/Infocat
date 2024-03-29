$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  // BREAKPOINT SETTINGS
  var bp = {
    mobileS: 375,
    mobile: 568,
    tablet: 768,
    desktop: 992,
    wide: 1336,
    hd: 1680
  };

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady() {
    legacySupport();
    initSliders();
    initMasks();
    initPopups();

    hamburgerMenu();
    projectBlockBtn();
    initLightbox();
    initPreferScroll();
    _window.on("resize", debounce(initPreferScroll, 200));
    initQuickForm();
    initProjectTextShow();
    bodyClick();

    initScrollMonitor();
    initValidations();
  }

  // this is a master function which should have all functionality
  pageReady();


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }

  // Prevent # behavior
  _document
    .on('click', '[href="#"]', function (e) {
      e.preventDefault();
    });


  // HAMBURGER TOGGLER
  function hamburgerMenu() {
    $("[hamburger-js]").on("click", function (e) {
      $(e.currentTarget).toggleClass("is-active");
      $(".header__mobile").toggleClass("is-open");
      $("body, html").toggleClass("is-hide-scroll");
    })
  }

  function closeMobileMenu() {
    $("[hamburger-js]").removeClass("is-active");
    $(".header__mobile").removeClass("is-open");
    $("body, html").removeClass("is-hide-scroll")
  }


  // PROJECT BLOCK BTN
  function projectBlockBtn() {
    $(".project__block-btn").on("click", function (e) {
      var elem = $(e.currentTarget),
        textContainer = elem.closest(".project__block").find(".project__block-text");

      elem.toggleClass("is-active");
      textContainer.css({
        "height" : textContainer.attr("data-height")
      }).toggleClass("is-partHide");
    });
  }


  // LIGHTBOX
  function initLightbox() {
    lightbox.option({
      'resizeDuration': 300,
      'wrapAround': true,
      'showImageNumberLabel': false
    })
  }


  // Init prefer scrollbar
  function initPreferScroll() {
    var ps = "";

    if (_window.width() >= 768) {
      ps = new PerfectScrollbar('.header--scroll');
    } else if (typeof ps === "object") {
      ps.destroy();
      ps = null;
    }
  }


  // Init quick form
  function initQuickForm() {
    $("[quick-btn-js]").on("click", function(e) {
      $("[quick-form-js]").addClass("is-active");
    });
  }
  function closeQuickForm() {
    $(".quick__form-close").on("click", function(e) {
    $("[quick-form-js]").addClass("is-close");

      setTimeout(function() {
        $("[quick-form-js]").removeClass("is-active is-close");
      }, 450);
    });
  }
  closeQuickForm();


  /**
   *
   */
  function initProjectTextShow() {
    var textElem = $(".project__block-text");

    textElem.each(function(idx, val) {
      var valHeight = $(val).height();

      $(val).attr("data-height", valHeight);

      if(valHeight > 82) {
        $(val).addClass("is-partHide");
      } else {
        $(val).closest(".project__block").find(".project__block-btn").hide();
      }
    });
  }


  /**
   *
   */
  function bodyClick() {
    $('body').on('click', function (e) {
      var className = ".quick__btn, .quick__form";

      if (!$(e.target).closest(className).length) {
        $(".quick__form-close").click();
      }
    });
  }


  //////////
  // SLIDERS
  //////////

  function initSliders() {
    function swiperOption() {
      return {
        wrapperClass: "swiper-wrapper",
        slideClass: "swiper-slide",
        direction: 'horizontal',
        loop: true,
        watchOverflow: false,
        normalizeSlideIndex: true,
        grabCursor: false,
        freeMode: false,
        speed: 300,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      }
    }

    function swiperProject() {
      return {
        wrapperClass: "swiper-wrapper",
        slideClass: "swiper-slide",
        direction: 'horizontal',
        loop: false,
        watchOverflow: true,
        normalizeSlideIndex: true,
        grabCursor: false,
        freeMode: true,
        speed: 300,
        effect: 'slide',
        slidesPerView: "auto",
        spaceBetween: 30,
        navigation: {
          nextEl: ".project__button-next",
          prevEl: ".project__button-prev",
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      }
    }

    function swiperOptionSlide(slidesPerViewOpt, nextBtnName, prevBtnName) {
      return {
        wrapperClass: "swiper-wrapper",
        slideClass: "swiper-slide",
        direction: 'horizontal',
        loop: false,
        watchOverflow: true,
        normalizeSlideIndex: true,
        grabCursor: false,
        freeMode: true,
        speed: 300,
        effect: 'slide',
        slidesPerView: slidesPerViewOpt,
        spaceBetween: 30,
        breakpoints: {
          576: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        },
        navigation: {
          nextEl: nextBtnName,
          prevEl: prevBtnName,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      }
    }

    var freeSwiper = new Swiper('.swiper-container.free-slide-js', swiperOption());
    var aroundSwiper = new Swiper('.swiper-container.around-slide-js', swiperOption());

    var projectSwiper = new Swiper('.swiper-container.project-slide-js', swiperProject());

    var descLogoSwiper0 = new Swiper('.description__row-0 .desc-slideLogo-js', swiperOptionSlide("5", ".description__row-0 .descLogo__button-next", ".description__row-0 .descLogo__button-prev"));
    var descLogoSwiper1 = new Swiper('.description__row-1 .desc-slideLogo-js', swiperOptionSlide("5", ".description__row-1 .descLogo__button-next", ".description__row-1 .descLogo__button-prev"));
    var descLogoSwiper2 = new Swiper('.description__row-2 .desc-slideLogo-js', swiperOptionSlide("5", ".description__row-2 .descLogo__button-next", ".description__row-2 .descLogo__button-prev"));

    var descCertSwiper0 = new Swiper('.description__row-0 .desc-slideCert-js', swiperOptionSlide("4", ".description__row-0 .descCert__button-next", ".description__row-0 .descCert__button-prev"));
    var descCertSwiper1 = new Swiper('.description__row-1 .desc-slideCert-js', swiperOptionSlide("4", ".description__row-1 .descCert__button-next", ".description__row-1 .descCert__button-prev"));
    var descCertSwiper2 = new Swiper('.description__row-2 .desc-slideCert-js', swiperOptionSlide("4", ".description__row-2 .descCert__button-next", ".description__row-2 .descCert__button-prev"));

    function changeCount(classNameSlide, swiperName, mainCountName, mainLenName) {
      if ($(classNameSlide).length > 0) {
        var current = $(mainCountName + " [main-count-js]"),
          len = $(mainLenName + " [main-len-js]");

        // -2: slider loop, and we remove duplicate
        len.text((swiperName.slides.length - 2) || 0);
        current.text((swiperName.realIndex + 1) || 0);

        swiperName.on('slideChange', function () {
          current.text((swiperName.realIndex + 1) || 0);
        });
      }
    }

    changeCount(".free-slide-js", freeSwiper, "[free-count-js]", "[free-count-js]");
    changeCount(".around-slide-js", aroundSwiper, "[around-count-js]", "[around-count-js]");


    // DESCRIPTION CERT
    function descCertBtn() {
      $(".description__row-btn").on("click", function (e) {
        var elem = $(e.currentTarget),
          elemIdx = elem.attr("data-idx"),
          elemSpanContainer = elem.find("span"),
          elemSpanCurrText = elemSpanContainer.text(),
          elemDataAttr = elemSpanContainer.attr("data-txt");

        var parentContainer = elem.closest(".description__row-cert"),
          certContainer = parentContainer.find("[description__cert-js]");

        if (elem.hasClass("is-active")) {
          $(e.currentTarget).removeClass("is-active");
          elemSpanContainer.text(elem.attr("data-curr"));
          certContainer.slideUp("300").removeClass("is-animated");
        } else {
          $(e.currentTarget).addClass("is-active");
          elem.attr("data-curr", elemSpanCurrText);
          elemSpanContainer.text(elemDataAttr);
          certContainer.slideDown("300").addClass("is-animated");
        }

        var swiperVar = "descCertSwiper".concat(elemIdx),
          swiperContainer = '.description__row-' + elemIdx + ' .desc-slideCert-js',
          btnPrevName = ".description__row-" + elemIdx + " .descCert__button-prev",
          btnNextName = ".description__row-" + elemIdx + " .descCert__button-next";

        swiperVar = new Swiper(
          swiperContainer,
          swiperOptionSlide("4", btnNextName, btnPrevName)
        );
      });
    }

    descCertBtn();
  }


  //////////
  // MODALS
  //////////

  function initPopups() {
    var startWindowScroll = 0;

    $('[playVideo-js]').magnificPopup({
      type: 'iframe',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: false,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=', // String that splits URL in a two parts, second part should be %id%
          src: '//www.youtube.com/embed/%id%?autoplay=1&controls=0&showinfo=0' // URL that will be set as a source for iframe.
        }
      }
    });
  }

  function closeMfp() {
    $.magnificPopup.close();
  }


  // Masked input
  function initMasks() {
    $("[js-dateMask]").mask("99.99.99", {placeholder: "ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor() {
    $('.wow').each(function (i, el) {

      var elWatcher = scrollMonitor.create($(el));

      var delay;
      if ($(window).width() < 768) {
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp";

      var animationName = $(el).data('animation-name') || "wowFade";

      elWatcher.enterViewport(throttle(function () {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
    });

  }

  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      var deferred = Barba.Utils.deferred();

      anime({
        targets: this.oldContainer,
        opacity: .5,
        easing: easingSwing, // swing
        duration: 300,
        complete: function (anim) {
          deferred.resolve();
        }
      })

      return deferred.promise
    },

    fadeIn: function () {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: .5
      });

      anime({
        targets: "html, body",
        scrollTop: 5,
        easing: easingSwing, // swing
        duration: 150
      });

      anime({
        targets: this.newContainer,
        opacity: 1,
        easing: easingSwing, // swing
        duration: 300,
        complete: function (anim) {
          triggerBody();
          _this.done();
        }
      });
    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {

    pageReady();
    closeMobileMenu();

  });

  // some plugins get bindings onNewPage only that way
  function triggerBody() {
    $(window).scroll();
    $(window).resize();

    initScrollMonitor();
  }


  function initValidations(){
    ////////////////
    // FORM VALIDATIONS
    ////////////////

    // jQuery validate plugin
    // https://jqueryvalidation.org


    // GENERIC FUNCTIONS
    ////////////////////

    var validateErrorPlacement = function(error, element) {
      error.addClass('ui-input__validation');
      error.appendTo(element.parent("div"));
    }
    var validateHighlight = function(element) {
      $(element).parent('div').addClass("has-error").removeClass("has-done");
    }
    var validateUnhighlight = function(element) {
      $(element).parent('div').removeClass("has-error").addClass("has-done");
    }
    var validateSubmitHandler = function(form) {
      $(form).addClass('loading');
      $.ajax({
        type: "POST",
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass('loading');
          var data = $.parseJSON(response);
          if (data.status == 'success') {
            // do something I can't test
          } else {
              $(form).find('[data-error]').html(data.message).show();
          }
        }
      });
    }

    var validatePhone = {
      required: true,
      normalizer: function(value) {
          var PHONE_MASK = '+X (XXX) XXX-XXXX';
          if (!value || value === PHONE_MASK) {
              return value;
          } else {
              return value.replace(/[^\d]/g, '');
          }
      },
      minlength: 11,
      digits: true
    }

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    $(".post__form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        name: "required",
        subject: "required",
        message: "required",
        email: {
          required: true,
          email: true
        },
        phone: validatePhone
      },
      messages: {
        name: "Заполните это поле",
        subject: "Заполните это поле",
        message: "Заполните это поле",
        email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
        },
        phone: {
          required: "Заполните это поле",
          minlength: "Введите корректный телефон"
        }
      }
    });
    $(".quick__form form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        quick_name: "required",
        quick_phone: validatePhone
      },
      messages: {
        quick_name: "Заполните это поле",
        quick_phone: {
          required: "Заполните это поле",
          minlength: "Введите корректный телефон"
        }
      }
    });
  }
});
