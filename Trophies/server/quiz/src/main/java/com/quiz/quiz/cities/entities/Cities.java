package com.quiz.quiz.cities.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
public class Cities {
	@Id
	@Column(name = "id_cities")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cityId;
	@Column(name = "city_name")
	private String cityName;
	@Column(name = "status")
	private String status;
	public long getCityId() {
		return cityId;
	}
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Cities [cityId=" + cityId + ", cityName=" + cityName + ", status=" + status + "]";
	}
	public Cities(long cityId, String cityName, String status) {
		super();
		this.cityId = cityId;
		this.cityName = cityName;
		this.status = status;
	}
	public Cities() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
