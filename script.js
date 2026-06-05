document.addEventListener("DOMContentLoaded", () => {
  // 1. ORBIT INITIALIZATION
  const orbitRadius = 240;
  const branches = document.querySelectorAll(".branch");

  setTimeout(() => {
    branches.forEach((branch, index) => {
      const angle = (index / branches.length) * (2 * Math.PI) - Math.PI / 2;
      branch.style.left = `calc(50% + ${Math.cos(angle) * orbitRadius}px)`;
      branch.style.top = `calc(50% + ${Math.sin(angle) * orbitRadius}px)`;
      branch.style.opacity = "1";
    });
  }, 800);

  // 2. PARALLAX LOGO ENGINE (MOBILE URL BAR JIGGLE FIX)
  const logo = document.getElementById("mainLogo");
  const orbitSystem = document.getElementById("orbitSystem");
  const scrollIndicator = document.getElementById("scrollIndicator");

  // FIX FOR MOBILE JIGGLE: We lock 'vh' and 'isMobile' here so the disappearing address bar on phones doesn't break the math.
  let vh = window.innerHeight;
  let isMobile = window.innerWidth <= 768;

  // Only recalculate screen size if the user flips their phone sideways
  window.addEventListener("resize", () => {
    vh = window.innerHeight;
    isMobile = window.innerWidth <= 768;
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (orbitSystem)
      orbitSystem.style.opacity = Math.max(1 - scrollY / (vh * 0.4), 0);
    if (scrollIndicator)
      scrollIndicator.style.opacity = Math.max(1 - scrollY / 200, 0);

    // Phase 1: Scroll down through the Hero Section
    if (scrollY <= vh) {
      const progress = scrollY / vh; // 0 to 1

      // Desktop untouched. Mobile stays dead center (0).
      const moveX = isMobile ? 0 : -(progress * 22);
      
      // Desktop untouched. Mobile moves up (-18vh).
      const moveY = isMobile ? -(progress * 18) : (progress * 15);
      
      // Mobile scales smoothly to EXACTLY 1.45 so it matches Phase 2 perfectly (no snapping).
      const scale = isMobile ? 1 + (progress * 0.45) : 1 + (progress * 0.8);

      // Keep it fixed to the screen while it animates
      logo.style.position = "fixed";
      logo.style.top = "50%";
      logo.style.transform = `translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${scale})`;
    }
    // Phase 2: Scrolling past the About section
    else {
      // Switches to absolute positioning to let the native browser scroll take over
      logo.style.position = "absolute";
      logo.style.top = `${vh * 1.5}px`;

      // Desktop untouched. Mobile locks in the exact same values from the end of Phase 1.
      const moveX = isMobile ? 0 : -22; 
      const moveY = isMobile ? -18 : 12;
      const scale = isMobile ? 1.45 : 1.9;

      logo.style.transform = `translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${scale})`;
    }
  });

  // 3. TEXT & CARD REVEAL OBSERVER
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".js-reveal").forEach((el) => observer.observe(el));

  // 4. FAQ ACCORDION LOGIC (Moved inside DOMContentLoaded so it fires correctly)
  const faqItems = document.querySelectorAll('.faq-item');
    
  faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      
      questionBtn.addEventListener('click', () => {
          // Check if the clicked item is already open
          const isActive = item.classList.contains('active');
          
          // Close all items first (so only one stays open at a time)
          faqItems.forEach(faq => faq.classList.remove('active'));
          
          // If it wasn't open before, open it now
          if (!isActive) {
              item.classList.add('active');
          }
      });
  });
});
