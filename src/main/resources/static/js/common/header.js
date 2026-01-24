function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");
}

// header.js

// header.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon-wrapper');

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });

    searchIcon.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });
});

function performSearch(query) {
    if (!query) return;

    // Шаг 1: получаем массив id
    fetch(`/api/v1/search?q=${encodeURIComponent(query)}`)
        .then(res => {
            if (!res.ok) throw new Error('Ошибка поиска');
            return res.json();
        })
        .then(async ids => {
            if (!Array.isArray(ids) || ids.length === 0) {
                localStorage.setItem('searchResults', JSON.stringify([]));
                localStorage.setItem('searchQuery', query);
                window.location.href = '/products/search-results';
                return;
            }

            // Шаг 2: получаем полные данные продуктов
            const products = await Promise.all(
                ids.map(id => fetch(`/api/v1/products/${id}`).then(r => r.json()))
            );

            // Шаг 3: сохраняем и переходим
            localStorage.setItem('searchResults', JSON.stringify(products));
            localStorage.setItem('searchQuery', query);
            window.location.href = ' /products/search-results';
        })
        .catch(err => {
            console.error(err);
            alert('Не удалось выполнить поиск');
        });
}
