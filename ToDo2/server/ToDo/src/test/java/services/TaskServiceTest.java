package services;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import com.ToDo2.ToDo.ToDoApplication;
import com.ToDo2.ToDo.tasks.entities.Tasks;
import com.ToDo2.ToDo.tasks.repo.TasksRepo;
import com.ToDo2.ToDo.tasks.services.ToDoServices;



@ExtendWith(MockitoExtension.class)
@SpringBootTest
@ContextConfiguration(classes = ToDoApplication.class)
public class TaskServiceTest {

	@MockBean
	private TasksRepo tasksRepository;

	// @InjectMocks
	@Autowired
	private ToDoServices toDoService;

	@BeforeEach
	public void setUp() {

		Optional<Tasks> task = Optional.of(new Tasks(1, "ocam", true, "2016-02-01", 0, 0));
		Mockito.when(tasksRepository.findById(any(Long.class))).thenReturn(task);

	}

	// save test
//	@Test
//	public void saveTaskTest() {
//		Tasks taskToSave = new Tasks(65, "ocam", false, "2016-03-01", 0, 0);
//		when(tasksRepository.save(taskToSave)).thenReturn(taskToSave);
//		assertEquals(taskToSave, toDoService.saveTasks(taskToSave));
//	}

	// delete tests
	@Test
	public void deleteTaskTest() {
		Tasks taskToDelete = tasksRepository.findById(1L).get();
		toDoService.deleteTask(1L);
		verify(tasksRepository, times(1)).delete(taskToDelete);
	}

	@Test
	public void deleteTaskTestForId2() {
		Tasks taskToDelete = tasksRepository.findById(1L).get();
		toDoService.deleteTask(2L);
		verify(tasksRepository, times(1)).delete(taskToDelete);
	}

	@Test
	public void updateStatus() {
		Long id = 2L;

		assertEquals(false, toDoService.updateStatus(id).getStatus());
	}

	@Test
	public void updateStatusForAnotherId() {

		assertEquals(false, toDoService.updateStatus(1L).getStatus());
	}

	@Test
	public void updateTaskTest() {
		Long id = 3L;
		Tasks newTaskBody = new Tasks(65, "UpDated Task", false, "2016-03-01", id, id);
		assertEquals(newTaskBody.getTask(), toDoService.updateTasks(id, newTaskBody).getTask());

	}

	@Test
	public void updateTaskString() {
		Long id = 1L;
		Tasks newTaskBody = new Tasks(65, "UpDated Task", false, "2016-03-01", id, id);
		assertEquals("UpDated Task", toDoService.updateTasks(id, newTaskBody).getTask());

	}

	@Test
	public void updateTaskStringForOtherParameters() {
		Long id = 1L;
		Tasks newTaskBody = new Tasks(1L, "UpDated Task", true, "2017-03-01", id, id);
		assertEquals("UpDated Task", toDoService.updateTasks(id, newTaskBody).getTask());

	}

//	@Test
//	public void getAllTasksTest() {
//		when(tasksRepository.findAll()).thenReturn(Stream .of (new Tasks(65,"ocam",false,"2016-02-01", 0, 0),new Tasks(67,"ocam",true,"2016-03-01")).collect(Collectors.toList()));	
//		
//		assertEquals(2,toDoService.getAllTasks().size());
//
//	}

	


}
