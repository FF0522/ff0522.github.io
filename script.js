document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. 打字機效果 (Typing Effect) ===
    const textElement = document.getElementById('typing-text');
    // 在這裡輸入你想打出的字，可以使用陣列來輪播
    const phrases = ["高中生。", "演算法愛好者。", "資安工程師。"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150; // 打字速度

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // 正在刪除
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // 刪除速度變快
        } else {
            // 正在打字
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // 正常打字速度
        }

        // 狀態判斷
        if (!isDeleting && charIndex === currentPhrase.length) {
            // 打完了，停頓一下再開始刪除
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            // 刪完了，切換到下一句
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // 啟動打字機
    if (textElement) {
        type();
    }

    // === 2. 捲動淡入效果 (Scroll Reveal - 保留原本) ===
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // 為了讓 CSS transition 能運作，初始狀態要在 JS 設定或 CSS 先設定好
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.4s, border-color 0.4s'; // 整合原本的 transition
        scrollObserver.observe(card);
    });
});