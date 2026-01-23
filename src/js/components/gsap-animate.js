import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gsapAnimate = () => {
    gsap.registerPlugin(ScrollTrigger);

    function initAnimations() {
        document.querySelectorAll('.animate-in').forEach((container) => {
            const children = Array.from(container.children).filter(child => {
                const tagName = child.tagName.toLowerCase();
                return tagName !== 'br' && 
                       tagName !== 'script' && 
                       tagName !== 'style' &&
                       child.nodeType === 1; // Только элементы (не текстовые узлы)
            });
            
            if (children.length > 0) {
                gsap.from(children, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            } else {
                gsap.from(container, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });
    }

    initAnimations();
    
};

export default gsapAnimate;