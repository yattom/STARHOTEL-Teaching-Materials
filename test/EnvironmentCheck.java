import java.io.File;

import org.apache.commons.lang3.SystemUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * このプログラムはハンズオンに必要なプログラムが適切にインストールされたかをチェックするプログラムです。
 * このファイルをEclipse上から、右クリック>「実行」>「JUnitテスト」 によりJUnitとして実行し、
 * JUnitのテストが成功すれば、インストールは正常に完了しています。
 */
public class EnvironmentCheck {

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
    }
        
    @After
    public void tearDown() {
        driver.quit();
    }
    
    @Test
    public void check() {
        File html = new File("introWork/introWork1.html");
        String url = "file:///" + html.getAbsolutePath();
        driver.get(url);        
        WebElement userName = driver.findElement(By.id("user_name"));
        userName.sendKeys("TestUser");
        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("pass");
        WebElement login = driver.findElement(By.id("login"));
        login.click();
        driver.switchTo().alert().accept();
    }
}
