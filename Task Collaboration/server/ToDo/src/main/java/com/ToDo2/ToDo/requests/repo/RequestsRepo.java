package com.ToDo2.ToDo.requests.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ToDo2.ToDo.requests.entities.Requests;

public interface RequestsRepo extends JpaRepository<Requests, Long>{

	

}
