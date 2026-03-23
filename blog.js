const params = new URLSearchParams(window.location.search);
const category = params.get('category');

const titles = {
  cp: "競程",
  security: "資安",
  life: "日常生活"
};

document.getElementById('title').innerText = titles[category] || "所有文章";

fetch('posts.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('post-list');

    // 篩選分類
    const filtered = data.filter(post => post.category === category);

    filtered.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('post-item');

      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.date}</p>
      `;

      // ✨ 加入這段：點擊後跳轉到文章頁面，並帶上 title 參數
      div.onclick = () => {
        window.location.href = `post.html?title=${encodeURIComponent(post.title)}`;
      };

      container.appendChild(div);
    });
  });