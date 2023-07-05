$(document).ready(function () {
    $('.top-10-category').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='bi bi-arrow-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='bi bi-arrow-right'></i></button>"
    });
});




document.getElementById('top-10-trend').addEventListener('click', () => {
    document.getElementById('top-10-trend').style.color = "#198754"
    document.getElementById('top-10-new').style.color = "#6bca8a"
    document.getElementById("scroll-style-trend").style.display = "block"
    document.getElementById("scroll-style-new").style.display = "none"
})

document.getElementById('top-10-new').addEventListener('click', () => {
    document.getElementById('top-10-new').style.color = "#198754"
    document.getElementById('top-10-trend').style.color = "#6bca8a"
    document.getElementById("scroll-style-new").style.display = "block"
    document.getElementById("scroll-style-trend").style.display = "none"
})





