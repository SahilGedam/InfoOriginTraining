package com.ToDo2.ToDo.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ToDo2.ToDo.tasks.entities.Tasks;
import com.ToDo2.ToDo.tasks.services.ToDoServices;

@RestController
@RequestMapping(value = "/tasks")
public class ToDoController {
	@Autowired
	private ToDoServices toDoServices;



//	 fetch tasks
	@GetMapping(value = "/tasksByUser/{userId}")
	public List<Tasks> getAllTasksByUser(@PathVariable long userId) {
		return toDoServices.getAllTasksByUserId(userId);
	}

// save tasks
	@PostMapping(value = "/saveTask")
	public ResponseEntity<Object> saveTasks(@RequestBody Tasks task) {

		toDoServices.saveTasks(task);

		return new ResponseEntity<>(HttpStatus.OK);
	}

// update task
	@PutMapping(value = "/updateTask/{id}")
	public ResponseEntity<Object> updateTasks(@PathVariable long id, @RequestBody Tasks task) {

		toDoServices.updateTasks(id, task);
		return new ResponseEntity<>(HttpStatus.OK);

	}

// update status as complete
	@PutMapping(value = "/completeTask/{id}")
	public ResponseEntity<Object> updateStatus(@PathVariable long id) {
		toDoServices.updateStatus(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}

// delete task
	@DeleteMapping(value = "/deleteTask/{id}")
	public ResponseEntity<Object> deleteTask(@PathVariable long id) {
		toDoServices.deleteTask(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}
	
////fetch tasks
//	@GetMapping(value = "/allTasks")
//	public List<Tasks> getAllTasks() {
//		return toDoServices.getAllTasks();
//	}
}
