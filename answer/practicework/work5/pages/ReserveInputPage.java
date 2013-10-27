package practicework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class ReserveInputPage {
    private WebDriver driver;
    private By datePick = By.id("datePick");
    private By reserveYear = By.id("reserve_year");
    private By reserveMonth = By.id("reserve_month");
    private By reserveDay = By.id("reserve_day");
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
    
    public String getReserveYear() {
        return driver.findElement(reserveYear).getAttribute("value");
    }

    public String getReserveMonth() {
        return driver.findElement(reserveMonth).getAttribute("value");
    }
    
    public String getReserveDay() {
        return driver.findElement(reserveDay).getAttribute("value");
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
    
    public String getReserveTerm() {
        return driver.findElement(reserveTerm).getAttribute("value");
    }
    
    public void setHeadCount(String value) {
        Select select = new Select(driver.findElement(headCount));
        select.selectByValue(value);
    }
    
    public String getHeadCount() {
        return driver.findElement(headCount).getAttribute("value");
    }
    
    public void setBreakfast(boolean on) {
        if (on) {
            driver.findElement(breakfastOn).click();
        } else {
            driver.findElement(breakfastOff).click();            
        }
    }
    
    public boolean getBreakfast() {
        return driver.findElement(breakfastOn).isSelected();
    }
    
    public void setPlanA(boolean checked) {
        WebElement element = driver.findElement(planA);
        if (element.isSelected() != checked) {
            element.click();
        }
    }
    
    public boolean getPlanA() {
        return driver.findElement(planA).isSelected();
    }

    public void setPlanB(boolean checked) {
        WebElement element = driver.findElement(planB);
        if (element.isSelected() != checked) {
            element.click();
        }
    }

    public boolean getPlanB() {
        return driver.findElement(planB).isSelected();
    }

    public void setGuestName(String value) {
        WebElement element = driver.findElement(guestName);
        element.clear();
        element.sendKeys(value);
    }
    
    public String getGuestName() {
        return driver.findElement(guestName).getAttribute("value");
    }
    
    public ReserveConfirmPage goToNext() {
        driver.findElement(goToNext).click();
        return new ReserveConfirmPage(driver);
    }
}
