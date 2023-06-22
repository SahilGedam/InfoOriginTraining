package com.ToDo2.ToDo.controller;

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
	public List<Tasks> getUsers() {
		return tasksRepo.findAll();
	}


	@PostMapping(value="/save")
	public ResponseEntity<Object> saveUser( @RequestBody Tasks task) {
		
		tasksRepo.save(task);

		 return new ResponseEntity<>( HttpStatus.OK);
	}


	@PutMapping(value="/update/{id}")
	public ResponseEntity<Object> updateUser( @PathVariable long id , @RequestBody Tasks task) {
//		userRepo.update(user);
		Tasks updatedUser = tasksRepo.findById(id).get();
		updatedUser.setTask(task.getTask());
		tasksRepo.save(updatedUser);
		return new ResponseEntity<>( HttpStatus.OK);
	}

	@DeleteMapping(value="/delete/{id}")
	public ResponseEntity<Object>  deleteUser( @PathVariable long id) {
		Tasks deleteUser = tasksRepo.findById(id).get();
		tasksRepo.delete(deleteUser);
		return new ResponseEntity<>( HttpStatus.OK);
	}

}
