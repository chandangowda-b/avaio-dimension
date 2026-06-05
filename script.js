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
  
    // 2. PARALLAX LOGO ENGINE (ZERO JIGGLE FIX)
    const logo = document.getElementById("mainLogo");
    const orbitSystem = document.getElementById("orbitSystem");
    const scrollIndicator = document.getElementById("scrollIndicator");
  
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 768;
  
      if (orbitSystem)
        orbitSystem.style.opacity = Math.max(1 - scrollY / (vh * 0.4), 0);
      if (scrollIndicator)
        scrollIndicator.style.opacity = Math.max(1 - scrollY / 200, 0);
  
      // Phase 1: Scroll down through the Hero Section
      if (scrollY <= vh) {
        const progress = scrollY / vh; // 0 to 1
  
        const moveX = isMobile ? 0 : -(progress * 22);
        const moveY = isMobile ? -(progress * 18) : (progress * 15);
        const scale = isMobile ? 1 + (progress * 0.4) : 1 + (progress * 0.8);
  
        // Keep it fixed to the screen while it animates
        logo.style.position = "fixed";
        logo.style.top = "50%";
        logo.style.transform = `translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${scale})`;
      }
      // Phase 2: Scrolling past the About section
      else {
        // JIGGLE FIX: Switch to absolute positioning. 
        // This pins the logo to the page at exactly 150vh down (where it naturally lands), 
        // allowing the native browser scroll to take over seamlessly.
        logo.style.position = "absolute";
        logo.style.top = `${vh * 1.5}px`;
  
        // Lock in final positions from Phase 1
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
  });


  // 4. FAQ ACCORDION LOGIC
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