package com.example.integradeproject.project_management.pmEntitities;


import com.example.integradeproject.project_management.pmEntitities.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Data
@Table(name = "tasks", schema = "project_management")


public class Task2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;
    private String title ;
    private String description ;
    private String assignees ;

    @ManyToOne
    @JoinColumn(referencedColumnName = "statusId" ,name ="statusId")
    private Status statusId ;

    @Column(name = "createdOn", updatable = false, insertable = false)
    private Date createdOn;
    @Column(name = "updatedOn", updatable = false, insertable = false)
    private Date updatedOn;



}

