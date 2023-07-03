package com.ToDo2.ToDo.users.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ToDo2.ToDo.users.entities.Users;
import com.ToDo2.ToDo.users.repo.UsersRepo;

@Service
public class UsersServices {
	@Autowired
	UsersRepo usersRepo;
// to check if username is available
	public Boolean checkAvailable(@PathVariable String userName) {
		Users userInDb = usersRepo.checkAvailableUserName(userName);
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
		returnList.add(0,validateUserNameSuggestion(firstName + lastName));
		returnList.add(1,validateUserNameSuggestion(firstName + lastName+" ivz"));
		returnList.add(2,validateUserNameSuggestion(firstName + lastName+" pols"));
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
	
//	public List<Users> getAllUsers() {
//	List<Users> usersList = usersRepo.findAll();
//	return usersList;
//}

}
