package com.ToDo2.ToDo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ToDo2.ToDo.entities.Tasks;

public interface TasksRepo extends JpaRepository <Tasks,Long> {

}
