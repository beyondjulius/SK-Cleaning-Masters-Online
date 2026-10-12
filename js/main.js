document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
        if (links) links.classList.remove("open");
      }
    });
  });

  if (header && header.classList.contains("on-hero")) {
    const syncHeader = () => {
      if (window.scrollY > window.innerHeight * 0.72) {
        header.classList.remove("on-hero");
      } else if (!links?.classList.contains("open")) {
        header.classList.add("on-hero");
      }
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, {passive:true});
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      if (!status) return;
      status.textContent = "Thank you. Your enquiry has been received and our team will follow up shortly.";
      status.classList.add("show");
      form.reset();
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
