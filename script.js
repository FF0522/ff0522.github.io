// 確保網頁元素都載入完成後再執行
document.addEventListener('DOMContentLoaded', () => {
    
    // 選取所有需要淡入效果的卡片
    const cards = document.querySelectorAll('.card');

    // 設定 Intersection Observer (觀察元素是否進入視窗)
    const observerOptions = {
        threshold: 0.1, // 元素出現 10% 時觸發
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 當元素進入畫面，加上動畫的 class 或直接改變樣式
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // 觸發後就取消觀察，讓動畫只執行一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 初始化卡片的初始狀態（透明且稍微往下移），並開始觀察
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(card);
    });
});