// JavaScript Document

$(document).ready(function() {
    var nav = document.getElementById('nav');
    window.onscroll = function() {
        if (window.pageYOffset > 9 && screen.width >= 992) {
            nav.style.zIndex = 999999999999999;

        }
    };

    new WOW().init();

    if ($(window).width() <= 992) {
        //$('#productsContainer').addClass('row')
        $('.footer-ul-container').addClass('col-lg-4 col-sm-6 col-xs-12')
        $('.footer-logo').addClass('col-lg-4 col-sm-6 col-xs-12')
    } else {
        //$('#productsContainer').removeClass('row')
        $('.footer-ul-container').removeClass('col-lg-4 col-sm-6 col-xs-12')
        $('.footer-logo').removeClass('col-lg-4 col-sm-6 col-xs-12')
    }
    $('nav ul li').click(function() {
        $('nav ul li.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.dropdown-item').click(function() {
        $(this).parents('.dropdown').children('.btn').html($(this).html());
    });


    $('.menu-btn').click(function() {
        $('.side-menu').toggleClass('on');
    });

    $('.close-menu').click(function() {
        $('.side-menu').removeClass('on');
    });
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}