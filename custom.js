(function ($, Drupal) {
    Drupal.behaviors.slickCarousel = {
      attach: function (context, settings) {
        // Initialize Slick carousel with responsive settings
        $('.slick-carousel', context).each(function () {
          if (!$(this).hasClass('slick-initialized')) {
            $(this).slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              arrows: true,
              infinite: true,
              speed: 500,
  
              // Responsive settings
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
          }
        });
      }
    };
})(jQuery, Drupal);
  