
(() => {
  $.fn.isInViewport = function (height) {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + (typeof height !== 'undefined' ? height : $(this).outerHeight());

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop +  $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(() => {
    console.info('>> Hall: Start page');

    let isHeaderVisible = true;

    $(window).on('resize scroll', function () {
      const isVisible =  $('#header').isInViewport(25);
      if (isHeaderVisible !== isVisible) {
        isHeaderVisible = isVisible;
        if (isVisible) {
          $('#navbar').removeClass('sticky');
          $('#body').removeClass('sticky');
        } else {
          $('#navbar').addClass('sticky');
          $('#body').addClass('sticky');
        }
      };
    })
  });

})();

