package com.example.integradeproject.entities;

import com.example.integradeproject.services.CharConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Data
@Table(name = "tasks")


public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;
    private String title ;
    private String description ;
    private String assignees ;
    @Convert(converter = CharConverter.class)
    private String status ;

    @Column(name = "createdOn", updatable = false, insertable = false)
    private Date createdOn;
    @Column(name = "updatedOn", updatable = false, insertable = false)
    private Date updatedOn;




}
