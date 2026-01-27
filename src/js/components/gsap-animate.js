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
                       child.nodeType === 1;
            });
            
            if (children.length > 0) {
                const childrenToAnimate = children.filter(child => {
                    return !child.classList.contains('animate-in');
                });
                
                if (childrenToAnimate.length > 0) {
                    gsap.set(childrenToAnimate, { opacity: 0, y: 30 });
                    
                    ScrollTrigger.create({
                        trigger: container,
                        start: "top 95%",
                        onEnter: () => {
                            gsap.to(childrenToAnimate, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                stagger: 0.2,
                                ease: "power2.out",
                            });
                        },
                        once: true
                    });
                }
            } else {
                gsap.set(container, { opacity: 0, y: 30 });
                
                ScrollTrigger.create({
                    trigger: container,
                    start: "top 95%",
                    onEnter: () => {
                        gsap.to(container, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                        });
                    },
                    once: true
                });
            }
        });
    }

    initAnimations();
};

export default gsapAnimate;