package rest;

import static io.restassured.RestAssured.*;
import io.restassured.http.ContentType;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.Test;

import static io.restassured.matcher.RestAssuredMatchers.*;

public class RestTest {

	@Test
	public void checkHello() {
		String expected = "Hello";
		get("/questions/hello").then().statusCode(200).assertThat().body(equalTo("Hello"));
	}
	
	
	@Test
	public void checkCorrectAnserCityMumbaiAndIndex1isZero() {
		int expected =0;
		get("/questions/questionCity/Mumbai/1").then().statusCode(200).assertThat().body("correctAnswer", equalTo(expected));
	}
	@Test
	public void checkCorrectCityMatchesInPutCity() {
		String expected ="Mumbai";
		get("/questions/questionCity/Mumbai/1").then().statusCode(200).assertThat().body("questionCity", equalTo(expected));
	}
	
	@Test
	public void checkSelectedOFQuestionCityMumbaiAndIndex1() {
		int expected =0;
		get("/questions/questionCity/Mumbai/1").then().statusCode(200).assertThat().body("selected", equalTo(expected));
	}
	
	@Test
	public void whenRequestPut_thenOK(){
	    when().request("PUT", "/questions/updateStatusOfCity/Mumbai").then().statusCode(200);
	}
	
	@Test
	public void resetAll(){
	    when().request("PUT", "/questions/reset").then().statusCode(200);
	}
//	@Test
//	public void checkQuestionWithInValidIndex() {
//		get("/questions/questionCity/Mumbai/9").then().statusCode(500);
//	}
//	@Test
//	public void checkQuestionWithInValidCIty() {
//		get("/questions/questionCity/Mumba/1").then().statusCode(200); // return false actual is 500
//	}

}
