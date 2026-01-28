import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gsapSwipe = () => {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray(".solution__slide");
    const slidesCount = sections.length;

    const slider = document.querySelector(".solution__slider");
    const solutionWrapper = document.querySelector(".solution");
    
    // Создаём контейнер для статичного последнего слайда
    const staticSlideContainer = document.createElement("div");
    staticSlideContainer.className = "solution__static-slide";
    staticSlideContainer.style.display = "none";
    staticSlideContainer.innerHTML = sections[sections.length - 1].innerHTML;
    solutionWrapper.appendChild(staticSlideContainer);
    
    // Устанавливаем position: relative для slider
    slider.style.position = "relative";
    slider.style.width = "100%";
    slider.style.height = "100vh";

    // Устанавливаем начальные позиции для всех слайдов
    sections.forEach((section, i) => {
        section.style.position = "absolute";
        section.style.top = "0";
        section.style.left = "0";
        section.style.width = "100%";
        section.style.height = "100%";
        
        gsap.set(section, {
            xPercent: i === 0 ? 0 : 100,
            zIndex: i
        });
    });

    const scrollLength = slidesCount * 300 + (slidesCount - 1) * 1000;

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".solution__slider",
            pin: ".solution",
            pinSpacing: true,
            scrub: 6,
            end: `+=${scrollLength}`,
            onLeaveBack: () => {
                // Если скроллим назад, показываем слайдер
                slider.style.display = "block";
                staticSlideContainer.style.display = "none";
            },
            onEnter: () => {
                slider.style.display = "block";
                staticSlideContainer.style.display = "none";
            }
        },
    });

    // Начальная пауза для первого слайда
    tl.to({}, { duration: 0.3 });

    // Анимация для каждого следующего слайда
    for (let i = 1; i < sections.length; i++) {
        tl.to(sections[i], {
            xPercent: 0,
            ease: "none",
            duration: 1,
        }).to({}, { duration: 0.3 });
    }
    
    // Добавляем финальный колбэк в конец таймлайна
    tl.call(() => {
        // Скрываем слайдер
        slider.style.display = "none";
        // Показываем статичный слайд
        staticSlideContainer.style.display = "block";
    });
};

export default gsapSwipe;