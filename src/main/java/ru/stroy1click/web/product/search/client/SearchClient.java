package ru.stroy1click.web.product.search.client;

import java.util.List;

public interface SearchClient {

    List<Integer> getProductIds(String query);
}
