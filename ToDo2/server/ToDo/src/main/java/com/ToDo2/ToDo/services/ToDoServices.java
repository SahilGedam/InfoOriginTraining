package com.ToDo2.ToDo.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ToDo2.ToDo.entities.Tasks;
import com.ToDo2.ToDo.repo.TasksRepo;

@Service
public class ToDoServices {

	@Autowired
	private TasksRepo tasksRepo;

	public List<Tasks> getAllTasks() {

		Date date = new Date();
		String dateCurrent = new SimpleDateFormat("yyyy-MM-dd").format(date);

		List<Tasks> tasksList = tasksRepo.findAll();
		// logic to set status as false if currentDate is greater than expire date
		for (int i = 0; i < tasksList.size(); i++) {
			if (tasksList.get(i).getTime().compareTo(dateCurrent) < 0) {
				tasksList.get(i).setStatus(false);
			}

			// logic to calculate remaining days and send them in date column
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

	public ResponseEntity<Object> saveTasks(@RequestBody Tasks task) {

		tasksRepo.save(task);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> updateTasks(@PathVariable long id, @RequestBody Tasks task) {

		Tasks updatedTask = tasksRepo.findById(id).get();
		updatedTask.setTask(task.getTask());
		tasksRepo.save(updatedTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> updateStatus(@PathVariable long id, @RequestBody Tasks task) {

		Tasks updatedTask = tasksRepo.findById(id).get();

		updatedTask.setStatus(false);

		tasksRepo.save(updatedTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> deleteTask(@PathVariable long id) {
		Tasks deleteTask = tasksRepo.findById(id).get();
		tasksRepo.delete(deleteTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
