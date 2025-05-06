const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../src/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

test('Stack should be empty after pushing and then popping an element', async () => {
    let push = await driver.findElement(By.id('push'));
    await push.click();
    let alert = await driver.switchTo().alert();
    await alert.sendKeys("WOW");
    await alert.accept();

    let pop = await driver.findElement(By.id('pop'));
    await pop.click();
    alert = await driver.switchTo().alert();
    await alert.accept();

    let peek = await driver.findElement(By.id('peek'));
    await peek.click();

    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual('undefined');
})

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});