
document.addEventListener("DOMContentLoaded", function () {
    // NAVIGATION MENU
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("show");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");

                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                navLinks.querySelectorAll("a").forEach(function (item) {
                    item.classList.remove("active");
                });

                link.classList.add("active");
            });
        });
    }

    // CLOSE THE MOBILE MENU WHEN CLICKING OUTSIDE IT
    document.addEventListener("click", function (event) {
        if (
            menuToggle &&
            navLinks &&
            !menuToggle.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {
            navLinks.classList.remove("show");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });

    // FOOTER CLOCK
    function updateFooterClock() {
        const clock = document.getElementById("live-clock");
        const clockDate = document.getElementById("clock-date");

        const now = new Date();

        const time = now.toLocaleTimeString("en-GB", {
            timeZone: "Africa/Nairobi",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        const date = now.toLocaleDateString("en-GB", {
            timeZone: "Africa/Nairobi",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        if (clock) {
            clock.textContent = time;
        }

        if (clockDate) {
            clockDate.textContent = date;
        }
    }

    updateFooterClock();
    setInterval(updateFooterClock, 1000);

    // AUTOMATIC FOOTER YEAR
    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
