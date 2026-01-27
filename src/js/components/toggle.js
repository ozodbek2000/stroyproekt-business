import $ from "jquery";

const toggle = () => {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
        $("header").toggleClass("border");
        $("body").toggleClass("lock");
        $(".popup__box").removeClass("active");
        $(".overlay").toggleClass("active green");

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
        $(".menu").removeClass("active");
        $("header").removeClass("border");
        $(".header__burger").removeClass("active");
        
        if ($('.overlay').hasClass('green')) {
            $('.overlay').removeClass('green');
        }
        if ($('.overlay').hasClass('black')) {
            $('.overlay').removeClass('black');
        }

        if (!$(".menu").hasClass("active")) {
            $("body").removeClass("lock");
        }
    });
    $(".choose, .cta__box").click(function (event) {
        $(".overlay").addClass("active black");
        $(".popup__box").addClass("active");
        $("body").addClass("lock");
        $("header").addClass("bg");
        $(".header__burger").removeClass("active");
        $(".menu").removeClass("active");
        if ($(window).width() < 768) {
            $("header").addClass("active");
        }
    });
};

export default toggle;
