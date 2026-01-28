import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const targetBg = () => {
    if (window.innerWidth <= 767) return;

    gsap.registerPlugin(ScrollTrigger);

    // Создаем главную timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".target",
            start: "top top",
            end: "+=300%", // Увеличил длину для более плавной анимации
            scrub: 1,
            pin: ".target__animation-container",
            pinSpacing: true,
            anticipatePin: 1,
        },
    });

    // 1. Расширение изображения (0% - 60% прогресса)
    tl.to(
        ".target__expanded-bg",
        {
            width: "100%",
            height: "100%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0px",
            duration: 0.6,
            ease: "none",
            filter: "brightness(0.5)",
        },
        0
    );

    // 2. Затемнение изображения (60% - 70% прогресса)
    tl.to(
        ".target__expanded-bg",
        {
            filter: "brightness(1)",
            duration: 0.1,
            ease: "none",
        },
        0.6
    );

    // 3. ПОЯВЛЕНИЕ контента ПОСЛЕ полного расширения (70% - 100% прогресса)
    tl.fromTo(
        ".target__container",
        {
            opacity: 0,
            visibility: "hidden",
            y: 30,
        },
        {
            opacity: 1,
            visibility: "visible",
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        },
        0.7
    );

    // Обработка ресайза
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
};

export default targetBg;