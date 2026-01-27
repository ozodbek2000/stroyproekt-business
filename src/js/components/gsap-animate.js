import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gsapAnimate = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Функция для анимации элементов с классом "animate-in"
    function initAnimations() {
        document.querySelectorAll('.animate-in').forEach((container) => {
            // Фильтруем только элементы (исключаем текстовые узлы, <br>, комментарии)
            const children = Array.from(container.children).filter(child => {
                const tagName = child.tagName.toLowerCase();
                return tagName !== 'br' && 
                       tagName !== 'script' && 
                       tagName !== 'style' &&
                       child.nodeType === 1;
            });
            
            // Если есть дочерние элементы - анимируем их
            if (children.length > 0) {
                // Исключаем дочерние элементы, которые сами имеют класс animate-in
                const childrenToAnimate = children.filter(child => {
                    return !child.classList.contains('animate-in');
                });
                
                // Если есть что анимировать
                if (childrenToAnimate.length > 0) {
                    gsap.fromTo(childrenToAnimate, 
                        {
                            opacity: 0,
                            y: 30,
                            clearProps: "transform,translate,rotate,scale" // Очищаем конфликтующие свойства
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power2.out",
                            clearProps: "transform,translate,rotate,scale", // Очищаем после анимации
                            scrollTrigger: {
                                trigger: container,
                                start: "top 80%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                }
            } else {
                // Если нет дочерних - анимируем сам контейнер
                gsap.fromTo(container,
                    {
                        opacity: 0,
                        y: 30,
                        clearProps: "transform,translate,rotate,scale"
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        clearProps: "transform,translate,rotate,scale",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        });
    }

    // Запускаем сразу
    initAnimations();
};

export default gsapAnimate;