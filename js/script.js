"use strict";

let navItems = $('.nav-item');
let pages = $('article');

// start with the home page
let currentPage = 0;

navItems.on('click', (event) => {
    let clickedElement = $(event.currentTarget);

    // move the nav slider over the clicked element
    let newSliderX = clickedElement.position().left;
    $('.nav-slider').css({left: newSliderX+'px'});

    // set the active nav element class
    navItems.removeClass('active');
    clickedElement.addClass('active');

    let sidebar = $('.sidebar');
    if(clickedElement.text().trim() == 'Home') {
        // if the home icon was clicked hide the sidebar image
        sidebar.removeClass('profile-img');
    }else{
        // for any other element make sure the profile picture is visible
        sidebar.addClass('profile-img');
    }

    let clickedIndex = navItems.index(clickedElement);
    currentPage = clickedIndex;
    
    //stop the event otherwise bootstrap code will scroll to the top
    $('#navbarToggler').one('hide.bs.collapse', (event) => {
        event.stopPropagation();
        event.preventDefault();

        //manually hide the navigation
        $('#navbarToggler').collapse('hide');
    });

    scrollToPage(clickedIndex, true);
});

function scrollToPage(pageIndex, animate) {
    let offsetX = $(pages[pageIndex]).position().left;
    let offsetY = $(pages[pageIndex]).position().top + ($('nav').height() - $('#navbarToggler').height());

    // scroll the page horizontally
    if(!animate){
        pages.addClass('notransition');
    }
    
    pages.css('left', "-=" + offsetX);

    if(!animate){
        pages.removeClass('notransition');
    }

    //animate to the new offset vertically
    $('html, body').stop();
    if(animate){
        $('html, body').animate({ scrollTop: offsetY + 'px'});
    }else{
        $('html, body').css({ scrollTop: offsetY + 'px'});
    }
}

$( window ).resize(function() {
    scrollToPage(currentPage);
});