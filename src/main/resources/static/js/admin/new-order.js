function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    if(menu) menu.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ordersContainer');
    const emptyState = document.getElementById('emptyState');
    const statusIndicator = document.getElementById('connectionStatus');

    const eventSource = new EventSource('/api/v1/notifications');

    eventSource.onopen = () => {
        statusIndicator.textContent = "● Подключено к серверу (SSE)";
        statusIndicator.classList.add('active');
        statusIndicator.classList.remove('error');
    };

    eventSource.onerror = (err) => {
        console.error("SSE Error:", err);
        statusIndicator.textContent = "● Ошибка соединения. Переподключение...";
        statusIndicator.classList.remove('active');
        statusIndicator.classList.add('error');
    };

    eventSource.onmessage = (event) => {
        try {
            const order = JSON.parse(event.data);

            if (emptyState && emptyState.style.display !== 'none') {
                emptyState.style.display = 'none';
            }

            const orderElement = createOrderCard(order);

            container.prepend(orderElement);


        } catch (e) {
            console.error("Ошибка парсинга JSON заказа:", e);
        }
    };
});

/**
 * Создает DOM-элемент карточки заказа на основе OrderDto
 */
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';

    const date = new Date(order.createdAt).toLocaleString('ru-RU', {
        day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
    });

    let statusClass = 'status-new';
    let statusText = order.orderStatus; // Или маппинг на русский: mapStatus(order.orderStatus)

    const itemsHtml = order.orderItems.map(item => `
            <div class="item-row">
                <span>Товар ID: <b>${item.productId}</b></span>
                <span>x ${item.quantity} шт.</span>
            </div>
        `).join('');

    const notesHtml = order.notes
        ? `<div class="order-notes">💬 "${order.notes}"</div>`
        : '';

    card.innerHTML = `
            <div class="order-header">
                <div class="order-id">Заказ #${order.id}</div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>

            <div class="order-info-grid">
                <div class="info-item">
                    <label>Телефон клиента</label>
                    <span>${formatPhone(order.contactPhone)}</span>
                </div>
                <div class="info-item">
                    <label>Дата создания</label>
                    <span>${date}</span>
                </div>
            </div>

            <div class="info-item">
                <label>Состав заказа:</label>
                <div class="order-items-list">
                    ${itemsHtml}
                </div>
            </div>

            ${notesHtml}

            <div style="margin-top: 15px; text-align: right;">
                 <a href="/admin/orders/${order.id}" style="color: #3498db; text-decoration: none; font-size: 14px;">Открыть полное редактирование →</a>
            </div>
        `;

    return card;
}

function formatPhone(phone) {
    if(!phone) return "Не указан";
    return phone.replace(/(\+7|8)(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($2) $3-$4-$5");
}