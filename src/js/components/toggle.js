import $ from "jquery";

const toggle = () => {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
        $("header").toggleClass("border");
        $("body").toggleClass("lock");
        $(".popup__box").removeClass("active");
        $(".overlay").toggleClass("active green");

        if ($(".menu").hasClass("active")) {
            $("header").data("had-bg", $("header").hasClass("bg"));
            $("header").removeClass("bg");
        } else {
            if ($("header").data("had-bg")) {
                $("header").addClass("bg");
            }
        }
    });
    $(".popup__close, .overlay").click(function (event) {
        $(".overlay").removeClass("active");
        $(".popup__box").removeClass("active");
        $(".menu").removeClass("active");
        $("header").removeClass("border");
        $(".header__burger").removeClass("active");

        if ($(".overlay").hasClass("green")) {
            $(".overlay").removeClass("green");
        }
        if ($(".overlay").hasClass("black")) {
            $(".overlay").removeClass("black");
        }

        if (!$(".menu").hasClass("active")) {
            $("body").removeClass("lock");
        }
    });
    $(".choose, .cta__box").click(function (event) {
        $(".overlay").addClass("active black");
        $(".popup__box").addClass("active");
        $("body").addClass("lock");
        $("header").addClass("bg");
        $(".header__burger").removeClass("active");
        $(".menu").removeClass("active");
        if ($(window).width() < 768) {
            $("header").addClass("active");
        }
    });
    $(document).ready(function () {
        $(".building__levels > span").on("click", function () {
            const dataIndex = $(this).data("index");

            $(".building__levels > span").removeClass("active");
            $(".building svg[data-index]").removeClass("active");
            $(".building__popup").removeClass("active");

            $(this).addClass("active");

            $(`.building svg[data-index="${dataIndex}"]`).addClass("active");
            $(`.building__popup[data-index="${dataIndex}"]`).addClass("active");
        });

        $(".building svg[data-index]").on("click", function () {
            const dataIndex = $(this).data("index");

            $(".building svg[data-index]").removeClass("active");
            $(".building__levels > span").removeClass("active");
            $(".building__popup").removeClass("active");

            $(this).addClass("active");

            $(`.building__levels > span[data-index="${dataIndex}"]`).addClass(
                "active"
            );
            $(`.building__popup[data-index="${dataIndex}"]`).addClass("active");
        });
    });
    $(document).ready(function () {
        const $upButton = $(".up__up a");
        let sectionData = [];

        // Кешируем данные секций
        function cacheSections() {
            sectionData = [];
            $("main.wrapper > section").each(function () {
                const $section = $(this);
                const id = $section.attr("id");
                if (id) {
                    const offset = $section.offset().top;
                    const height = $section.outerHeight(true); // true включает margin

                    sectionData.push({
                        id: id,
                        element: $section,
                        top: offset,
                        bottom: offset + height,
                    });
                }
            });
        }

        // Обновление ссылки кнопки
        function updateUpButtonLink() {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            // Центр экрана
            const centerPoint = scrollTop + windowHeight / 2;

            let currentIndex = -1;

            // Находим секцию, в которой находится центр экрана (включая margin)
            for (let i = 0; i < sectionData.length; i++) {
                if (
                    centerPoint >= sectionData[i].top &&
                    centerPoint < sectionData[i].bottom
                ) {
                    currentIndex = i;
                    break;
                }
            }

            // Если не нашли секцию (например, между секциями), ищем ближайшую выше
            if (currentIndex === -1) {
                for (let i = sectionData.length - 1; i >= 0; i--) {
                    if (centerPoint >= sectionData[i].bottom) {
                        currentIndex = i + 1; // Мы между i и i+1 секцией
                        break;
                    }
                }
            }

            // Определяем ID предыдущей секции
            let targetId = "main";

            if (currentIndex > 0) {
                // Если текущая секция не первая - берем предыдущую
                targetId = sectionData[currentIndex - 1].id;
            } else if (currentIndex === 0) {
                // Если мы в первой секции - ссылка на main
                targetId = "main";
            }

            $upButton.attr("href", "#" + targetId);
        }

        // Throttle функция для производительности
        function throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => (inThrottle = false), limit);
                }
            };
        }

        // События
        $(window).on("scroll", throttle(updateUpButtonLink, 50));

        $(window).on(
            "resize",
            throttle(function () {
                cacheSections();
                updateUpButtonLink();
            }, 250)
        );

        // Плавный скролл
        $upButton.on("click", function (e) {
            e.preventDefault();
            const targetId = $(this).attr("href");
            const $target = $(targetId);

            if ($target.length) {
                $("html, body").animate(
                    {
                        scrollTop: $target.offset().top,
                    },
                    600
                );
            }
        });

        // Инициализация
        cacheSections();
        updateUpButtonLink();

        // Пересчет при полной загрузке страницы
        $(window).on("load", function () {
            cacheSections();
            updateUpButtonLink();
        });
    });
};

export default toggle;
