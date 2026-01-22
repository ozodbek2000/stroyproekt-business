import $ from "jquery";

const header = () => {
    $(document).ready(function () {
        var header = $("header");
        var lastScrollTop = 0;

        $(window).on("scroll", function () {
            // Check if user is inside a .solution section
            var isInsideSolution = false;

            $(".solution").each(function () {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                // Check if the element is in viewport
                if (
                    elementBottom > viewportTop &&
                    elementTop < viewportBottom
                ) {
                    isInsideSolution = true;
                    return false; // Break the loop
                }
            });

            if (isInsideSolution) {
                header.removeClass("active"); // Remove active class when inside solution
                return;
            }

            var scrollTop = $(window).scrollTop();

            if (scrollTop > 0) {
                header.addClass("bg");
            } else {
                header.removeClass("bg");
            }

            if (scrollTop > lastScrollTop) {
                header.removeClass("active");
            } else {
                header.addClass("active");
            }

            lastScrollTop = scrollTop;
        });
    });
};

export default header;