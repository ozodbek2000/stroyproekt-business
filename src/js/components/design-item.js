import $ from "jquery";

const designItem = () => {
    $(document).ready(function () {
        // Функция проверки видимости элемента
        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = $(window).height();

            return (
                rect.top >= 0 && rect.top <= windowHeight * 0.8 // Элемент появляется когда на 80% высоты экрана
            );
        }

        // Функция добавления класса active
        function checkElements() {
            // Ищем только элементы без класса active
            $(".design__advantage_item:not(.active)").each(function (index) {
                if (isElementInViewport(this)) {
                    var $this = $(this);

                    // Добавляем задержку для эффекта каскада
                    setTimeout(function () {
                        $this.addClass("active");
                    }, index * 100); // 100мс задержка между элементами
                }
            });
        }

        // Проверяем при загрузке страницы
        checkElements();

        // Проверяем при скролле
        $(window).on("scroll", function () {
            checkElements();
        });

        // Проверяем при изменении размера окна
        $(window).on("resize", function () {
            checkElements();
        });
    });
};

export default designItem;