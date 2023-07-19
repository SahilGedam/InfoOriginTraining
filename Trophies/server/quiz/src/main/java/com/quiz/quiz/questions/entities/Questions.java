package com.quiz.quiz.questions.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")
public class Questions {
	@Id
	@Column(name = "id_questions")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long questionId;
	@Column(name = "question_body")
	private String questionBody;
	@Column(name = "questions_options")
	private String questionOptions;
	@Column(name = "correct_anser")
	private long correctAnswer;
	@Column(name = "status")
	private String status;
	@Column(name = "question_city")
	private String questionCity;
	@Column(name = "question_no")
	private long questionNo;
	@Column(name = "selected")
	private long selected;
	public long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}
	public String getQuestionBody() {
		return questionBody;
	}
	public void setQuestionBody(String questionBody) {
		this.questionBody = questionBody;
	}
	public String getQuestionOptions() {
		return questionOptions;
	}
	public void setQuestionOptions(String questionOptions) {
		this.questionOptions = questionOptions;
	}
	public long getCorrectAnswer() {
		return correctAnswer;
	}
	public void setCorrectAnswer(long correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getQuestionCity() {
		return questionCity;
	}
	public void setQuestionCity(String questionCity) {
		this.questionCity = questionCity;
	}
	public long getQuestionNo() {
		return questionNo;
	}
	public void setQuestionNo(long questionNo) {
		this.questionNo = questionNo;
	}
	public long getSelected() {
		return selected;
	}
	public void setSelected(long selected) {
		this.selected = selected;
	}
	@Override
	public String toString() {
		return "Questions [questionId=" + questionId + ", questionBody=" + questionBody + ", questionOptions="
				+ questionOptions + ", correctAnswer=" + correctAnswer + ", status=" + status + ", questionCity="
				+ questionCity + ", questionNo=" + questionNo + ", selected=" + selected + "]";
	}
	public Questions(long questionId, String questionBody, String questionOptions, long correctAnswer, String status,
			String questionCity, long questionNo, long selected) {
		super();
		this.questionId = questionId;
		this.questionBody = questionBody;
		this.questionOptions = questionOptions;
		this.correctAnswer = correctAnswer;
		this.status = status;
		this.questionCity = questionCity;
		this.questionNo = questionNo;
		this.selected = selected;
	}
	public Questions() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
