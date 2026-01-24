package ru.stroy1click.web.attribute.controller;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.stroy1click.web.attribute.client.AttributeOption;
import ru.stroy1click.web.attribute.dto.AttributeOptionDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attribute-options")
@RateLimiter(name = "productTypeAttributeLimiter")
public class AttributeOptionController {

    private final AttributeOption attributeOption;

    @GetMapping("/{id}")
    public ResponseEntity<AttributeOptionDto> get(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.attributeOption.get(id));
    }

    @GetMapping
    public List<AttributeOptionDto> getProductTypeAttributeValuesByProductTypeId(@RequestParam("productTypeId") Integer productTypeId){
        return this.attributeOption.getProductTypeAttributeValuesByProductTypeId(productTypeId);
    }
}
