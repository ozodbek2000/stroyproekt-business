import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const scroll = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Создание плавного скролла
    const smoother = ScrollSmoother.create({
        wrapper: "#scrollsmoother-wrapper",
        content: "#scrollsmoother-container",
        smooth: 3, // Уменьшил для более отзывчивого скролла
        effects: true,
        smoothTouch: 0.1,
    });
    
    return smoother;
};

export default scroll;