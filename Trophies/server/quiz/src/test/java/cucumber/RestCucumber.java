package cucumber;

import org.junit.runner.RunWith;
import org.springframework.http.HttpStatus;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(features = "src/test/java/cucumber")
public class RestCucumber {

}
