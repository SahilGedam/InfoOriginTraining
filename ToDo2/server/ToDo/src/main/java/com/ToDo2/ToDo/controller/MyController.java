package com.ToDo2.ToDo.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import com.ToDo2.ToDo.entities.Tasks;
import com.ToDo2.ToDo.repo.TasksRepo;
//import com.ToDo2.ToDo.services.TaskService;
//import com.todo.ToDoservices.model.User; 

@RestController
public class MyController {
	@GetMapping("/")
	public String home() {
		return "home";
	}
	@Autowired
	private TasksRepo tasksRepo;

	

	@GetMapping(value="/tasks")
	public List<Tasks> getTasks() {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		List<Tasks> t = tasksRepo.findAll();
		for (int i = 0; i < t.size(); i++) 
		{
		 System.out.println(t.get(i));
		if(t.get(i).getTime().compareTo(date)<0) {
			t.get(i).setStatus(false);
		}
		}
	
		return t;
	}
	
//	@GetMapping(value="/tasks")
//	public List<Tasks> getUsers() {
//		return tasksRepo.findAll();
//	}


	@PostMapping(value="/save")
	public ResponseEntity<Object> saveTasks( @RequestBody Tasks task) {
		
		tasksRepo.save(task);

		 return new ResponseEntity<>( HttpStatus.OK);
	}


	@PutMapping(value="/update/{id}")
	public ResponseEntity<Object> updateTasks( @PathVariable long id , @RequestBody Tasks task) {
//		userRepo.update(user);
		Tasks updatedTask = tasksRepo.findById(id).get();
		updatedTask.setTask(task.getTask());
		tasksRepo.save(updatedTask);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@PutMapping(value="/complete/{id}")
	public ResponseEntity<Object> updateStatus( @PathVariable long id , @RequestBody Tasks task) {
//		userRepo.update(user);
		Tasks updatedTask = tasksRepo.findById(id).get();
//		updatedTask.setTask(task.getTask());
		updatedTask.setStatus(false);
		tasksRepo.save(updatedTask);
		return new ResponseEntity<>( HttpStatus.OK);
	}

	@DeleteMapping(value="/delete/{id}")
	public ResponseEntity<Object>  deleteUser( @PathVariable long id) {
		Tasks deleteTask = tasksRepo.findById(id).get();
		tasksRepo.delete(deleteTask);
		return new ResponseEntity<>( HttpStatus.OK);
	}

}
