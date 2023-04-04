
function openNav() {
    document.getElementById("menu-nav").style.height = "100%";
    document.querySelector("body").style.overflow = "hidden";
  }

  function closeNav() {
    document.getElementById("menu-nav").style.height = "0%";
    document.querySelector("body").style.overflow = "auto";
  }

  $('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;
    
    function move(newIndex) {
      var animateLeft, slideLeft, slideOpacity, animateOpacity;
      
      advance();
      
      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }
      
      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');
      
      if (newIndex > currentIndex) {
        // slideLeft = '100%';
        // animateLeft = '-100%';

      } else {
        // slideLeft = '-100%';
        // animateLeft = '100%';
      }
      
      $slides.eq(newIndex).css({
        display: 'block',
      });
      $group.animate({
        // left: animateLeft,
        opacity: '0%'
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none',
          opacity: '0%'
         
        });
        $slides.eq(newIndex).css({
          opacity: '100%'
        });
        $group.css({
          opacity: '100%'
        });
        currentIndex = newIndex;
      });
    }
    
    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 6000);
    }
    
    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });
    
    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });
    
    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');
      
      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
    
    advance();
  });

// $('.cube').each(function() {
//     const fadeIn = [ {opacity:'100%'},{opacity:'0%'}]
//     const timer = {
//         duration:6000,
//         iterations:Infinity
//     }
//     this.animate(fadeIn,timer);
// })