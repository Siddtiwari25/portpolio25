


document.addEventListener("DOMContentLoaded", () => {

    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle("bx-x");
            navbar.classList.toggle("active");
        };
    }

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header nav a");

    window.addEventListener("scroll", () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });

        if (menuIcon && navbar) {
            menuIcon.classList.remove("bx-x");
            navbar.classList.remove("active");
        }
    });

});

