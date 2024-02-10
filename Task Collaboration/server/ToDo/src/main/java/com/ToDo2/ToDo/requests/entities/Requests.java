package com.ToDo2.ToDo.requests.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "request")
public class Requests {
	@Id
	@Column(name = "request_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long requestId;
	@Column(name = "sender_name")
	private String senderName;
	@Column(name = "receiver_name")
	private String receiverName;
	@Column(name = "requested_time")
	private long requestedTime;
	@Column(name = "task_name")
	private String taskName;
	@Column(name = "task_id")
	private long taskId;
	@Column(name = "status")
	private String status;
	
	public long getRequestId() {
		return requestId;
	}
	public void setRequestId(long requestId) {
		this.requestId = requestId;
	}
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public long getRequestedTime() {
		return requestedTime;
	}
	public void setRequestedTime(long requestedTime) {
		this.requestedTime = requestedTime;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public long getTaskId() {
		return taskId;
	}
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Requests [requestId=" + requestId + ", senderName=" + senderName + ", receiverName=" + receiverName
				+ ", requestedTime=" + requestedTime + ", taskName=" + taskName + ", taskId=" + taskId + ", status="
				+ status + "]";
	}
	public Requests(long requestId, String senderName, String receiverName, long requestedTime, String taskName,
			long taskId, String status) {
		super();
		this.requestId = requestId;
		this.senderName = senderName;
		this.receiverName = receiverName;
		this.requestedTime = requestedTime;
		this.taskName = taskName;
		this.taskId = taskId;
		this.status = status;
	}
	public Requests() {
		super();
		// TODO Auto-generated constructor stub
	}

	
}
