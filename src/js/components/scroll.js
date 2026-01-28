import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const scroll = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Создание плавного скролла
    const smoother = ScrollSmoother.create({
        wrapper: "#scrollsmoother-wrapper",
        content: "#scrollsmoother-container",
        smooth: 3,
        effects: true,
        smoothTouch: 0.1,
    });
    
    // Обработка якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Игнорируем пустые якори
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Используем ScrollSmoother для плавной прокрутки к элементу
                smoother.scrollTo(target, true, "top top");
            }
        });
    });
    
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                smoother.scrollTo(target, false, "top top");
            }, 100);
        }
    }
    
    return smoother;
};

export default scroll;