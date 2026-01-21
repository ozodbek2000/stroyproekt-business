import $ from "jquery";
import Swiper from "swiper/bundle";

const facadeSwiper = () => {
    $(document).ready(function () {
        let isFirstSwipe = true;

        const swiper = new Swiper(".facade__swiper", {
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
    });
};

export default facadeSwiper;
