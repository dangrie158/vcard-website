"use strict";

let navItems = $('.nav-item');
let pages = $('article');

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

    // scroll the page
    let clickedIndex = navItems.index(clickedElement);
    let offsetX = $(pages[clickedIndex]).position().left;
    let offsetY = $(pages[clickedIndex]).position().top + ($('nav').height() - $('#navbarToggler').height());
    pages.css('left', "-=" + offsetX);

    //animate to the new offset
    $('html, body').animate({ scrollTop: offsetY + 'px'});

    //stop the event otherwise bootstrap code will scroll to the top
    $('#navbarToggler').one('hide.bs.collapse', (event) => {
        event.stopPropagation();
        event.preventDefault();

        //manually hide the navigation
        $('#navbarToggler').collapse('hide');
    });
});
