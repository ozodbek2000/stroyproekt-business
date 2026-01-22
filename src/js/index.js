import $ from "jquery";
import animateTitle from "./components/bg-animate";
import number from "./components/number";
import header from "./components/header";
import facadeSwiper from "./components/facade-swiper";
import gsapSwipe from "./components/gsap-swipe";
import toggle from "./components/toggle";
import gsapText from "./components/gsap-text";

$(document).ready(function () {
    toggle();
    gsapSwipe();
    facadeSwiper();
    header();
    number();
    animateTitle();
    gsapText()
});
