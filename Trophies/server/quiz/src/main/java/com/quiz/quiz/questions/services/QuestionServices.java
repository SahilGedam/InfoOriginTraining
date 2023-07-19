package com.quiz.quiz.questions.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.quiz.quiz.cities.entities.Cities;
import com.quiz.quiz.cities.repo.CityRepo;
import com.quiz.quiz.questions.entities.Questions;
import com.quiz.quiz.questions.repo.QuestionRepo;

@Service
public class QuestionServices {

	@Autowired
	QuestionRepo questionRepo;

	@Autowired
	CityRepo cityRepo;



	public void resetAll() {
		cityRepo.setStatusNull();
		questionRepo.setStatusNull();

	}

	public Questions getQuestionByCityName(@PathVariable String cityName, @PathVariable long questionId) {
		
		Questions returnQuestion = questionRepo.getQuestionByCityNameAndId(cityName, questionId);
		returnQuestion.setCorrectAnswer(0);

		return returnQuestion;

	}

	public void updateStatusOfQuestion(@PathVariable String cityName, @PathVariable long questionId,
			@PathVariable long answer) {
		Questions updateQuestion = questionRepo.getQuestionByCityNameAndId(cityName, questionId);
		if (updateQuestion.getCorrectAnswer() == answer) {
			updateQuestion.setStatus("completed");
		} else {
			updateQuestion.setStatus("attempted");
		}
		questionRepo.save(updateQuestion);

	}

	public void updateStatusOfCity(String cityName) {

		Cities citySelected = cityRepo.getCityByCityName(cityName);
		List<Questions> listOfQuestions = questionRepo.getQuestionByCityName(cityName);
		int questionsCompleted = 0;
		int questionsAttempted = 0;

		for (int i = 0; i < listOfQuestions.size(); i++) {
			if (listOfQuestions.get(i).getStatus() == null) {

			}

			else if (listOfQuestions.get(i).getStatus().equals("completed")) {
				questionsCompleted++;
			} else if (listOfQuestions.get(i).getStatus().equals("attempted")) {
				questionsAttempted++;
			}

		}

		if (questionsCompleted == 5) {
			citySelected.setStatus("completed");

		} else if (questionsAttempted > 0) {
			citySelected.setStatus("attempted");

		} else if (questionsCompleted > 0 && questionsCompleted < 5) {
			citySelected.setStatus("attempted");
		}
		cityRepo.save(citySelected);

	}

}
