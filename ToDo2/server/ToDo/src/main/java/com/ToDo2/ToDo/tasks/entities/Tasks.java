package com.ToDo2.ToDo.tasks.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "todo")
public class Tasks {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String task;
	@Column
	private Boolean status;
	@Column(name = "expire_time")
	private String time;
	@Column(name = "user_id")
	private long userId;

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	

	public Tasks(long id, String task, Boolean status, String time, long userId) {
		super();
		this.id = id;
		this.task = task;
		this.status = status;
		this.time = time;
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Tasks [id=" + id + ", task=" + task + ", status=" + status + ", time=" + time + ", userId=" + userId
				+ "]";
	}

	public Tasks() {
		super();
		// TODO Auto-generated constructor stub
	}

}
