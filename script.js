document.addEventListener("DOMContentLoaded", () => {
    // 1. Зберігання даних у localStorage та вивід у футер
    const systemInfo = {
        os: navigator.platform,
        browser: navigator.userAgent,
        timeVisited: new Date().toLocaleString()
    };
    localStorage.setItem('userSystemInfo', JSON.stringify(systemInfo));

    const footer = document.getElementById('site-footer');
    const storedData = JSON.parse(localStorage.getItem('userSystemInfo'));
    if (footer && storedData) {
        const infoPara = document.createElement('p');
        infoPara.style.fontSize = "11px";
        infoPara.style.marginTop = "10px";
        infoPara.textContent = `Ваша система: ${storedData.os} | Браузер: ${storedData.browser}`;
        footer.appendChild(infoPara);
    }

    // 2. Отримання коментарів (Варіант 1)
    const commentsContainer = document.getElementById('comments-container');
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(response => response.json())
        .then(data => {
            commentsContainer.innerHTML = ''; // Очищуємо текст завантаження
            data.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.style.borderBottom = "1px solid #eee";
                commentDiv.style.padding = "10px 0";
                commentDiv.innerHTML = `
                    <p style="margin:0; font-weight:bold; color:#6f42c1;">${comment.name}</p>
                    <p style="margin:5px 0; font-size:0.9rem;">${comment.body}</p>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(err => {
            commentsContainer.innerHTML = '<p>Не вдалося завантажити відгуки.</p>';
        });

    // 3. Модальне вікно через 1 хвилину
    setTimeout(() => {
        const modal = document.getElementById('contactModal');
        if (modal) modal.style.display = 'block';
    }, 2000);

    // 4. Автоматична тема за часом
    const currentHour = new Date().getHours();
    if (currentHour < 7 || currentHour >= 21) {
        document.body.classList.add('dark-theme');
    }
});

// Перемикач теми вручну
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}