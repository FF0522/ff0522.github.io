const username = "FF0522"; // 改成你的！

async function loadProjects() {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();

    const container = document.getElementById("projects");

    data.forEach(repo => {
        if (repo.fork) return; // 跳過 fork

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>
        `;

        card.onclick = () => {
            window.open(repo.html_url, "_blank");
        };

        container.appendChild(card);
    });
}

loadProjects();
