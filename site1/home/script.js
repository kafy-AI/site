document.addEventListener('DOMContentLoaded', () => {

    // --- フェードインアニメーション ---
    const fadeInTargets = document.querySelectorAll('.fade-in-target');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 一度表示されたら監視を解除
            }
        });
    }, {
        rootMargin: '0px 0px -150px 0px',
        threshold: 0.5 // 20%見えたら実行
    });

    fadeInTargets.forEach(target => {
        observer.observe(target);
    });


    // --- 画像スライダー ---
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (slider && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // ドットの生成
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function startInterval() {
             slideInterval = setInterval(showNextSlide, 5000); // 5秒ごとにスライド
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // イベントリスナー
        nextBtn.addEventListener('click', () => {
            showNextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            showPrevSlide();
            resetInterval();
        });

        startInterval();
    }
});

const headerNav = document.querySelector('.header-nav');

// 画面を10pxでもスクロールしたら .scrolled クラスを付与
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        headerNav.classList.add('scrolled');
    } else {
        headerNav.classList.remove('scrolled');
    }
});