import $ from "jquery";
import Swiper from "swiper/bundle";

const facadeSwiper = () => {
    $(document).ready(function () {
        let isFirstSwipe = true;

        const swiper = new Swiper(".facade__swiper, .gallery__swiper", {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: true,
            keyboard: { enabled: true },
            speed: 800,
            pagination: {
                el: ".facade__pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".facade__navigation_next",
                prevEl: ".facade__navigation_prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
            on: {
                slideChange: function () {
                    // Проверяем ширину экрана
                    if (window.innerWidth <= 768) {
                        return;
                    }

                    // Пропускаем первый свайп
                    if (isFirstSwipe) {
                        isFirstSwipe = false;
                        return;
                    }

                    const currentIndex = this.activeIndex;
                    const previousIndex = this.previousIndex;
                    const slides = this.slides;

                    // Определяем направление свайпа
                    const isNext =
                        currentIndex > previousIndex ||
                        (previousIndex === slides.length - 1 &&
                            currentIndex === 0);

                    if (isNext) {
                        // Свайп вперед: копируем из 3-го слайда во 2-й
                        const nextSlide = slides[currentIndex + 1];
                        const skipSlide = slides[currentIndex + 2];

                        if (nextSlide && skipSlide) {
                            const skipImg = skipSlide.querySelector("img");
                            const nextImg = nextSlide.querySelector("img");

                            if (skipImg && nextImg) {
                                // Плавная смена
                                nextImg.style.transition = "opacity 0.4s ease";
                                nextImg.style.opacity = "0";

                                setTimeout(() => {
                                    nextImg.src = skipImg.src;
                                    nextImg.alt = skipImg.alt;
                                    nextImg.style.opacity = "1";
                                }, 200);
                            }
                        }
                    } else {
                        // Свайп назад: копируем из 2-го слайда в 3-й
                        const secondSlide = slides[currentIndex + 1];
                        const thirdSlide = slides[currentIndex + 2];

                        if (secondSlide && thirdSlide) {
                            const secondImg = secondSlide.querySelector("img");
                            const thirdImg = thirdSlide.querySelector("img");

                            if (secondImg && thirdImg) {
                                // Плавная смена
                                thirdImg.style.transition = "opacity 0.4s ease";
                                thirdImg.style.opacity = "0";

                                setTimeout(() => {
                                    thirdImg.src = secondImg.src;
                                    thirdImg.alt = secondImg.alt;
                                    thirdImg.style.opacity = "1";
                                }, 200);
                            }
                        }
                    }
                },
                init: function () {
                    // Проверяем ширину экрана для init тоже
                    if (window.innerWidth <= 768) {
                        return;
                    }

                    const currentIndex = this.activeIndex;
                    const slides = this.slides;

                    const nextSlide = slides[currentIndex + 1];
                    const skipSlide = slides[currentIndex + 2];

                    if (nextSlide && skipSlide) {
                        const skipImg = skipSlide.querySelector("img");
                        const nextImg = nextSlide.querySelector("img");

                        if (skipImg && nextImg) {
                            nextImg.src = skipImg.src;
                            nextImg.alt = skipImg.alt;
                        }
                    }
                },
            },
        });

        const rentSwiper = new Swiper(".rent__swiper", {
            slidesPerView: "3.3",
            spaceBetween: 20,
            loop: true,
            keyboard: { enabled: true },
            speed: 800,
            pagination: {
                el: ".rent__pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".rent__navigation_next",
                prevEl: ".rent__navigation_prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: "1.2",
                },
                768: {
                    slidesPerView: "1.4",
                },
                1024: {
                    slidesPerView: "4.2",
                },
            },
        });

        const serviceSwiper = new Swiper(".service__swiper", {
            slidesPerView: "auto",
            direction: "vertical",
            mousewheel: false,
            breakpoints: {
                767: {
                    slidesPerView: "1",
                    spaceBetween: 10,
                },
            },
        });
        
        const $serviceSection = $(".service__swiper");
        let lastScrollTime = 0;
        const scrollDelay = 400;
        let swiperDisabled = false; // Флаг для отключения свайпера
        let touchStartY = 0;
        
        // Проверяем, мобильное ли устройство
        function isMobile() {
            return window.innerWidth < 767;
        }
        
        // Проверяем, находится ли курсор над секцией
        function isMouseOverService(e) {
            const rect = $serviceSection[0].getBoundingClientRect();
            return (
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom &&
                e.clientX >= rect.left &&
                e.clientX <= rect.right
            );
        }
        
        // Проверяем, находится ли тач над секцией
        function isTouchOverService(touch) {
            const rect = $serviceSection[0].getBoundingClientRect();
            return (
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom &&
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right
            );
        }
        
        // Проверяем, полностью ли секция покрыта экраном (видна целиком)
        function isSectionFullyCovered() {
            const rect = $serviceSection[0].getBoundingClientRect();
            const windowHeight = $(window).height();
        
            return rect.top >= 0 && rect.bottom <= windowHeight;
        }
        
        // Обработка скролла мышью (для десктопа)
        document.addEventListener(
            "wheel",
            function (e) {
                const scrollingDown = e.deltaY > 0;
                const scrollingUp = e.deltaY < 0;
        
                // Проверяем позицию курсора и полное покрытие секции экраном
                if (!isMouseOverService(e) || !isSectionFullyCovered()) {
                    return; // Работает обычный скролл страницы
                }
        
                const currentTime = Date.now();
        
                // Скроллим вниз
                if (scrollingDown) {
                    if (serviceSwiper.isEnd) {
                        return;
                    } else {
                        if (currentTime - lastScrollTime < scrollDelay) {
                            e.preventDefault();
                            return;
                        }
        
                        e.preventDefault();
                        lastScrollTime = currentTime;
                        serviceSwiper.slideNext();
                    }
                }
        
                // Скроллим вверх
                if (scrollingUp) {
                    if (serviceSwiper.isBeginning) {
                        return;
                    } else {
                        if (currentTime - lastScrollTime < scrollDelay) {
                            e.preventDefault();
                            return;
                        }
        
                        e.preventDefault();
                        lastScrollTime = currentTime;
                        serviceSwiper.slidePrev();
                    }
                }
            },
            { passive: false }
        );
        
        // Обработка тач-событий для мобильных устройств
        document.addEventListener(
            "touchstart",
            function (e) {
                if (!isMobile()) return;
                
                touchStartY = e.touches[0].clientY;
            },
            { passive: true }
        );
        
        document.addEventListener(
            "touchmove",
            function (e) {
                if (!isMobile()) return;
                
                // Если свайпер отключен на мобильном, работает обычный скролл
                if (swiperDisabled) {
                    return;
                }
        
                const touch = e.touches[0];
                
                // Проверяем позицию тача и полное покрытие секции экраном
                if (!isTouchOverService(touch) || !isSectionFullyCovered()) {
                    return; // Работает обычный скролл страницы
                }
        
                const touchEndY = touch.clientY;
                const touchDiff = touchStartY - touchEndY;
                const scrollingDown = touchDiff > 0;
                const scrollingUp = touchDiff < 0;
        
                const currentTime = Date.now();
        
                // Минимальное расстояние для регистрации свайпа
                if (Math.abs(touchDiff) < 10) {
                    return;
                }
        
                // Скроллим вниз
                if (scrollingDown) {
                    if (serviceSwiper.isEnd) {
                        // На последнем слайде на мобильном - отключаем свайпер навсегда
                        swiperDisabled = true;
                        return;
                    } else {
                        if (currentTime - lastScrollTime < scrollDelay) {
                            e.preventDefault();
                            return;
                        }
        
                        e.preventDefault();
                        lastScrollTime = currentTime;
                        serviceSwiper.slideNext();
                        touchStartY = touchEndY; // Обновляем позицию для следующего движения
                    }
                }
        
                // Скроллим вверх
                if (scrollingUp) {
                    if (serviceSwiper.isBeginning) {
                        return;
                    } else {
                        if (currentTime - lastScrollTime < scrollDelay) {
                            e.preventDefault();
                            return;
                        }
        
                        e.preventDefault();
                        lastScrollTime = currentTime;
                        serviceSwiper.slidePrev();
                        touchStartY = touchEndY; // Обновляем позицию для следующего движения
                    }
                }
            },
            { passive: false }
        );
        
        // Сброс флага при изменении размера окна (если переключаемся с мобильного на десктоп)
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                swiperDisabled = false;
            }
        });
    });
};

export default facadeSwiper;
