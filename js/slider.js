
var $slider = $(".slider"),
  $bullets = $(".bullets");
var slideInterval;
var slidedelay = 7000;


$(document).ready(function() {

  if ($slider.length > 0) {

    $slider.find(".slide").first().addClass("active");
    $slider.find(".slide").first().nextAll().not(".bullets").addClass("inactive Right");
    
    function calculateHeight() {
      var height = $(".slide.active").outerHeight();
      height = (height < 400) ? 400 : 400;

      $slider.height(height);
    }

    $(window).resize(function() {
      // calculateHeight();
      clearTimeout($.data(this, 'resizeTimer'));
    });

    function resetSlides() {
      $(".slide.inactive").removeClass("inactive Left Right");
    }

    function gotoSlide($activeSlide, $slide, className) {

      $slide.prevAll().not(".bullets").removeClass("active inactive Left Right").addClass("inactive Left");
      $slide.nextAll().not(".bullets").removeClass("active inactive Left Right").addClass("inactive Right");
      $slide.removeClass("inactive Left Right").addClass("active");
      //calculateHeight();
      resetBullets();
      //setTimeout(resetSlides, 1000);
    }

    /*
    $(".next").on("click", function() {
      gotoNextSlide();
    });
    */

    $(".slider").on("mouseover", function() {
      clearInterval(slideInterval);
    });
    $(".slider").on("mouseleave", function() {
      slideInterval = setInterval(function() {
        gotoNextSlide()
      }, slidedelay);
    });



    function gotoNextSlide() {
      var $activeSlide = $(".slide.active"),
        $nextSlide = $activeSlide.next(".slide").length != 0 ? $activeSlide.next(".slide") : $(".slide").first();
      gotoSlide($activeSlide, $nextSlide, "Left");
    }
    /*
    $(".previous").on("click", function() {
      var $activeSlide = $(".slide.active"),
        $prevSlide = $activeSlide.prev(".slide").length != 0 ? $activeSlide.prev(".slide") : $(".slide").last();
        console.log($activeSlide.prev(".slide"))
      gotoSlide($activeSlide, $prevSlide, "Right");
    });
    */

    $(document).on("click", ".bullet", function() {
      if ($(this).hasClass("active")) {
        return;
      }
      var $activeSlide = $(".slide.active");
      var currentIndex = $activeSlide.index();
      var targetIndex = $(this).index();
      var $theSlide = $(".slide:nth-child(" + (targetIndex + 1) + ")");
      gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "Right" : "Left");
    })

    function addBullets() {
      var total = $(".slide").length,
        index = $(".slide.active").index();
      for (var i = 0; i < total; i++) {
        var $bullet = $("<div>").addClass("bullet");
        if (i == index) {
          $bullet.addClass("active");
        }
        $bullets.append($bullet);
      }
    }

    function resetBullets() {
      $(".bullet.active").removeClass("active");
      var index = $(".slide.active").index() + 1;
      $(".bullet:nth-child(" + index + ")").addClass("active");
    }
    addBullets();
    //calculateHeight();
    slideInterval = setInterval(function() {
      gotoNextSlide()
    }, slidedelay);

  }
});
