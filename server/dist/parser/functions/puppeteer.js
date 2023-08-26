"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require('puppeteer');
const LAUNCH_PUPPETEER_OPTIONS = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
    ]
};
const PAGE_PUPPETEER_OPTIONS = {
    networkIdle2Timeout: 5000,
    waitUntil: 'networkidle2',
    timeout: 30000
};
module.exports = class PuppeteerHandler {
    constructor() {
        this.browser = null;
    }
    initBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer.launch(LAUNCH_PUPPETEER_OPTIONS);
        });
    }
    closeBrowser() {
        this.browser.close();
    }
    getPageContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                yield this.initBrowser();
            }
            try {
                const page = yield this.browser.newPage();
                yield page.goto(url, PAGE_PUPPETEER_OPTIONS);
                const isCurrentPage = (yield page.$$('.card-actions-view')).length !== 0;
                if (isCurrentPage) {
                    yield page.waitForSelector('.card-actions-view');
                    yield page.click('.card-actions-view .action-button-view._type_share .button');
                    const content = yield page.content();
                    return content;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
};
//# sourceMappingURL=puppeteer.js.map