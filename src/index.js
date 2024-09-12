require("dotenv").config();

// packages
const chalk = require("chalk");
const checkProxy = require('check-proxy');
const puppeteer = require("puppeteer");
var rug = require('random-username-generator');
const Stopwatch = require('stopwatch-node');
const fs = require('fs');
const path = require('path');


//utils
const logger = require("./utils/logger.js");

const createAccountUsingReferral = async () => {
    // env variables
    const referal_link = process.env.referal_link;
    const PRODUCT_ENVIRONEMENT = process.env.ENVIRONMENT;
    let headless_browser = false;

    if(PRODUCT_ENVIRONEMENT == "production") {
        headless_browser = true;
    } else if (PRODUCT_ENVIRONEMENT == "development"){
        headless_browser = false;
    }

    const proxies_list = [
        {
            proxy: "http://109.207.128.90:42774",
            username: "2VyABZ13vCNu1HJ",
            password: "5rI02oK3sMNXB2S"
        },
        {
            proxy: "http://109.207.128.193:42312",
            username: "ZKRh2TiFPyVuzk8",
            password: "1oE1PD9d8wIuOF6"
        },
        {
            proxy: "http://109.207.128.110:46243",
            username: "j7oqmledQ7jhbD2",
            password: "ZvuFjBzqB42m49q"
        }
    ]

    // preparting proxy
    const randomProxy = proxies_list[Math.floor(Math.random() * proxies_list.length)];

    const browser = await puppeteer.launch({
        headless: true,
        args: [`--proxy-server=${randomProxy.proxy}`], timeout: 60000
    });
    const page = await browser.newPage();


    await page.authenticate({
        username: randomProxy.username,
        password: randomProxy.password
    });

    await page.goto(referal_link, {
        waitUntil: 'networkidle2', timeout: 30000
    });  // A website to check IP

    logger.info(`referal link ${referal_link} loaded successfully`);

    await page.click('#__next > div.c-PJLV.c-PJLV-ikRbgih-css > div.c-PJLV.c-PJLV-ikGFHpk-css > main > div > div > div.c-dhzjXW.c-dhzjXW-iiqjHSX-css > button > div > div > div', {
        delay: 2000
    });

    await page.waitForNetworkIdle();

    logger.info(`sign up page loaded successfully`);

    // filling infos
    logger.info('now filling account informations');

    logger.info('generating email');

    rug.setSeperator('_');

    var new_username = rug.generate();

    const email = `${new_username}@outlook.com`;

    logger.info('email generated ', email)

    const password = `jiggleandwigglexoxo`;

    // email
    logger.info(`filling email: ${email}`);
    await page.type('div.c-PJLV.c-PJLV-ikEpIKg-css > form > div:nth-child(1) > div > div > div > input', email);

    // password
    logger.info(`filling passowrd: ${password}`);
    await page.type(' div.c-PJLV.c-PJLV-ikEpIKg-css > form > div:nth-child(2) > div > div > div.c-dhzjXW.c-dhzjXW-icmpvrW-css > input', password);

    // confirm password
    logger.info(`filling confirm passowrd: ${password}`);
    await page.type('div.c-PJLV.c-PJLV-ikEpIKg-css > form > div.c-PJLV.c-PJLV-ifbYheq-css > div > div > div.c-dhzjXW.c-dhzjXW-icmpvrW-css > input', password);
    await delay(5);
    await page.click('div.c-PJLV.c-PJLV-ikEpIKg-css > form > button > div > div > div');
    await page.waitForNetworkIdle();

    logger.info(`account created successfully ${email}`);
    await delay(10);
    await browser.close();

}

function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

(async() => {

    // env variables
    const referal_link = process.env.referal_link;

    // starting check
    console.log(`${chalk.blue("Referal universe farming started <3")} - link: ${chalk.blue(referal_link)}`);
    
    let count_creation = 1;
    let earned_donuts = 0;
    for(let i= 0; i < 10000; i++){
        logger.info(`account referal creation for the ${count_creation} time has started`);
        await createAccountUsingReferral();
        logger.info(`account referal creation for the ${count_creation} time has finish in `);
        count_creation++;
        earned_donuts+=50;
        console.log(chalk.yellow(`earned ${earned_donuts} donuts`));
    }

})();