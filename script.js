document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Tabs functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // Hide all tab content
    tabContents.forEach(tc => tc.classList.remove('active'));

    // Add active to clicked tab
    tab.classList.add('active');
    // Show corresponding content
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});



  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = "block";

      // Reset animation by replacing the element (force reflow)
      modalImg.style.animation = 'none';
      modalImg.offsetHeight; // trigger reflow
      modalImg.style.animation = '';
      modalImg.src = img.src;
    });
  });

  function closeImageModal() {
    modal.style.display = "none";
    modalImg.src = "";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      closeImageModal();
    }
  }


  

    const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu on link click
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
    });
  });




  function openProjectModal(title, description) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("projectModal").classList.remove("hidden");
  }

  function closeProjectModal() {
    document.getElementById("projectModal").classList.add("hidden");
  }













let currentSlide = 0;

function openImageSlider(images) {
  const slider = document.getElementById('imageSliderModal');
  const sliderImages = document.getElementById('sliderImages');
  sliderImages.innerHTML = images.map(img => `<img src="${img}" alt="Slide Image">`).join('');
  currentSlide = 0;
  updateSlide();
  slider.style.display = 'block';
}

function closeImageSlider() {
  document.getElementById('imageSliderModal').style.display = 'none';
}

function nextSlide() {
  const total = document.querySelectorAll('#sliderImages img').length;
  currentSlide = (currentSlide + 1) % total;
  updateSlide();
}

function prevSlide() {
  const total = document.querySelectorAll('#sliderImages img').length;
  currentSlide = (currentSlide - 1 + total) % total;
  updateSlide();
}

function updateSlide() {
  const slideWidth = document.querySelector('#sliderImages img')?.clientWidth || 0;
  document.getElementById('sliderImages').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// ⬅️➡️ Click-Based Slide (left/right side)
document.addEventListener('click', function (e) {
  const modal = document.getElementById('imageSliderModal');
  if (modal.style.display === 'block') {
    const x = e.clientX;
    const middle = window.innerWidth / 2;
    if (x < middle) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
});

// 📱 Swipe Support for Touch Devices
let touchStartX = 0;

document.addEventListener('touchstart', function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function (e) {
  if (document.getElementById('imageSliderModal').style.display !== 'block') return;
  const touchEndX = e.changedTouches[0].screenX;
  const diffX = touchStartX - touchEndX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      nextSlide(); // swipe left
    } else {
      prevSlide(); // swipe right
    }
  }
});



function openCertificateModal(imageSrc, title, description) {
  document.getElementById("certificateImage").src = imageSrc;
  document.getElementById("certificateTitle").textContent = title;
  document.getElementById("certificateDescription").textContent = description;
  document.getElementById("certificateModal").classList.remove("hidden");
}

function closeCertificateModal() {
  document.getElementById("certificateModal").classList.add("hidden");
}



  document.addEventListener("DOMContentLoaded", function () {
    const target = document.getElementById("typewriter-name");
    const text = "Norhan D Kuyab";
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
      if (isDeleting) {
        index--;
        target.textContent = text.substring(0, index);
      } else {
        index++;
        target.textContent = text.substring(0, index);
      }

      if (!isDeleting && index === text.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 2000); // pause before delete
        return;
      }

      if (isDeleting && index === 0) {
        isDeleting = false;
      }

      const speed = isDeleting ? 80 : 120;
      setTimeout(typeEffect, speed);
    }

    typeEffect();
  });




  document.addEventListener("DOMContentLoaded", function () {
    const aboutTarget = document.getElementById("about-typewriter-name");
    const aboutText = "Norhan D Kuyab";
    let i = 0;
    let deleting = false;

    function animateAbout() {
      if (deleting) {
        i--;
        aboutTarget.textContent = aboutText.substring(0, i);
      } else {
        i++;
        aboutTarget.textContent = aboutText.substring(0, i);
      }

      if (!deleting && i === aboutText.length) {
        setTimeout(() => {
          deleting = true;
          animateAbout();
        }, 2000); // wait before deleting
        return;
      }

      if (deleting && i === 0) {
        deleting = false;
      }

      const speed = deleting ? 80 : 120;
      setTimeout(animateAbout, speed);
    }

    animateAbout();
  });
