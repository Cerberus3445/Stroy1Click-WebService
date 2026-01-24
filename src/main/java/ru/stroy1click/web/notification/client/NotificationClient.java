package ru.stroy1click.web.notification.client;


import reactor.core.publisher.Flux;
import ru.stroy1click.web.order.dto.OrderDto;

public interface NotificationClient {

   Flux<OrderDto> getNewOrders();
}
