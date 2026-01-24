package ru.stroy1click.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InfoController {

    @GetMapping("/about-us")
    public String aboutUsPage(){
        return "info/about-us";
    }

    @GetMapping("/contacts")
    public String contactsPage(){
        return "info/contacts";
    }
}
