/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="https://"]):not([href^="http://"]):not([href^="//"])',
        animationSelector: '[class="mil-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".mil-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".mil-animation-1 .mil-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".mil-animation-1 .mil-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".mil-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".mil-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".mil-reveal-box", {
        right: "0"
    });
    timeline.to(".mil-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".mil-animation-2 .mil-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".mil-animation-2 .mil-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".mil-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".mil-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.mil-preloader').addClass("mil-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".mil-arrow").clone().appendTo(".mil-arrow-place");
        $(".mil-dodecahedron").clone().appendTo(".mil-animation");
        $(".mil-lines").clone().appendTo(".mil-lines-place");
        $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let box = element.querySelector(".mil-accordion-content");
        let symbol = element.querySelector(".mil-symbol");
        let minusElement = element.querySelector(".mil-minus");
        let plusElement = element.querySelector(".mil-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".mil-back-to-top .mil-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.mil-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.mil-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('mil-accent');
    });

    $('.mil-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('mil-accent');
    });

    $('.mil-drag').mouseover(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-drag').mouseleave(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseover(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseleave(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseover(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseleave(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.mil-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.mil-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

    menu

    ***************************/
    $('.mil-menu-btn').on("click", function () {
        $('.mil-menu-btn').toggleClass('mil-active');
        $('.mil-menu').toggleClass('mil-active');
        $('.mil-menu-frame').toggleClass('mil-active');
        $('body').toggleClass('mil-menu-open');
    });

    /***************************

    main menu

    ***************************/
    $('.mil-has-children a').on('click', function () {
        $('.mil-has-children ul').removeClass('mil-active');
        $('.mil-has-children a').removeClass('mil-active');
        $(this).toggleClass('mil-active');
        $(this).next().toggleClass('mil-active');
    });

    /***************************

    scroll float effect

    ***************************/
    const scrollFloatElements = document.querySelectorAll('.scroll-float');

    scrollFloatElements.forEach((element) => {
        const text = element.textContent;
        const splitText = text.split('').map((char, index) => {
            return `<span class="char" style="display: inline-block;">${char === ' ' ? '\u00A0' : char}</span>`;
        }).join('');

        element.innerHTML = `<span class="scroll-float-text">${splitText}</span>`;

        const charElements = element.querySelectorAll('.char');

        gsap.fromTo(
            charElements,
            {
                willChange: 'opacity, transform',
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: '50% 0%'
            },
            {
                duration: 1,
                ease: 'back.inOut(2)',
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: 0.03,
                scrollTrigger: {
                    trigger: element,
                    start: 'center bottom+=50%',
                    end: 'bottom bottom-=40%',
                    scrub: true
                }
            }
        );
    });

    /***************************

    variable proximity effect

    ***************************/
    const variableProximityElements = document.querySelectorAll('.variable-proximity');

    variableProximityElements.forEach((element) => {
        const label = element.textContent.trim();
        const fromSettings = element.getAttribute('data-from') || 'wght 100';
        const toSettings = element.getAttribute('data-to') || 'wght 1000';
        const radius = parseInt(element.getAttribute('data-radius')) || 50;

        element.innerHTML = '';
        const words = label.split(' ');
        let letterIndex = 0;
        const letterRefs = [];

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            word.split('').forEach(letter => {
                const letterSpan = document.createElement('span');
                letterSpan.style.display = 'inline-block';
                letterSpan.style.fontVariationSettings = fromSettings;
                letterSpan.textContent = letter;
                letterRefs.push(letterSpan);
                wordSpan.appendChild(letterSpan);
                letterIndex++;
            });

            element.appendChild(wordSpan);
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.style.display = 'inline-block';
                spaceSpan.innerHTML = '&nbsp;';
                element.appendChild(spaceSpan);
            }
        });

        // Screen reader text
        const srSpan = document.createElement('span');
        srSpan.className = 'sr-only';
        srSpan.textContent = label;
        element.appendChild(srSpan);

        // Animation logic
        let mouseX = 0, mouseY = 0;
        let lastX = null, lastY = null;

        const updateMousePosition = (e) => {
            const rect = element.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const animate = () => {
            if (lastX === mouseX && lastY === mouseY) {
                requestAnimationFrame(animate);
                return;
            }
            lastX = mouseX;
            lastY = mouseY;

            letterRefs.forEach(letterRef => {
                const rect = letterRef.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2 - elementRect.left;
                const letterCenterY = rect.top + rect.height / 2 - elementRect.top;

                const distance = Math.sqrt((mouseX - letterCenterX) ** 2 + (mouseY - letterCenterY) ** 2);

                if (distance >= radius) {
                    letterRef.style.fontVariationSettings = fromSettings;
                } else {
                    const falloff = Math.max(0, 1 - distance / radius);
                    const fromWeight = parseInt(fromSettings.split(' ')[1]);
                    const toWeight = parseInt(toSettings.split(' ')[1]);
                    const interpolatedWeight = fromWeight + (toWeight - fromWeight) * falloff;
                    letterRef.style.fontVariationSettings = `'wght' ${interpolatedWeight}`;
                }
            });

            requestAnimationFrame(animate);
        };

        element.addEventListener('mousemove', updateMousePosition);
        element.addEventListener('mouseenter', () => {
            requestAnimationFrame(animate);
        });
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".mil-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".mil-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var mySwiper = new Swiper('.mil-reviews-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.mil-revi-next',
            prevEl: '.mil-revi-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.mil-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.mil-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.mil-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.mil-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.mil-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.mil-menu-btn').removeClass('mil-active');
        $('.mil-menu').removeClass('mil-active');
        $('.mil-menu-frame').removeClass('mil-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron, .mil-current-page a").remove();
            $(".mil-arrow").clone().appendTo(".mil-arrow-place");
            $(".mil-dodecahedron").clone().appendTo(".mil-animation");
            $(".mil-lines").clone().appendTo(".mil-lines-place");
            $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let box = element.querySelector(".mil-accordion-content");
            let symbol = element.querySelector(".mil-symbol");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.mil-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('mil-accent');
        });

        $('.mil-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('mil-accent');
        });

        $('.mil-drag').mouseover(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-drag').mouseleave(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseover(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseleave(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseover(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseleave(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.mil-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.mil-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.mil-has-children a').on('click', function () {
            $('.mil-has-children ul').removeClass('mil-active');
            $('.mil-has-children a').removeClass('mil-active');
            $(this).toggleClass('mil-active');
            $(this).next().toggleClass('mil-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".mil-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".mil-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".mil-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var mySwiper = new Swiper('.mil-reviews-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.mil-revi-next',
                prevEl: '.mil-revi-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.mil-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.mil-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.mil-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.mil-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});

// Cal.com initialization for Swup
function initCal() {
    if (document.getElementById('my-cal-inline-30min')) {
        // Only initialize if not already loaded in this container
        if (document.getElementById('my-cal-inline-30min').innerHTML.trim() === '') {
            (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
            Cal("init", "30min", {origin:"https://app.cal.com"});

            Cal.ns["30min"]("inline", {
                elementOrSelector:"#my-cal-inline-30min",
                config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
                calLink: "hey-digital/30min",
            });

            Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        }
    }
}

// Footer social links handler
function initFooterSocialLinks() {
    const footerLinks = document.querySelectorAll('footer .external-link');
    
    footerLinks.forEach(link => {
        if (link.dataset.socialBound) return;
        link.dataset.socialBound = "true";
        
        // Remove existing listener by cloning to avoid duplicates
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            const url = this.getAttribute('data-url');
            if (url) {
                setTimeout(function () {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }, 0);
            }
            
            return false;
        }, true);
    });
}

// Portfolio filter buttons handler
function initWe2Filters() {
    const filterButtons = document.querySelectorAll(".mil-we2-filter-btn");
    const websitesGrid = document.getElementById("mil-websites-grid");
    const logosGrid = document.getElementById("mil-logos-grid");
    const appsGrid = document.getElementById("mil-apps-grid");
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(btn => {
        if (btn.dataset.filterBound) return;
        btn.dataset.filterBound = "true";
        
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.getAttribute("data-show-tab");
            
            filterButtons.forEach(b => b.classList.remove("mil-active"));
            this.classList.add("mil-active");
            
            if (targetTab === "websites") {
                if (websitesGrid) { websitesGrid.style.display = "flex"; websitesGrid.offsetHeight; websitesGrid.style.opacity = "1"; }
                if (logosGrid) logosGrid.style.display = "none";
                if (appsGrid) appsGrid.style.display = "none";
            } else if (targetTab === "logos") {
                if (websitesGrid) websitesGrid.style.display = "none";
                if (logosGrid) { logosGrid.style.display = "block"; logosGrid.offsetHeight; logosGrid.style.opacity = "1"; }
                if (appsGrid) appsGrid.style.display = "none";
            } else if (targetTab === "soon") {
                if (websitesGrid) websitesGrid.style.display = "none";
                if (logosGrid) logosGrid.style.display = "none";
                if (appsGrid) { appsGrid.style.display = "block"; appsGrid.offsetHeight; appsGrid.style.opacity = "1"; }
            }
            
            // Refresh GSAP/ScrollTrigger
            if (typeof ScrollTrigger !== 'undefined') {
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        });
    });
}

// Run on initial load
document.addEventListener("DOMContentLoaded", function() {
    initCal();
    initFooterSocialLinks();
    initWe2Filters();
});

// Run after Swup content is replaced
document.addEventListener("swup:contentReplaced", function() {
    initCal();
    initFooterSocialLinks();
    initWe2Filters();
});

