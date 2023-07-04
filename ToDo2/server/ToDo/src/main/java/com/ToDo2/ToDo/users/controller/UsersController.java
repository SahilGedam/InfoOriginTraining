package com.ToDo2.ToDo.users.controller;

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

import com.ToDo2.ToDo.requests.entities.Requests;
import com.ToDo2.ToDo.users.entities.Users;
import com.ToDo2.ToDo.users.services.UsersServices;

@RestController
@RequestMapping(value = "/users")
public class UsersController {
	@Autowired
	UsersServices usersServices;

	@GetMapping(value = "/checkAvailable/{userName}")
	public Boolean checkUserAvailable(@PathVariable String userName) {
		Boolean available = usersServices.checkAvailable(userName);
		return available;
	}

	@GetMapping(value = "/suggestUserName/{firstName}/{lastName}")

	public List<String> suggestUserName(@PathVariable String firstName, @PathVariable String lastName) {

		List<String> returnList = usersServices.usernameSuggestion(firstName, lastName);
		return returnList;
	}

	// save users
	@PostMapping(value = "/saveUser")
	public ResponseEntity<Object> saveUserDetails(@RequestBody Users newUserBody) {
		usersServices.saveUser(newUserBody);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping(value = "/getUser/{userName}/{password}")
	public Users getUserLogin(@PathVariable String userName, @PathVariable String password) {
		Users loginUser = usersServices.getUserByLogin(userName, password);
		return loginUser;
	}

	// for new requirements below
	// fetch users
	@GetMapping(value = "/allUsers")
	public List<Users> getAllUsers() {
		return usersServices.getAllUsers();
	}

//
	@PostMapping(value = "/createRequest")
	public ResponseEntity<Object> createRequest(@RequestBody Requests newRequestBody) {
		usersServices.createRequest(newRequestBody);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping(value = "/checkRequests/{userName}")
	public List<Requests> getRequestByUserName(@PathVariable String userName) {
		return usersServices.getAllRequestsByUserName(userName);
	}

	@PutMapping(value = "/acceptRequest/{userName}")
	public String acceptRequest(@PathVariable String userName, @RequestBody Requests newRequestBody) {
	String returnMessage =	usersServices.acceptRequest(userName, newRequestBody);
		return returnMessage;
	}

	@DeleteMapping(value = "deleteRequest/{requestId}")
	public ResponseEntity<Object> deleteRequest(@PathVariable long requestId) {
		usersServices.deleteRequest(requestId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
