import $ from "jquery";


$(document).ready(function () {
    $(".header__theme").click(function (event) {
        $("body").toggleClass("light");
    });
    $(".header__arrow").click(function (event) {
        $(".header__nav").toggleClass("active");
    });
});