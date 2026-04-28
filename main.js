'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}
//wa 

function sendToWhatsApp(event) {
    event.preventDefault(); // Mencegah form melakukan submit standar

    let phoneNumber = "6281292000136"; // Ganti dengan nomor WhatsApp tujuan
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Format pesan yang akan dikirim ke WhatsApp
    let whatsappMessage = `Hello, Naufal Nama saya *${fullname}*.\nEmail saya: *${email}*\\n${message}`;

    // Encode URI agar sesuai dengan format URL
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirect ke WhatsApp
    window.open(whatsappURL, "_blank");
}

//swipper
document.addEventListener('DOMContentLoaded', function () {
    const projectLinks = document.querySelectorAll('.project-link');
    const closePopupButtons = document.querySelectorAll('.close-popup');

    projectLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            popup.classList.add('show');

            // Inisialisasi Swiper hanya jika belum diinisialisasi
            if (!popup.querySelector('.swiper-container').classList.contains('swiper-initialized')) {
                new Swiper(`#${popupId} .swiper-container`, {
                    loop: true,
                    effect: 'slide',
                    speed: 400,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: `#${popupId} .swiper-button-next`,
                        prevEl: `#${popupId} .swiper-button-prev`,
                    },
                    pagination: {
                        el: `#${popupId} .swiper-pagination`,
                        clickable: true,
                    },
                });
            }
        });
    });

    closePopupButtons.forEach(button => {
        button.addEventListener('click', function () {
            const popup = this.closest('.popup');
            popup.classList.remove('show');
        });
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup')) {
            e.target.classList.remove('show');
        }
    });
});

// ════════════════════════════════════════
// LIGHTBOX — click image to zoom + swipe
// ════════════════════════════════════════
(function () {
    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev  = document.getElementById('lightboxPrev');
    const lightboxNext  = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let images = [];
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt || '';
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
        lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
        lightboxCounter.style.display = images.length > 1 ? 'block' : 'none';
    }

    function openLightbox(clickedImg) {
        const popup = clickedImg.closest('.popup');
        const pdGrid = clickedImg.closest('.pd-screenshot-grid');
        if (popup) {
            images = Array.from(popup.querySelectorAll('.swiper-slide img'));
        } else if (pdGrid) {
            images = Array.from(pdGrid.querySelectorAll('img'));
        } else {
            images = [clickedImg];
        }
        currentIndex = images.indexOf(clickedImg);
        if (currentIndex === -1) currentIndex = 0;
        showImage(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        images = [];
    }

    // Click image to open
    document.addEventListener('click', function (e) {
        const img = e.target.closest('.popup-content .swiper-slide img, .pd-screenshot-item img');
        if (img) { e.preventDefault(); openLightbox(img); }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); showImage(currentIndex - 1); });
    lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); showImage(currentIndex + 1); });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   showImage(currentIndex - 1);
        if (e.key === 'ArrowRight')  showImage(currentIndex + 1);
    });

    // Touch swipe
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? showImage(currentIndex + 1) : showImage(currentIndex - 1);
        }
    }, { passive: true });
})();
window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';
});

// ════════════════════════════════════════
// BACK TO TOP BUTTON
// ════════════════════════════════════════
(function () {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ════════════════════════════════════════
// FADE-IN ON SCROLL (Intersection Observer)
// ════════════════════════════════════════
(function () {
    const fadeEls = document.querySelectorAll('.service-item, .exp-card, .edu-card, .project-item, .stat-item, .contact-cta-content');
    fadeEls.forEach(function (el) { el.classList.add('fade-in'); });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(function (el) { observer.observe(el); });
})();
