package com.example.integradeproject.dtos;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class TaskIdDTO {
    private String title;
    private String description;
    private String assignees;
    private String status;
    private Timestamp createdOn;
    private Timestamp updatedOn;
}



