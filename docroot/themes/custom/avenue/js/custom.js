(function ($, Drupal) {


var slug = function(str) {
    var $slug = '';
    var trimmed = $.trim(str);
    $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return $slug.toLowerCase();
}

  $(document).ready(function(){
              //hide empty paragraphs
              $('p').each(function(){
                  if ($(this).is(':empty')){
                    $(this).hide();
                  }
                  if($(this).html() == "&nbsp;"){
                    $(this).hide();
                  }
              });


              //move the hero on the hompage
              $('.com-hero').parents('.field__item').once('hero-move').insertAfter('#highlighted');
              $('.com-hero').show();
              if(! $('.page-node-type-landing-page').not('.path-frontpage').find('.com-hero').html() == ""){
                $("#main > .container").css('padding-top','0px');
              }
              $('.field--name-field-page-component > .field__item').each(function(){
                if($(this).html == ""){
                  $(this).remove();
                }
              });

              //center hero image
              var imgWidth = $('.field--name-field-slide-image img').width();

                var imgMargin = ($(window).width()-imgWidth)/2;
                  //alert(imgWidth);

            if($(window).width() <= imgWidth){
                $('.field--name-field-slide-image img').css('margin-left',imgMargin);
              } else
              {
                $('.field--name-field-slide-image img').css('margin-left','auto');
              }



              $(window).resize(function(){
                  var imgWidth = $('.field--name-field-slide-image img').width();
                  var imgMargin = ($(window).width()-imgWidth)/2;

                  if($(window).width() <= imgWidth){

                      $('.field--name-field-slide-image img').css('margin-left',imgMargin);
                    } else
                    {
                      $('.field--name-field-slide-image img').css('margin-left','auto');
                    }


              });


              $('.twitter').once('clean').each(function(){
                $(this).find('.views-field-title h3 a').attr('href','#');
                $(this).children('.views-field-view-node').remove();

              });

              $(".com-2-column-image-and-text").once('clean').each(function(){
                var col = $(this).find(".right-column");
                var wrap = $(this).find(".image-wrap");
                wrap.insertBefore(col);
              });

              $('.view-events .views-field-field-datetime').once('events-date').click(function(){
                var link = $(this).siblings('.views-field-title').find('a').attr('href');
                window.location.href = link;
              });

              //mobile menu
              $("#block-mobilemenucontainer").hide();

              //get directions
              $("#block-getdirections").appendTo('#hero');
              $("#mobile-menu").append($("#rooftop .region-rooftop").html());
                $("#mobile-menu").append($("#navigation .region-navigation").html());
              $("#menu-toggle").click(function(e){
                e.preventDefault();
                $(this).toggleClass('active');
                //$(".block-menu").toggle();
                $("#block-mobilemenucontainer").css('height',($(window).height()+100));
                $("#block-mobilemenucontainer").toggle();

              });

              $('.com-text-with-title-and-expandable').append('<a href="#" class="more-expand grey-text">More </a>');

              $('.more-expand').click(function(e){
                  e.preventDefault();
                  if(!$(this).hasClass('expanded')){
                    $(this).addClass('expanded');
                    $(this).siblings().find('.field--name-field-body').show();
                    $(this).html('Less');
                  } else {
                    $(this).siblings().find('.field--name-field-body').hide();
                    $(this).html('More');
                      $(this).removeClass('expanded');
                  }
              });

              //add content link on article block
              $('.com-component-grid .com-article-teaser-block').each(function(){
                var url = $(this).find('.node__links a').attr('href');
                $(this).find('.field--name-title').click(function(){
                  window.location.href = url;
                });
              });


              //move pager on news all page
              var pager = $(".node--id-22 .pager");
              pager.once('pagermove').insertAfter('.grid');


                //create sidebar menu
                PageTitle = $('#block-avenue-page-title h1 span').html();
                MenuParentTitle = $('.content .block-menu.navigation h2').html();
                if(MenuParentTitle && MenuParentTitle != PageTitle){
                  $('#block-avenue-page-title h1 span').html(MenuParentTitle);
                    var pageClass = slug(MenuParentTitle);
                    $('#block-avenue-content').addClass(pageClass);
                } else {
                    var pageClass = slug(PageTitle);
                    $('#block-avenue-content').addClass(pageClass);
                }
                $("#block-avenue-page-title").show();


                  //set category based color for events
                  $('.views-field-field-event-category .field-content').each(function(){
                    if($(this).html() == "Planning Meeting"){
                      $(this).closest('.views-row').addClass('master-planning');
                    }

                  });

                    //Search Funcationality
                    var $roofmenu = $(".menu--rooftop ul.menu");
                    $roofmenu.find('li:nth-last-of-type(2) a').html('<i class="fa fa-search" aria-hidden="true"></i>').attr('id','search-toggle');
                    $("#search-toggle").click(function (e) {
                      e.preventDefault();
                      $("#block-searchfield").fadeIn();
                      $("#search-results").css('height',($(window).height() - 105)).fadeIn();
                    });
                    // Search Funcationality Mobile
                    var $navmenu = $("#block-mobilemenucontainer .menu--rooftop ul.menu");
                    $navmenu.find('li:nth-last-of-type(2) a').html('<i class="fa fa-search" aria-hidden="true"></i>').attr('id','search-toggle2');
                    $("#search-toggle2").click(function(e){
                        e.preventDefault();
                        $("#block-searchfield").toggle();
                    });

                    $("#search-input").keyup(function(){
                      $("#edit-keys").val($("#search-input").val());
                    });
                    $("#search-submit").click(function(e){
                      e.preventDefault();
                      $('#search-block-form').submit();
                    });
                    $(".component, .content, #search-close").click(function(){
                      $("#block-searchfield, #search-results").hide();
                    })

                    //initiate the calendar

                     $('.com-calendar').fullCalendar({
                        eventSources: [
                            // your event source
                            {
                                url: '/events_json', // use the `url` property
                            }],
                        eventClick: function(event) {
                            if (event.url) {
                                window.open(event.url);
                                return false;
                            }
                        }
                    });

                    $('.views-element-container .view-events table td').click(function(){
                      window.location = $(this).siblings('.views-field-title').find('a').attr('href');

                    });



                    $('.node--id-22 .grid .donation').insertAfter('.node--id-22 .grid .article:nth-child(4)').css('display','inline-block');


                        var cat = $('.page-node-type-event .taxonomy-term h2 .field__item').html();
                        var cat = $.trim(cat);
                        if(cat == "Planning"){
                          $('body').addClass('master-planning');
                        }


                        $('.com-text-block').each(function(){
                          var title = $(this).find('.field--name-title');
                          var morelink = $(this).find('.field--name-field-more-link');
                          var visibleTitle = $(this).find('.field--name-field-title-visible div').html();
                          visibleTitle = $.trim(visibleTitle);

                          if(visibleTitle == "1"){

                            title.hide();
                            morelink.hide();
                          }
                        });


                    //responsive google maps
                    function initialize() {
                			var myLatlng = new google.maps.LatLng(35.7687789,-78.6640673);
                			var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png'
                			var mapOptions = {
                				zoom: 11,
                				center: myLatlng,
                				mapTypeId: google.maps.MapTypeId.ROADMAP
                			}

                		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                		//Callout Content
                		var contentString = 'Some address here..';
                		//Set window width + content
                		var infowindow = new google.maps.InfoWindow({
                			content: contentString,
                			maxWidth: 500
                		});

                		//Add Marker
                		var marker = new google.maps.Marker({
                			position: myLatlng,
                			map: map,
                			icon: imagePath,
                			title: 'image title'
                		});

                		google.maps.event.addListener(marker, 'click', function() {
                			infowindow.open(map,marker);
                		});

                		//Resize Function
                		google.maps.event.addDomListener(window, "resize", function() {
                			var center = map.getCenter();
                			google.maps.event.trigger(map, "resize");
                			map.setCenter(center);
                		});
                	}

                	google.maps.event.addDomListener(window, 'load', initialize);

                  $('#block-googlemap').parents('#hero .container').css('height','auto');


  });


  // Drupal.behaviors.InfinteScrollMasonry = {
  //   attach: function (context, settings) {
  //       var $comview =  $('.path-frontpage .com-view-grid .grid');
  //       var $context = $(context);
  //
  //         $('.com-component-grid .grid').masonry({
  //           itemSelector: '.component',
  //           columnWidth: '.grid .component',
  //           gutter: '.spacer'
  //         });
  //
  //         $comview.once('mason').masonry({
  //           itemSelector: '.views-row',
  //           columnWidth: '.grid .views-row',
  //           gutter: '.spacer'
  //         });
  //
  //
  //         //$comview.masonry('destroy');
  //
  //         var elems = $comview.masonry('getItemElements')
  //         console.log(elems);
  //         $comview.masonry('reloadItems');
  //
  //         $comview.masonry();
  //
  //
  //   }
  // };













})(jQuery, Drupal);
