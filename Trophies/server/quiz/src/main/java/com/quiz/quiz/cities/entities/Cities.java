package com.quiz.quiz.cities.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
public class Cities {
	@Id
	@Column(name = "id_cities")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cityId;
	@Column(name = "city_name")
	private String cityName;
	@Column(name = "correct_answers")
	private long correctAnswers;
	@Column(name = "incorrect_answers")
	private long incorrectAnswers;
	public long getCityId() {
		return cityId;
	}
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public long getCorrectAnswers() {
		return correctAnswers;
	}
	public void setCorrectAnswers(long correctAnswers) {
		this.correctAnswers = correctAnswers;
	}
	public long getIncorrectAnswers() {
		return incorrectAnswers;
	}
	public void setIncorrectAnswers(long incorrectAnswers) {
		this.incorrectAnswers = incorrectAnswers;
	}
	@Override
	public String toString() {
		return "Cities [cityId=" + cityId + ", cityName=" + cityName + ", correctAnswers=" + correctAnswers
				+ ", incorrectAnswers=" + incorrectAnswers + "]";
	}
	public Cities(long cityId, String cityName, long correctAnswers, long incorrectAnswers) {
		super();
		this.cityId = cityId;
		this.cityName = cityName;
		this.correctAnswers = correctAnswers;
		this.incorrectAnswers = incorrectAnswers;
	}
	public Cities() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
