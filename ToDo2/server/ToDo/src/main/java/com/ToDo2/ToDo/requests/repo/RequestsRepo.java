package com.ToDo2.ToDo.requests.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import com.ToDo2.ToDo.requests.entities.Requests;
import com.ToDo2.ToDo.users.entities.Users;

public interface RequestsRepo extends JpaRepository<Requests, Long>{

	
//	@Query("SELECT request FROM Requests user WHERE request.receiverName = :user_name")
//	public Requests getRequestByUserName(@RequestParam("user_name") String user_name );
}
