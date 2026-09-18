/* =========================================
   LAIBA AFTAB — PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       DARK / LIGHT MODE
    ========================================= */

    const themeToggle = document.querySelector("#themeToggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark");
    } else {
        // Use system preference if no theme has been saved
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        if (prefersDark) {
            document.body.classList.add("dark");
        }
    }

    // Update theme button icon
    function updateThemeIcon() {
        if (!themeToggle) return;

        const isDark = document.body.classList.contains("dark");

        themeToggle.textContent = isDark ? "☀" : "☾";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    updateThemeIcon();

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();
        });
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            // Change menu icon
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        /* Close mobile menu after clicking a link */

        const mobileNavLinks =
            navLinks.querySelectorAll("a");

        mobileNavLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";
            });

        });
    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       SMOOTH INTERNAL LINKS
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.getAttribute("id");

                        navigationLinks.forEach((link) => {

                            const linkTarget =
                                link.getAttribute("href");

                            link.classList.toggle(
                                "active",
                                linkTarget === `#${currentId}`
                            );

                        });

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin: "-20% 0px -60% 0px"
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* =========================================
       CLOSE MOBILE MENU WITH ESCAPE
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            navLinks &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";
            }
        }

    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header =
        document.querySelector(".site-header");

    if (header) {

        const handleHeaderScroll = () => {

            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            handleHeaderScroll,
            { passive: true }
        );

        handleHeaderScroll();
    }

});
