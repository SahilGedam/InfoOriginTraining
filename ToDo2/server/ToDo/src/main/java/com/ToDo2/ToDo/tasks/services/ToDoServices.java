package com.ToDo2.ToDo.tasks.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ToDo2.ToDo.tasks.entities.Tasks;
import com.ToDo2.ToDo.tasks.repo.TasksRepo;

@Service
public class ToDoServices {

	@Autowired
	private TasksRepo tasksRepo;

	public List<Tasks> getAllTasksByUserId(@PathVariable long userId) {

		List<Tasks> tasksList = tasksRepo.getAllTasksByUserId(userId);
		Date date = new Date();
		String dateCurrent = new SimpleDateFormat("yyyy-MM-dd").format(date);

		// logic to set status as false if currentDate is greater than expire date
		for (int i = 0; i < tasksList.size(); i++) {
			if (tasksList.get(i).getTime().compareTo(dateCurrent) < 0) {
				tasksList.get(i).setStatus(false);
			}

			// logic to calculate remaining days and send them in time column
			try {
				Date dateCurrentInFormat = new SimpleDateFormat("yyyy-MM-dd").parse(dateCurrent);

				Date dateExpiryInFormat = new SimpleDateFormat("yyyy-MM-dd").parse(tasksList.get(i).getTime());

				long diffrence = dateExpiryInFormat.getTime() - dateCurrentInFormat.getTime();

				String remainingDaysString = Long.toString(TimeUnit.DAYS.convert(diffrence, TimeUnit.MILLISECONDS));

				tasksList.get(i).setTime(remainingDaysString);
			} catch (ParseException e) {

				e.printStackTrace();
			}

		}

		return tasksList;
	}

	public Tasks saveTasks(@RequestBody Tasks newTaskBody) {

		tasksRepo.save(newTaskBody);

		return newTaskBody;

	}

	public Tasks updateTasks(@PathVariable long id, @RequestBody Tasks newTaskBody) {

		Tasks taskToUpdate = tasksRepo.findById(id).get();

		taskToUpdate.setTask(newTaskBody.getTask());

		tasksRepo.save(taskToUpdate);

		return taskToUpdate;

	}

	public Tasks updateStatus(@PathVariable long id) {

		Tasks taskToUpdate = tasksRepo.findById(id).get();

		taskToUpdate.setStatus(false);

		tasksRepo.save(taskToUpdate);

		return taskToUpdate;

	}

	public void deleteTask(@PathVariable long id) {

		Tasks taskToDelete = tasksRepo.findById(id).get();

		tasksRepo.delete(taskToDelete);

	}

//	public List<Tasks> getAllTasks() {
//	List<Tasks> tasksList = tasksRepo.findAll();
//
//	Date date = new Date();
//	String dateCurrent = new SimpleDateFormat("yyyy-MM-dd").format(date);
//
//
//	// logic to set status as false if currentDate is greater than expire date
//	for (int i = 0; i < tasksList.size(); i++) {
//		if (tasksList.get(i).getTime().compareTo(dateCurrent) < 0) {
//			tasksList.get(i).setStatus(false);
//		}
//
//		// logic to calculate remaining days and send them in time column
//		try {
//			Date dateCurrentInFormat = new SimpleDateFormat("yyyy-MM-dd").parse(dateCurrent);
//
//			Date dateExpiryInFormat = new SimpleDateFormat("yyyy-MM-dd").parse(tasksList.get(i).getTime());
//
//			long diffrence = dateExpiryInFormat.getTime() - dateCurrentInFormat.getTime();
//
//			String remainingDaysString = Long.toString(TimeUnit.DAYS.convert(diffrence, TimeUnit.MILLISECONDS));
//
//			tasksList.get(i).setTime(remainingDaysString);
//		} catch (ParseException e) {
//
//			e.printStackTrace();
//		}
//
//	}
//
//	return tasksList;
//}
}
