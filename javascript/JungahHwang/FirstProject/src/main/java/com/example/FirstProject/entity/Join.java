package com.example.FirstProject.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class Join {
    private String id;
    private String pw;
    private String name;
    private String tel;
    private String addr;
    private Date regDate;
}
