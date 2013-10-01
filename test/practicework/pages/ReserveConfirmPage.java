package practicework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ReserveConfirmPage {
    private WebDriver driver;    
    private By price = By.id("price");
    private By dateFrom = By.id("datefrom");
    private By dateTo = By.id("dateto");
    private By daysCount = By.id("dayscount");
        
    public ReserveConfirmPage(WebDriver driver) {
        this.driver = driver;
    }
    
    public String getPrice() {
        return driver.findElement(price).getText();
    }
    
    public String getDateFrom() {
        return driver.findElement(dateFrom).getText();
    }

    public String getDateTo() {
        return driver.findElement(dateTo).getText();
    }
    
    public String getDaysCount() {
        return driver.findElement(daysCount).getText();
    }
}
