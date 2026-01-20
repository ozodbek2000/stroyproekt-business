import $ from "jquery";

const number = () => {
    $(document).ready(function () {
        const animateCounter = ($el) => {
            const target = parseInt($el.data("target"), 10);
            const duration = 1500;
            const startTime = performance.now();

            const update = (currentTime) => {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );
                const value = Math.floor(progress * target);

                $el.text(value);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    $el.text(target);
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter($(entry.target));
                        obs.unobserve(entry.target); // считаем один раз
                    }
                });
            },
            {
                threshold: 0.4,
            }
        );

        $(".comfort__number p").each(function () {
            observer.observe(this);
        });
    });
};

export default number;
