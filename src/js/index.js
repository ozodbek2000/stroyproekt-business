import $ from "jquery";
import animateTitle from "./components/bg-animate";
import number from "./components/number";
import header from "./components/header";
import facadeSwiper from "./components/facade-swiper";
import gsapSwipe from "./components/gsap-swipe";
import toggle from "./components/toggle";
import gsapText from "./components/gsap-text";
import gsapAnimate from "./components/gsap-animate";
import designItem from "./components/design-item";
import scroll from "./components/scroll";
import targetBg from "./components/target-bg";

$(document).ready(function () {
    toggle();
    gsapSwipe();
    facadeSwiper();
    header();
    number();
    animateTitle();
    gsapText();
    gsapAnimate();
    designItem();
    scroll();
    targetBg();
});
