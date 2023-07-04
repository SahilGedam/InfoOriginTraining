package com.ToDo2.ToDo.users.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import com.ToDo2.ToDo.requests.entities.Requests;
import com.ToDo2.ToDo.tasks.entities.Tasks;
import com.ToDo2.ToDo.users.entities.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {
	
	@Query("SELECT user FROM Users user WHERE user.userName = :user_name and user.password = :password")
	public Users getUserByLogin(@RequestParam("user_name") String user_name , @RequestParam("password") String password);
	
	@Query("SELECT user FROM Users user WHERE user.userName = :user_name")
	public Users getUserByUserName(@RequestParam("user_name") String user_name );
	
	@Query("SELECT req FROM Requests req WHERE req.receiverName = :receiver_name")
	public List <Requests> getRequestByUserName(@RequestParam("receiver_name") String receiver_name );
	
	@Query("SELECT task FROM Tasks task WHERE task.task = :task_name")
	public Tasks getTasksByTaskName(String task_name);

}
