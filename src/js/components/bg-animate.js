import $ from "jquery";

const animateTitle = () => {
    /* =========================
    НАСТРОЙКИ (КРУТИ ТУТ)
    ========================= */

    // расстояние движения по X (px)
    const MOVE_X = 240; // ⬅️ больше = сильнее движение

    // множитель длины прогресса (больше = медленнее по скроллу)
    const PROGRESS_MULTIPLIER = 1.6;

    // плавность (меньше = плавнее)
    const EASING = 0.035;

    /* =========================
    ЛОГИКА (НЕ ТРОГАТЬ)
    ========================= */

    let currentX = -MOVE_X;
    let targetX = -MOVE_X;

    let currentXBottom = MOVE_X;
    let targetXBottom = MOVE_X;

    $(window).on("scroll", function () {
        const $el = $(".bg-title");
        const $elBottom = $(".bg-title-bottom");

        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        // Анимация для .bg-title (движение влево)
        const elementTop = $el.offset().top;
        const start = elementTop - windowHeight * PROGRESS_MULTIPLIER;
        const end = elementTop + windowHeight * PROGRESS_MULTIPLIER;

        if (scrollTop > start && scrollTop < end) {
            let progress = (scrollTop - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));

            targetX = MOVE_X - MOVE_X * progress * 2;
            $el.css("opacity", progress);
        }

        // Анимация для .bg-title-bottom (движение вправо)
        if ($elBottom.length) {
            const elementTopBottom = $elBottom.offset().top;
            const startBottom = elementTopBottom - windowHeight * PROGRESS_MULTIPLIER;
            const endBottom = elementTopBottom + windowHeight * PROGRESS_MULTIPLIER;

            if (scrollTop > startBottom && scrollTop < endBottom) {
                let progressBottom = (scrollTop - startBottom) / (endBottom - startBottom);
                progressBottom = Math.max(0, Math.min(1, progressBottom));

                targetXBottom = -MOVE_X + MOVE_X * progressBottom * 2;
                $elBottom.css("opacity", progressBottom);
            }
        }
    });

    function animate() {
        currentX += (targetX - currentX) * EASING;
        currentXBottom += (targetXBottom - currentXBottom) * EASING;

        $(".bg-title").css(
            "transform",
            `translate(${currentX}px, 80px)`
        );

        $(".bg-title-bottom").css(
            "transform",
            `translate(${currentXBottom}px, 80px)`
        );

        requestAnimationFrame(animate);
    }

    animate();
};

export default animateTitle;