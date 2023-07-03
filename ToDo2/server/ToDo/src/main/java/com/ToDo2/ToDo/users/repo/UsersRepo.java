package com.ToDo2.ToDo.users.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import com.ToDo2.ToDo.users.entities.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {
	
	@Query("SELECT user FROM Users user WHERE user.userName = :user_name and user.password = :password")
	public Users getUserByLogin(@RequestParam("user_name") String user_name , @RequestParam("password") String password);
	
	@Query("SELECT user FROM Users user WHERE user.userName = :user_name")
	public Users checkAvailableUserName(@RequestParam("user_name") String user_name );

}
