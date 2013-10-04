package practicework;

import static org.junit.Assert.*;
import static org.hamcrest.core.Is.*;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.SystemUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class PracticeWork1 {
    private WebDriver driver;
    
    private String chromeDriverPath() {
        String path;
        if (SystemUtils.IS_OS_MAC || SystemUtils.IS_OS_MAC_OSX) {
            path = "chromedriver/mac/chromedriver"; // Mac環境の場合
        } else {
            path = "chromedriver/win/chromedriver.exe"; // Windows環境の場合
        }
        File file = new File(path);
        return file.getAbsolutePath();
    }
    
    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", chromeDriverPath());
        driver = new ChromeDriver();
        // ページ遷移の際に少し待機するため
        driver.manage().timeouts().implicitlyWait(500, TimeUnit.MILLISECONDS);
    }
    
    @After
    public void tearDown() {
        driver.quit();
    }
    
    @Test
    public void test() {
        File html = new File("reserveApp/index.html");
        String url = "file:///" + html.getAbsolutePath();
        driver.get(url);
        
        // 1ページ目入力画面
        driver.findElement(By.id("reserve_year")).clear();
        driver.findElement(By.id("reserve_year")).sendKeys("2013");
        driver.findElement(By.id("reserve_month")).clear();
        driver.findElement(By.id("reserve_month")).sendKeys("12");
        driver.findElement(By.id("reserve_day")).clear();
        driver.findElement(By.id("reserve_day")).sendKeys("7");
        driver.findElement(By.id("reserve_term")).clear();
        driver.findElement(By.id("reserve_term")).sendKeys("1");
        driver.findElement(By.id("headcount")).clear();
        driver.findElement(By.id("headcount")).sendKeys("9");
        driver.findElement(By.id("breakfast_on")).click();
        WebElement planA = driver.findElement(By.id("plan_a"));
        if (!planA.isSelected()) {
            planA.click();
        }
        WebElement planB = driver.findElement(By.id("plan_b"));
        if (!planB.isSelected()) {
            planB.click();
        }
        driver.findElement(By.id("guestname")).clear();
        driver.findElement(By.id("guestname")).sendKeys("a");
        driver.findElement(By.id("goto_next")).click();
        
        // 2ページ目入力画面
        assertThat(driver.findElement(By.id("price")).getText(), is("105750"));
        assertThat(driver.findElement(By.id("datefrom")).getText(), is("2013年12月7日"));
        assertThat(driver.findElement(By.id("dateto")).getText(), is("2013年12月8日"));
        assertThat(driver.findElement(By.id("dayscount")).getText(), is("1"));
        assertThat(driver.findElement(By.id("hc")).getText(), is("9"));
        assertThat(driver.findElement(By.id("bf_order")).getText(), is("あり"));
        assertThat(driver.findElement(By.id("plan_a_order")).getText(), is("昼からチェックインプラン"));
        assertThat(driver.findElement(By.id("plan_b_order")).getText(), is("お得な観光プラン"));
        assertThat(driver.findElement(By.id("gname")).getText(), is("a"));
        driver.findElement(By.id("commit")).click();
    }
}
