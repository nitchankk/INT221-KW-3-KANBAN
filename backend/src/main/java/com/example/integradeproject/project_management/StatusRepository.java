package com.example.integradeproject.project_management;

import com.example.integradeproject.project_management.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StatusRepository extends JpaRepository  <Status , Integer>{
    Optional<Status> findByStatusName(String statusName);

    List<Status> findByStatusNameContains( String Name );
    boolean existsByStatusName(String name);

}
