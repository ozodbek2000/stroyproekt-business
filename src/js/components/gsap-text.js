import $ from "jquery";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gsapText = () => {
    $(document).ready(function () {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        gsap.set(".sentence__title", { opacity: 1 });

        let split = SplitText.create(".sentence__title", { type: "chars" });
        
        gsap.set(split.chars, { 
            color: "rgba(114, 88, 79, 0.03)",
            y: 0,
            autoAlpha: 0
        });
        
        gsap.to(split.chars, {
            y: 0,
            autoAlpha: 1,
            color: "#464646",
            stagger: 0.1,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".sentence__title",
                start: "top 80%",
                once: true
            }
        });
    });
};

export default gsapText;