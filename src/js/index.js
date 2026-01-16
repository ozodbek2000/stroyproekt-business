import $ from "jquery";
import animateTitle from "./components/bg-animate";

$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
        $("header").toggleClass("border");
        $('body').toggleClass('lock');

        if ($(".menu").hasClass("active")) {
            $("header").data("had-bg", $("header").hasClass("bg"));
            $("header").removeClass("bg");
        } else {
            if ($("header").data("had-bg")) {
                $("header").addClass("bg");
            }
        }
    });
    animateTitle();
    $(document).ready(function () {
        var header = $("header");
        var lastScrollTop = 0;

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > 0) {
                header.addClass("bg");
            } else {
                header.removeClass("bg");
            }

            if (scrollTop > lastScrollTop) {
                header.removeClass("active");
            } else {
                header.addClass("active");
            }

            lastScrollTop = scrollTop;
        });
    });
});
