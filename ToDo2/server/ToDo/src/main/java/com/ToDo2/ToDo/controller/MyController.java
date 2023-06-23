package com.ToDo2.ToDo.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ToDo2.ToDo.entities.Tasks;
import com.ToDo2.ToDo.repo.TasksRepo;

@RestController
public class MyController {
	@GetMapping("/")
	public String home() {
		return "home";
	}

	@Autowired
	private TasksRepo tasksRepo;

	@GetMapping(value = "/tasks")
	public List<Tasks> getTasks() {

		Date date = new Date();
		String dateCurrent = new SimpleDateFormat("yyyy-MM-dd").format(date);
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//		System.out.println(date);
		List<Tasks> t = tasksRepo.findAll();
		for (int i = 0; i < t.size(); i++) {
			if (t.get(i).getTime().compareTo(dateCurrent) < 0) {
				t.get(i).setStatus(false);
			}
//			System.out.println(dateCurrent);

			// dont disturb logic above

			try {
				Date date3 = new SimpleDateFormat("yyyy-MM-dd").parse(dateCurrent);
				System.out.println(date3);
				Date date4 = new SimpleDateFormat("yyyy-MM-dd").parse(t.get(i).getTime());
				System.out.println(date4);
				long diff = date4.getTime() - date3.getTime();
				System.out.println("Difference in Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
				String diffString = Long.toString(TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
				System.out.println(diffString + " in string");
				t.get(i).setTime(diffString);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

//			Date date3 = date;
//			Date date4 = date;
//			try {
//				date4 = new SimpleDateFormat("dd/MM/yyyy").parse(t.get(i).getTime());
//			} catch (ParseException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			System.out.println(date3);
//			System.out.println(date4);
//			long diff = date3.getTime() - date4.getTime();
//			System.out.println("Difference in Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));

//			try editing above 
//		    LocalDateTime date3 = LocalDate.parse(dateCurrent, dtf);
//		    LocalDateTime date4 = LocalDate.parse(t.get(i).getTime(), dtf);
//		    long daysBetween = Duration.between(date3, date4).toDays();
//		    System.out.println ("Days: " + daysBetween);

//			Date date3 = dateCurrent;
//			  Date date4 = t.get(i).getTime();
//			    System.out.println(date3);
//			    System.out.println(date4);

//			    long diff = date3.getTime() - d.getTime();
//			    System.out.println ("Difference in Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));

//		    Date toDate = DateFormat.parse(date);
//		    Date fromDate = dateFormat.parse(dateCurrent);
//		    long diff = toDate.getTime() - fromDate.getTime();
//		    System.out.println ("Difference in Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
			// get date formating
//			String d = t.get(i).getTime();
//			System.out.println(d);
//			System.out.println(date);
//			System.out.println(date2);
//			long diff = d.getTime() - date.getTime();
//			System.out.println("Difference in Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
//			long remainingDays = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
//			System.out.println(remainingDays);
//			 t.get(i).setTime(remainingDays);

//		
		}

		return t;
	}

//	@GetMapping(value="/tasks")
//	public List<Tasks> getUsers() {
//		return tasksRepo.findAll();
//	}

	@PostMapping(value = "/save")
	public ResponseEntity<Object> saveTasks(@RequestBody Tasks task) {

		tasksRepo.save(task);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Object> updateTasks(@PathVariable long id, @RequestBody Tasks task) {
//		userRepo.update(user);
		Tasks updatedTask = tasksRepo.findById(id).get();
		updatedTask.setTask(task.getTask());
		tasksRepo.save(updatedTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(value = "/complete/{id}")
	public ResponseEntity<Object> updateStatus(@PathVariable long id, @RequestBody Tasks task) {
//		userRepo.update(user);
		System.out.println(task);
		Tasks updatedTask = tasksRepo.findById(id).get();
		System.out.println(updatedTask);
//		updatedTask.setTask(task.getTask());
		updatedTask.setStatus(false);
		System.out.println(updatedTask);
		tasksRepo.save(updatedTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable long id) {
		Tasks deleteTask = tasksRepo.findById(id).get();
		tasksRepo.delete(deleteTask);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
