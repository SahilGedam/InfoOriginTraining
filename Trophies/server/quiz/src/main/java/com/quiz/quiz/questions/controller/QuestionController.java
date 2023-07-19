package com.quiz.quiz.questions.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz.questions.entities.Questions;
import com.quiz.quiz.questions.services.QuestionServices;

@RestController
@RequestMapping(value = "/questions")
public class QuestionController {
	@Autowired
	QuestionServices questionServices;



	@GetMapping(value = "/questionCity/{cityName}/{questionId}")
	public Questions getQuestionByCity(@PathVariable String cityName, @PathVariable long questionId) {
		return questionServices.getQuestionByCityName(cityName, questionId);
	}

	@PutMapping(value = "/updateStatus/{cityName}/{questionId}/{answer}")
	public ResponseEntity<Object> updateStatus(@PathVariable String cityName, @PathVariable long questionId,
			@PathVariable long answer) {
		questionServices.updateStatusOfQuestion(cityName, questionId, answer);

		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/updateStatusOfCity/{cityName}")
	public ResponseEntity<Object> updateStatusOfCity(@PathVariable String cityName
		) {
		questionServices.updateStatusOfCity(cityName);

		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PutMapping(value = "/reset")
	public ResponseEntity<Object> resetAll(){
		questionServices.resetAll();
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
