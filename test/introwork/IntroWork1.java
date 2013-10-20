package introwork;
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
 * 入門課題その1:「動かしてみよう、Selenium」
 */
public class IntroWork1 {
    private WebDriver driver;
    
    /**
     * 現在の環境に応じたchromedriverのインストールパスを取得する。
     */
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
    
    /**
     * 初期処理。
     * 「@Before」をつけたメソッドは、各テストメソッドの開始前に毎回実行される。
     */
    @Before
    public void setUp() {
        // chromedriverのインストール場所を指定
        System.setProperty("webdriver.chrome.driver", chromeDriverPath());
        
        // WebDriverのインスタンスを生成しブラウザを起動
        driver = new ChromeDriver();
    }
    
    /**
     * 終了処理。
     * 「@After」をつけたメソッドは、各テストメソッドの終了後に毎回実行される。    
     */
    @After
    public void tearDown() {
        // ブラウザを閉じ、WebDriverを終了する
        driver.quit();
    }
    
    /**
     * メインとなるテスト処理。
     * JUnitは、「@Test」がついたメソッドをテストメソッドとして実行する。
     */
    @Test
    public void test() {
        
        // 入門課題1のURLを取得
        File html = new File("introwork/introWork1.html");
        String url = "file:///" + html.getAbsolutePath();
        System.out.println(url);
        
        // 指定したURLのウェブページに移動
        driver.get(url);
        
        // 文字列入力・クリックなどの処理
        try {
            Thread.sleep(1000); // デモ用。目で見て分かりやすいように、各操作の間にSleepを入れる
            WebElement userName = driver.findElement(By.id("user_name"));
            userName.sendKeys("TestUser");
            Thread.sleep(1000); // デモ用
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("pass");
            Thread.sleep(1000); // デモ用
            WebElement login = driver.findElement(By.id("login"));
            login.click();
            Thread.sleep(1000); // デモ用
            driver.switchTo().alert().accept();
            Thread.sleep(1000); // デモ用       
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
