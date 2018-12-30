$(document).ready(function () {
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      dots: false
      , nav: true
      , navElement: 'button class="slide__btn"'
      , navText: ['<span></span>', '<span></span>']
      , responsive: {
        0: {
          items: 1
          , nav: true
        }
        , 770: {
          items: 3
          , nav: true
        }
        , 1200: {
          items: 4
          , nav: true
        , }
      }
      , autoplay: true
      , autoplayHoverPause: true
      , autoplaySpeed: 5000
      , smartSpeed: 750
    });
  };
  
  
  if ($(".date__list").length) {
    $(".date__list").owlCarousel({
      nav: true
      , navElement: 'button class="slide__btn"'
      , navText: ['<span></span>', '<span></span>']
      , dots: false
      , responsive: {
        0: {
          items: 3
        }
        , 500: {
          items: 5
        }
        , 1200: {
          items: 8
        }
      }
    });
    $(document).on('click', '.date__item', function (e) {
      e.preventDefault();
    })
  }
  /*menu*/
  var burger = $('.menu__btn')
    , menu = $('.menu__wrapper');
  burger.on('click', function () {
    if (menu.hasClass('active')) {
      burger.removeClass('active');
      menu.removeClass('active');
    }
    else {
      burger.addClass('active');
      menu.addClass('active');
    }
  })
  if (window.innerWidth > 770) {
    var cart = $('.menu').find('.cart')
      , socials = $('.menu').find('.social__btn');
    $('.menu__wrapper').prepend($(cart));
    $('.menu__wrapper').append($(socials));
    cart.html();
    socials.html();
  }
  if (window.innerWidth > 700) {
    var productHeader = $('.product__header');
    $('.product__section.catalog__slider').find('.desc').prepend(productHeader);
  }
  if (window.innerWidth > 750 && $('.field--textarea').length) {
    var label = $('.field--textarea').find('label')
      , textarea = $('.field--textarea').find('textarea');
    textarea.css('text-indent', label.width() + 20);
  };
  $('.call_to_action').find('.title').html(window.innerWidth > 770 ? `<span>Стань частью содружества <img src="img/logo.svg" alt="" class="action__logo">. Запишись сейчас!</span>` : `<img src="img/logo.svg" alt="" class="action__logo"><span>Стань частью содружества. <br/> Запишись сейчас!</span>`)
    /*dropdown*/
  $('.caret').on('click', function () {
    var parent = $(this).closest('.dropdown')
      , items = parent.find('.dropdown__item').map((index, el) => ({...el, id: index
      }));
    if (parent.hasClass('open')) {
      return parent.removeClass('open');
    }
    parent.addClass('open');
    items.on('click', function () {
      items.removeClass('active');
      $(this).addClass('active');
      parent.removeClass('open');
      parent.find('.dropdown__list').append(items.sort((a, b) => a.id - b.id).sort(el => $(el).hasClass('active') ? -1 : 1));
    })
  });

  function fixedHeader() {
    window.scrollY > $('header').height() ? $('header').addClass('fixed') : $('header').removeClass('fixed')
  }
  window.addEventListener("scroll", fixedHeader);
  /*tab function*/
  function tabInit(parent) {
    var closest = $(parent).closest('.tabs')
      , header = $(parent).find('.tabs__header')
      , titles = header.find('.tabs__btn')
      , content = $(parent).find('.tabs__content').find('.tab')
      , sum = Array.from($(titles)).reduce((ac, el) => ac += $(el).width(), 0);
    if (!titles.hasClass('active')) {
      $(titles[0]).addClass('active');
      $(content[0]).addClass('active');
    }
    $(titles).on('click', function () {
      content.removeClass('active');
      titles.removeClass('active');
      var btn = $(this)[0];
      var activeTab = content.filter((index, el) => $(el)[0].dataset.type === btn.dataset.type)[0];
      $(activeTab).addClass('active');
      $(this).addClass('active');
      if (header.width() < sum) {
        header.removeClass('open');
        header.append(titles.sort(el => $(el).hasClass('active') ? -1 : 1));
      }
    })
    if (header.width() < sum) {
      header.append('<button class="tabs__dropdown"><span></span></button>');
      closest.addClass('mobile');
      $(parent).on('click', '.tabs__dropdown', function () {
        var tabsHeader = $(this).parent('.tabs__header');
        tabsHeader.hasClass('open') ? tabsHeader.removeClass('open') : tabsHeader.addClass('open');
      })
    }
  }
  /*maps*/
  if (window.location.pathname.indexOf('salons') > 0) {
    var mapArr = $('.salons__map');
    var addressArray = [
      {
        id: 'map-vlad'
        , coord: '43.1147008,131.9121172'
        , name: ''
      }
      , {
        id: 'map-hab'
        , coord: '43.1147008,131.9121172'
        , name: ''
      }
      , {
        id: 'map-blag'
        , coord: '43.1147008,131.9121172'
        , name: ''
      }
      , {
        id: 'map-moscow'
        , coord: '43.1147008,131.9121172'
        , name: ''
      }
    , ]
    mapArr.map((index, el) => {
      mapInit(el.id, el.coord);
    });
  };

  function mapInit(id, coord) {
    var myOptions = {
      center: new google.maps.LatLng(coord)
      , zoom: 18
      , mapTypeId: google.maps.MapTypeId.ROADMAP
      , disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById(id), myOptions);
    console.log(document.getElementById(id));
  }
  
  
  /*init tabs*/
  tabInit('.tabs');
  
  
  /*counter*/
  if ($('.counter').length) {
    var add = $('.counter').find('.add')
      , ded = $('.counter').find('.ded')
      , count = $('.counter').find('.count')[0]
      , value = $('.qty').val();
    $(count).text(value);
    add.on('click', function () {
      value = +value + 1;
      $('.qty').val(value);
      $(count).text(value);
      console.log($('.qty').val());
    })
    ded.on('click', function () {
      value = value > 1 ? value - 1 : 1;
      $('.qty').val(value);
      $(count).text(value);
    })
  }
  
  
  /*modals*/
  function closeModal() {
    $('body').removeClass('modal-open');
    $(this).closest('.modal').removeClass('open');
  }
  $(document).on('click', function (e) {
    if ($(e.target).closest('.overlay').length > 0 && $(e.target).closest('.modal .content').length === 0) {
      closeModal();
    };
  })
  $('.close-modal').on('click', closeModal);
  $('.open-terms').on('click', function (e) {
    e.preventDefault();
    $('body').addClass('modal-open');
    $('.modal').addClass('open');
  })
  $('#modal-request').on('submit', function (e) {
      e.preventDefault();
      $(this).addClass('sent');
    })
  
  
    /*traspilate blog items matrix*/
  if ($('.blog__other').length > 0) {
    var blogList = $('.tab.active .blog__other').find('.other__item');
    blogList = blogList.map((i, el) => ({...$(el), id: i
    })).sort((a, b) => a.id % 3 - b.id % 3);
    $('.tab.active .blog__other').html(blogList.map((i, el) => $(el)[0]));
  }
  
  
  /*volume change*/
  if ($('.variations').length > 0) {
    var volumeSelect = $('.variations #pa_obem')[0];
    var price = $('.price__form').find('.woocommerce-Price-amount')[0];
    var visiblePrice = $('.price__wrapper>.price>.woocommerce-Price-amount')[0];
    var options = Array.from(volumeSelect.options).slice(1, );
    var controls = $('.product__control .volume');
    options.forEach((el, index) => {
      var volume = el.value.split('-')[0];
      controls.append(`<span class="volume__item" data-volume='${el.value}'>${volume} мл</span>`)
    })
    $(document).on('click', '.volume__item', function (e) {
      $(this).siblings('.volume__item').removeClass('active');
      $(this).addClass('active');
      console.log(price);
      $(visiblePrice).html($(price).innerHTML);
    });
  }
})