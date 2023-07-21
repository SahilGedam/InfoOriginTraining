package testApi;

import org.json.JSONObject;
import org.junit.Test;
import static io.restassured.RestAssured.given;
import io.restassured.http.ContentType;
import static org.hamcrest.Matchers.equalTo;

public class APITests {

    String BaseURL = "https://dummy.restapiexample.com/api";
    @Test
    public void createUser() {

        JSONObject data = new JSONObject();
        data.put("employee_name", "NewUser1");
        data.put("employee_salary", "1000");
        data.put("employee_age", "35"); 
        // GIVEN
        given()
                .contentType(ContentType.JSON)
                .body(data.toString())
 
                // WHEN
                .when()
                .post(BaseURL + "/v1/create")
                // THEN
                .then()
                .statusCode(200)
                .body("data.employee_name", equalTo("NewUser1"))
                .body("message", equalTo("Successfully! Record has been added."));
 


    }
}
