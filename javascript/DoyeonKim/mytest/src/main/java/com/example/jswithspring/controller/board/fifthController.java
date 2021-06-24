package com.example.jswithspring.controller.board;

import com.example.jswithspring.service.BoardService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller //원래는 컨트롤러 묶어놔야함
public class fifthController {

    @Autowired
    private BoardService service;

    @GetMapping("/lists")
    public String getlists (Model model) {
        log.info("getlists()");

       // model.addAllAttributes("lists", service.list());

        return "/board/fifth/lists";
    }
}
