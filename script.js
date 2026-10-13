
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) {
        console.error("Navbar button or navigation menu was not found.");
        return;
    }

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
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            navLinks.querySelectorAll("a").forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });
});

function updateFooterClock() {
    const now = new Date();

    const time = now.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const date = now.toLocaleDateString('en-GB', {
        timeZone: 'Africa/Nairobi',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    document.getElementById('live-clock').textContent = time;
    document.getElementById('clock-date').textContent = date;
}

updateFooterClock();
setInterval(updateFooterClock, 1000);
