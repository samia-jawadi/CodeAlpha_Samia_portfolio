document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use the system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode-transition");
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      setTimeout(() => {
        document.body.classList.remove("light-mode-transition");
      }, 1000);
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.add("dark-mode-transition");
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      setTimeout(() => {
        document.body.classList.remove("dark-mode-transition");
      }, 1000);
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Welcome screen transition
  const welcomeScreen = document.getElementById("welcome-screen");
  const portfolioSections = document.querySelectorAll("section, footer, nav");

  // Function to show the portfolio content
  function showPortfolio() {
    welcomeScreen.style.opacity = "0";
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      portfolioSections.forEach((section) => {
        section.style.display = "block";
      });

      // Scroll to the about section
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Trigger animations after welcome screen disappears
      setTimeout(() => {
        const animateOnScroll = () => {
          const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          }, observerOptions);

          document.querySelectorAll(".fade-in").forEach((el) => {
            observer.observe(el);
          });
        };

        // Initial check
        animateOnScroll();

        // Check on scroll
        window.addEventListener("scroll", animateOnScroll);
      }, 300);
    }, 1500);
  }

  // Set timeout for welcome screen
  setTimeout(showPortfolio, 3500);

  // Also allow clicking to skip welcome screen
  welcomeScreen.addEventListener("click", showPortfolio);
});
