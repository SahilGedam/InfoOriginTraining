package com.quiz.quiz.cities.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.quiz.quiz.cities.entities.Cities;



public interface CityRepo extends JpaRepository<Cities, Long> {

	@Query("SELECT city FROM Cities city WHERE city.cityName = :cityName ")
	public Cities getCityByCityName(@RequestParam("cityName") String cityName);

	@Modifying
	@Transactional
	@Query(value = "update cities set incorrect_answers = 0", nativeQuery = true)
	public void setIncorrectZero();
	
	@Modifying
	@Transactional
	@Query(value = "update cities set correct_answers = 0", nativeQuery = true)
	public void setCorrectZero();

}
