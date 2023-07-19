package com.quiz.quiz.questions.repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;


import com.quiz.quiz.questions.entities.Questions;



public interface QuestionRepo extends JpaRepository <Questions , Long> {

	
	
	@Query("SELECT quest FROM Questions quest WHERE quest.questionCity = :questionCity and quest.questionNo = :questionNo")
	public Questions getQuestionByCityNameAndId(@RequestParam("questionCity") String questionCity , @RequestParam("questionNo") long questionNo);
	
	@Query("SELECT quest FROM Questions quest WHERE quest.questionCity = :questionCity ")
	public List <Questions> getQuestionByCityName(@RequestParam("questionCity") String questionCity );
	
	@Modifying @Transactional @Query(value = "update questions set status = null", nativeQuery = true)
	public void setStatusNull();
}
