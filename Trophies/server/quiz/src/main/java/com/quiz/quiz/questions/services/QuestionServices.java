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
		cityRepo.setCorrectZero();
		cityRepo.setIncorrectZero();
		questionRepo.setStatusNull();
		questionRepo.setSelectedZero();

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
		updateQuestion.setSelected(answer);
		questionRepo.save(updateQuestion);
		updateStatusOfCity(cityName);

	}

	public void updateStatusOfCity(String cityName) {

		Cities citySelected = cityRepo.getCityByCityName(cityName);
		List<Questions> listOfQuestions = questionRepo.getQuestionByCityName(cityName);
		int questionsCompleted = 0;
		int questionsAttempted = 0;

		for (int i = 0; i < listOfQuestions.size(); i++) {
			if (listOfQuestions.get(i).getStatus() == null) {
				continue;

			}
			else if (listOfQuestions.get(i).getStatus().equals("completed")) {
				questionsCompleted++;
			} else if (listOfQuestions.get(i).getStatus().equals("attempted")) {
				questionsAttempted++;
			}

		}

		citySelected.setCorrectAnswers(questionsCompleted);
		citySelected.setIncorrectAnswers(questionsAttempted);

		cityRepo.save(citySelected);

	}

}
