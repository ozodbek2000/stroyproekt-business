import $ from "jquery";

const header = () => {
    $(document).ready(function () {
        var header = $("header");
        var lastScrollTop = 0;

        $(window).on("scroll", function () {
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
