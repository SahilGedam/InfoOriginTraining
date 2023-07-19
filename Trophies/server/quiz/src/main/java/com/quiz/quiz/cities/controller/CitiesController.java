package com.quiz.quiz.cities.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz.cities.entities.Cities;
import com.quiz.quiz.cities.services.CitiesServices;

@RestController
@RequestMapping(value = "/cities")
public class CitiesController {

	@Autowired
	CitiesServices citiesServices;

	@GetMapping(value = "/cities")
	public List<Cities> getAllCities() {
		return citiesServices.getAllCities();
	}

}
