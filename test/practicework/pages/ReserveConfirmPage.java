package practicework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ReserveConfirmPage {
    private WebDriver driver;    
    private By total = By.id("total");
    private By startReserveDate = By.id("start_reserve_date");
    private By endReserveDate = By.id("end_reserve_date");
    private By reserveTerm = By.id("reserve_term");
    
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
}
