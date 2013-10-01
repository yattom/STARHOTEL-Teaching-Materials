package practicework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ReserveConfirmPage {
    private WebDriver driver;    
    private By total = By.id("total");
    private By startReserveDate = By.id("start_reserve_date");
    private By endReserveDate = By.id("end_reserve_date");
    private By reserveTerm = By.id("reserve_term");
    private By headCount = By.id("headCount");
    private By breakfast = By.id("breakfast");
    private By plan = By.id("plan");
    private By finalPName = By.id("final_pname");
    private By confirm = By.id("confirm");
    
    public ReserveConfirmPage(WebDriver driver) {
        this.driver = driver;
    }
    
    public String getTotal() {
        return driver.findElement(total).getText();
    }
    
    public String getStartReserveDate() {
        return driver.findElement(startReserveDate).getText();
    }

    public String getEndReserveDate() {
        return driver.findElement(endReserveDate).getText();
    }
    
    public String getReserveTerm() {
        return driver.findElement(reserveTerm).getText();
    }
    
    public String getHeadCount() {
        return driver.findElement(headCount).getText();
    }
    
    public String getBreakfast() {
        return driver.findElement(breakfast).getText();
    }
    
    public String getPlan() {
        return driver.findElement(plan).getText();
    }
    
    public String getFinalPName() {
        return driver.findElement(finalPName).getText();
    }
    
    public void confirm() {
        driver.findElement(confirm).click();
    }
}
