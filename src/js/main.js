$(document).ready(function(){

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
  }

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    initSliders();
    initScrollMonitor();
    initMasks();
    // initLazyLoad();

    hamburgerMenu();
    projectBlockBtn();
    initLightbox();
  }

  // this is a master function which should have all functionality
  pageReady();


  //////////
  // COMMON
  //////////


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	});


  // HAMBURGER TOGGLER
  function hamburgerMenu() {
    $("[hamburger-js]").on("click", function(e) {
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
    $(".project__block-btn").on("click", function(e) {
      var elem = $(e.currentTarget),
        imgContainer = elem.siblings(".project__block-img");

      elem.toggleClass("is-active");
      imgContainer.toggleClass("is-open");
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


  //////////
  // SLIDERS
  //////////

  function initSliders(){
    function swiperOption() {
      return {
        wrapperClass: "swiper-wrapper",
        slideClass: "swiper-slide",
        direction: 'horizontal',
        loop: true,
        watchOverflow: true,
        normalizeSlideIndex: true,
        grabCursor: false,
        freeMode: true,
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
            spaceBetween: 30
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

    var projectSwiper = new Swiper('.project-slide-js', swiperOptionSlide("auto", ".project__button-next", ".project__button-prev"));

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

        swiperName.on('slideChange', function() {
          current.text((swiperName.realIndex + 1) || 0);
        });
      }
    }
    changeCount(".free-slide-js", freeSwiper, "[free-count-js]", "[free-count-js]");
    changeCount(".around-slide-js", aroundSwiper, "[around-count-js]", "[around-count-js]");


    // DESCRIPTION CERT
    function descCertBtn() {
      $(".description__row-btn").on("click", function(e) {
        var elem = $(e.currentTarget),
          elemIdx = elem.attr("data-idx"),
          elemSpanContainer = elem.find("span"),
          elemSpanCurrText = elemSpanContainer.text(),
          elemDataAttr = elemSpanContainer.attr("data-txt");

        var parentContainer = elem.closest(".description__row-cert"),
          certContainer = parentContainer.find("[description__cert-js]");

        if(elem.hasClass("is-active")) {
          $(e.currentTarget).removeClass("is-active");
          elemSpanContainer.text(elem.attr("data-curr"));
          certContainer.removeClass("is-show");
        } else {
          $(e.currentTarget).addClass("is-active");
          elem.attr("data-curr", elemSpanCurrText);
          elemSpanContainer.text(elemDataAttr);
          certContainer.addClass("is-show");
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


  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      elWatcher.exitViewport(throttle(function() {
        $(el).removeClass(animationClass);
        $(el).css({
          'animation-name': 'none',
          'animation-delay': 0,
          'visibility': 'hidden'
        });
      }, 100));
    });

  }

  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var deferred = Barba.Utils.deferred();

      anime({
        targets: this.oldContainer,
        opacity : .5,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim){
          deferred.resolve();
        }
      })

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : .5
      });

      anime({
        targets: "html, body",
        scrollTop: 0,
        easing: easingSwing, // swing
        duration: 150
      });

      anime({
        targets: this.newContainer,
        opacity: 1,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim) {
          triggerBody();
          _this.done();
        }
      });
    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

    pageReady();
    closeMobileMenu();

  });

  // some plugins get bindings onNewPage only that way
  function triggerBody(){
    $(window).scroll();
    $(window).resize();
  }
});
