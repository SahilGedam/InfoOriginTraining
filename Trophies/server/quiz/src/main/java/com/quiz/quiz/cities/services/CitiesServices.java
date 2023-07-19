package com.quiz.quiz.cities.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.quiz.cities.entities.Cities;
import com.quiz.quiz.cities.repo.CityRepo;


@Service
public class CitiesServices {
	
	@Autowired
	CityRepo cityRepo;
	
	
	
	public List <Cities> getAllCities(){
		List citiesList = cityRepo.findAll();
		return citiesList;
	}


}
