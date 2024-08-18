package com.example.integradeproject.project_management;

import com.example.integradeproject.project_management.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository <Task , Integer> {

}
