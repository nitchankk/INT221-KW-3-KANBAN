package com.example.integradeproject.project_management.pmRepositories;

import com.example.integradeproject.project_management.pmEntitities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository <Task , Integer> {

}
