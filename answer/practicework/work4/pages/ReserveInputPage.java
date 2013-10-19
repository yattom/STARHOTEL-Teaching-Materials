package practicework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class ReserveInputPage {
    private WebDriver driver;
    private By datePick = By.id("datePick");
    private By reserveTerm = By.id("reserve_term");
    private By headCount = By.id("headcount");
    private By breakfastOn = By.id("breakfast_on");
    private By breakfastOff = By.id("breakfast_off");
    private By planA = By.id("plan_a");
    private By planB = By.id("plan_b");
    private By guestName = By.id("guestname");
    private By goToNext = By.id("agree_and_goto_next");

    public ReserveInputPage(WebDriver driver) {
        this.driver = driver;
    }

    public void setReserveDate(String year, String month, String day) {
        WebElement element = driver.findElement(datePick);
        element.clear();
        element.sendKeys(year + "/" + month + "/" + day);
        element.sendKeys(Keys.RETURN);
    }

    public void setReserveTerm(String value) {
        Select select = new Select(driver.findElement(reserveTerm));
        select.selectByValue(value);
    }
    
    
    public void setHeadCount(String value) {
        Select select = new Select(driver.findElement(headCount));
        select.selectByValue(value);
    }
    
    public void setBreakfast(boolean on) {
        if (on) {
            driver.findElement(breakfastOn).click();
        } else {
            driver.findElement(breakfastOff).click();            
        }
    }
    
    public void setPlanA(boolean checked) {
        WebElement element = driver.findElement(planA);
        if (element.isSelected() != checked) {
            element.click();
        }
    }

    public void setPlanB(boolean checked) {
        WebElement element = driver.findElement(planB);
        if (element.isSelected() != checked) {
            element.click();
        }
    }

    public void setGuestName(String value) {
        WebElement element = driver.findElement(guestName);
        element.clear();
        element.sendKeys(value);
    }
    
    public ReserveConfirmPage goToNext() {
        driver.findElement(goToNext).click();
        return new ReserveConfirmPage(driver);
    }
}
