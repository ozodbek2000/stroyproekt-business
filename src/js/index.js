import $ from "jquery";
import Swiper from "swiper/bundle";
import animateTitle from "./components/bg-animate";
import number from "./components/number";
import header from "./components/header";
import facadeSwiper from "./components/facade-swiper";

$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
        $("header").toggleClass("border");
        $("body").toggleClass("lock");

        if ($(".menu").hasClass("active")) {
            $("header").data("had-bg", $("header").hasClass("bg"));
            $("header").removeClass("bg");
        } else {
            if ($("header").data("had-bg")) {
                $("header").addClass("bg");
            }
        }
    });
    $(".popup__close, .overlay").click(function (event) {
        $(".overlay").removeClass("active");
        $(".popup__box").removeClass("active");
        $("body").removeClass("lock");
    });
    $(".choose, .cta__box").click(function (event) {
        $(".overlay").addClass("active");
        $(".popup__box").addClass("active");
        $("body").toggleClass("lock");
        if ($(window).width() < 768) {
            $("header").addClass("active");
        }
    });

    facadeSwiper();
    header();
    number();
    animateTitle();
});
