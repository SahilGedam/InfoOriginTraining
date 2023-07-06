package com.ToDo2.ToDo.users.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ToDo2.ToDo.requests.entities.Requests;
import com.ToDo2.ToDo.requests.repo.RequestsRepo;
import com.ToDo2.ToDo.tasks.entities.Tasks;
import com.ToDo2.ToDo.tasks.repo.TasksRepo;
import com.ToDo2.ToDo.users.entities.Users;
import com.ToDo2.ToDo.users.repo.UsersRepo;

@Service
public class UsersServices {
	@Autowired
	UsersRepo usersRepo;
	@Autowired
	RequestsRepo requestsRepo;
	@Autowired
	private TasksRepo tasksRepo;

// to check if username is available
	public Boolean checkAvailable(@PathVariable String userName) {
		Users userInDb = usersRepo.getUserByUserName(userName);
		if (userInDb != null) {
			return false;
		} else {
			return true;
		}
	}

// function help in creating new random usernames
	public String validateUserNameSuggestion(String userName) {
		String tempUserName = userName;
		String suggestedUserName = "";
		Random rand = new Random();
		Boolean available = false;
		while (available == false) {

			available = checkAvailable(tempUserName);

			if (available == true) {
				suggestedUserName = tempUserName;
				break;
			}
			int randomNum = rand.nextInt((9 - 1) + 1) + 1;
			tempUserName = tempUserName + randomNum;
		}

		return suggestedUserName;
	}

// to provide username suggestion
	public List<String> usernameSuggestion(@PathVariable String firstName, @PathVariable String lastName) {
		List<String> returnList = new ArrayList();
		Random rand = new Random();
		returnList.add(0, validateUserNameSuggestion(firstName + lastName));
		returnList.add(1, validateUserNameSuggestion(firstName + lastName + rand.nextInt((9 - 1) + 1)));
		returnList.add(2, validateUserNameSuggestion(firstName + lastName + rand.nextInt((9 - 1) + 1)));
		return returnList;
	}

//save user in db
	public Users saveUser(@RequestBody Users newUserBody) {
		usersRepo.save(newUserBody);
		return newUserBody;
	}

// login user
	public Users getUserByLogin(@PathVariable String userName, @PathVariable String password) {
		Users loginUser = usersRepo.getUserByLogin(userName, password);
		return loginUser;
	}

// get all usernames to select as partner
	public List<String> getAllUserNames() {
		List<Users> usersList = usersRepo.findAll();
		List<String> userNameList = new ArrayList<String>();
		
		for(int i =0;i<usersList.size();i++) {
			userNameList.add(usersList.get(i).getUserName());
		}
		return userNameList;
	}

	public void createRequest(@RequestBody Requests newRequestBody) {
		requestsRepo.save(newRequestBody);

	}

	public List<Requests> getAllRequestsByUserName(@PathVariable String userName) {
		return usersRepo.getRequestByUserName(userName);
	}

	public String acceptRequest(@PathVariable String userName, @RequestBody Requests newRequestBody) {
		// user in db is the one who accepts request
		Users userInDb = usersRepo.getUserByUserName(userName);
		long partnerId = userInDb.getUserid();
		long bookedTime = userInDb.getBookedTime();
		long requestId = newRequestBody.getRequestId();
		long bookingTime = newRequestBody.getRequestedTime();
		long newTotalTime = bookingTime + bookedTime;
		if (newTotalTime <= 28800) {
			userInDb.setBookedTime(newTotalTime); // updated the time of user
			usersRepo.save(userInDb);
			String taskName = newRequestBody.getTaskName();
			Tasks taskToCollab = usersRepo.getTasksByTaskName(taskName);
			taskToCollab.setPartnerId(partnerId);
			tasksRepo.save(taskToCollab); // sets partner id to the task
			requestsRepo.deleteById(requestId); // delete the request after accepting
			return "Accepted";
		}else {
			return "8 hours completed";
		}
	}

	public void deleteRequest(@PathVariable long requestId) {
		requestsRepo.deleteById(requestId);
	}

}
