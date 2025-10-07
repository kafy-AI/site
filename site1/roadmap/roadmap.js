document.addEventListener('DOMContentLoaded', () => {

    const fadeInTargets = document.querySelectorAll('.fade-in-target');

    // IntersectionObserverのオプション設定
    const options = {
        root: null, // ビューポートを基準にする
        rootMargin: '0px 0px -100px 0px', // 画面下から100pxの位置で発火
        threshold: 0.1 // 10%見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // isIntersectingがtrue (=画面内に入った) なら
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 全てのターゲットを監視
    fadeInTargets.forEach(target => {
        observer.observe(target);
    });
});