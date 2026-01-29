import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scrollBorder = () => {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
        ScrollTrigger.refresh();
        
        gsap.to("#scroll-border", {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    console.log("Scroll progress:", self.progress.toFixed(2));
                }
            }
        });
    }, 500);
};

export default scrollBorder;