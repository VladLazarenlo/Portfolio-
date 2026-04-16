document.addEventListener("DOMContentLoaded", () => {
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const menuLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("section[id]");
  const fadeItems = document.querySelectorAll(".fade");
  const header = document.querySelector(".site-header");

  allAnchorLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });

  if (fadeItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("on");
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.12
    });

    fadeItems.forEach(item => observer.observe(item));
  }

  function updateActiveMenuLink() {
    const headerHeight = header ? header.offsetHeight : 0;
    const currentScroll = window.pageYOffset + headerHeight + 24;

    let currentSectionId = "";

    sections.forEach(section => {
      if (currentScroll >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  updateActiveMenuLink();
  window.addEventListener("scroll", updateActiveMenuLink);
});