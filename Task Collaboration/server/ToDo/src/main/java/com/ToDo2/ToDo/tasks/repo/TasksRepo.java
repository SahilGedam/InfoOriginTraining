package com.ToDo2.ToDo.tasks.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ToDo2.ToDo.tasks.entities.Tasks;

public interface TasksRepo extends JpaRepository <Tasks,Long> {

	@Query("SELECT taskList FROM Tasks taskList WHERE taskList.userId = :user_id")
	public List<Tasks> getAllTasksByUserId(long user_id);
		
	@Query("SELECT taskList FROM Tasks taskList WHERE taskList.partnerId = :user_id")
	public List<Tasks> getAllTasksByPartnerId(long user_id);
	
	
	
	@Query("SELECT todoTask FROM Tasks todoTask WHERE todoTask.task = :task and todoTask.userId = :userId")
	public Tasks getTaskByTaskNameAndUserId(String task, long userId);
}