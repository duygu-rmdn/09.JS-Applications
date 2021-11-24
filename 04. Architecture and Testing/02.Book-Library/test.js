const { chromium } = require('playwright-chromium');
const { expect } = require('chai')

const mockData = {"d953e5fb-a585-4d6b-92d3-ee90697398a0":{"author":"J.K.Rowling","title":"Harry Potter and the Philosopher's Stone"},"d953e5fb-a585-4d6b-92d3-ee90697398a1":{"title":"C# Fundamentals","author":"Svetlin Nakov"}}

function json(data){
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

describe('Tests', async function(){
    this.timeout(5000);

    let page, browser;

    before(async () =>{
        browser = await chromium.launch();

    });

    after(async () => {
        await browser.close();
    })

    beforeEach(async () => {
        page = await browser.newPage();
    })
    afterEach(async () => {
        await page.close();
    })

    it('load books', async () => {
        await page.route('**/jsonstore/collections/books*', (route) => {
            route.fulfill(json(mockData))
        })

        await page.goto('http://localhost:5500/02.Book-Library/');
        await page.click('text=Load all books');

        await page.waitForSelector('text=Harry');

        const rows = await page.$$eval('tr', (rows) => rows.map(r=>r.textContent.trim()));

        expect(rows[1]).to.contains('Potter')
        expect(rows[2]).to.contains('C# Fundamentals')
    })

    
})