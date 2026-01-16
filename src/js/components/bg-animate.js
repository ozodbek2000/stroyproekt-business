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

    $(window).on("scroll", function () {
        const $el = $(".condition__bg-title");

        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const elementTop = $el.offset().top;

        const start = elementTop - windowHeight * PROGRESS_MULTIPLIER;
        const end = elementTop + windowHeight * PROGRESS_MULTIPLIER;

        if (scrollTop > start && scrollTop < end) {
            let progress = (scrollTop - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));

            targetX = MOVE_X - MOVE_X * progress * 2;

            $el.css("opacity", progress);
        }
    });

    function animate() {
        currentX += (targetX - currentX) * EASING;

        $(".condition__bg-title").css(
            "transform",
            `translate(${currentX}px, 80px)`
        );

        requestAnimationFrame(animate);
    }

    animate();
};

export default animateTitle;
