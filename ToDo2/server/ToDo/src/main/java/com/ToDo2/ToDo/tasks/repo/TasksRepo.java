package com.ToDo2.ToDo.tasks.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ToDo2.ToDo.tasks.entities.Tasks;

public interface TasksRepo extends JpaRepository <Tasks,Long> {

	@Query("SELECT taskList FROM Tasks taskList WHERE taskList.userId = :user_id")
	public List<Tasks> getAllTasksByUserId(long user_id);
		
	
}