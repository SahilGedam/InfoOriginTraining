package com.ToDo2.ToDo.requests.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ToDo2.ToDo.requests.entities.Requests;
import com.ToDo2.ToDo.requests.services.RequestServices;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping(value = "/requests")
public class RequestController {

	
//	@Autowired
//	RequestServices requestServices;
//	
//	
//	@PostMapping(value = "/createRequest")
//	public ResponseEntity<Object> createRequest(@RequestBody Requests newRequestBody) {
//		System.out.println(newRequestBody.toString());
//		requestServices.createRequest(newRequestBody);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
}
