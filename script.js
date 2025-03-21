/* Lenis */
document.addEventListener("DOMContentLoaded", () => {
    /* LENIS SMOOTH SCROLL */
    const lenis = new Lenis({
        duration: 1.2, // Smooth scrolling duration
        smoothWheel: true, // Enables smooth wheel scrolling
        smoothTouch: true, // Enables smooth touch scrolling
        wheelMultiplier: 0.2, // **Reduces sensitivity by 80% (Default: 1)**
        touchMultiplier: 0.2, // **Reduces touch scroll sensitivity**
        easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing curve
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
});

/* Lenis */

/* Menu*/
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(".socials p");
    let isAnimating = false;

    const splitTextIntoSpans = (selector) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            let text = element.innerText;
            let splitText = text
                .split(" ")
                .map(function (char) {
                    return `<span>${char == " " ? "&nbsp;&nbsp;" : char}</span>`;
                })
                .join("");
            element.innerHTML = splitText;
        });
    };

    splitTextIntoSpans(".header h1");

    menuToggle.addEventListener("click", () => {
        if (isAnimating) return;

        if (menuToggle.classList.contains("closed")) {
            menuToggle.classList.remove("closed");
            menuToggle.classList.add("opened");

            isAnimating = true;

            gsap.to(menu, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "hop",
                duration: 1.5,
                onStart: () => {
                    menu.style.pointerEvents = "all";
                },
                onComplete: () => {
                    isAnimating = false;
                },
            });

            gsap.to(links, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                delay: 0.85,
                duration: 1,
                ease: "power3.out",
            });

            gsap.to(socialLinks, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                delay: 0.85,
                duration: 1,
                ease: "power3.out",
            });

            gsap.to(".video-wrapper", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "hop",
                duration: 1.5,
                delay: 0.5,
            });

            gsap.to(".header h1 span", {
                rotateY: 0,
                stagger: 0.85,
                delay: 0.75,
                duration: 1.5,
                ease: "power4.out",
            });

            gsap.to(".header h1 span", {
                y: 0,
                scale: 1,
                stagger: 0.05,
                delay: 0.5,
                duration: 1.5,
                ease: "power4.out",
            });

        } else {
            menuToggle.classList.remove("opened");
            menuToggle.classList.add("closed");

            isAnimating = true;

            gsap.to(menu, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "hop",
                duration: 1.5,
                onComplete: () => {
                    menu.style.pointerEvents = "none";
                    gsap.set(menu, {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    });

                    gsap.set(links, { y: 30, opacity: 0 });
                    gsap.set(socialLinks, { y: 30, opacity: 0 });
                    gsap.set(".video-wrapper", {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    });
                    gsap.set(".header h1 span", {
                        y: 500,
                        rotateY: 90,
                        scale: 0.75,
                    });

                    isAnimating = false;
                },
            });
        }
    });
});

let lastScrollTop = 0;
const menuToggle = document.querySelector(".menu-toggle");
const logo = document.querySelector(".logo a"); // Selecting the anchor inside .logo

// Initially hide elements
menuToggle.style.transform = "translateY(-100px)";
logo.style.transform = "translateY(-100px)";
menuToggle.style.opacity = "0";
logo.style.opacity = "0";

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let viewportHeight = window.innerHeight * 0.1; // 3vh

    if (scrollTop > lastScrollTop) {
        // Scrolling down - Show elements
        menuToggle.style.transform = "translateY(0)";
        logo.style.transform = "translateY(0)";
        menuToggle.style.opacity = "1";
        logo.style.opacity = "1";
    } else if (scrollTop < viewportHeight) {
        // Near the top (around 3vh) - Hide elements
        menuToggle.style.transform = "translateY(-100px)";
        logo.style.transform = "translateY(-100px)";
        menuToggle.style.opacity = "0";
        logo.style.opacity = "0";
    }

    lastScrollTop = scrollTop;
});
/* Menu*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.text, .nav1, .nav2').forEach(element => {
        const text = element.textContent.trim(); // Get text content without extra spaces
        element.innerHTML = ''; // Clear existing text

        const createBlock = () => {
            const block = document.createElement('div');
            block.classList.add('block'); // Add block class
            block.innerHTML = [...text].map(letter => 
                `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
            ).join('');
            return block;
        };

        let block1 = createBlock();
        let block2 = createBlock();
        
        element.appendChild(block1);
        element.appendChild(block2);
    });

    // Ensure the animation triggers on hover
    document.querySelectorAll('.text, .nav1, .nav2').forEach(element => {
        element.addEventListener("mouseover", () => {
            element.classList.add("play"); // Apply play class
        });
        element.addEventListener("mouseleave", () => {
            element.classList.remove("play"); // Remove class to reset animation
        });
    });
});

/* Page 4 */
/* Page 4 */