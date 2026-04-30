import asyncio
import json
import logging
from playwright.async_api import async_playwright

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def extract_apis():
    url = "https://github.com/public-apis/public-apis"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        logging.info(f"Navigating to {url}")
        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=60000)
            # Wait a bit for everything to render
            await page.wait_for_timeout(2000)
        except Exception as e:
            logging.error(f"Failed to navigate: {e}")
            await browser.close()
            return

        logging.info("Searching for API tables in the markdown body...")
        
        # Primary selector for the markdown article
        article_locator = page.locator("article.markdown-body")
        
        if await article_locator.count() == 0:
            logging.warning("Primary selector failed. Trying alternative: div.markdown-body")
            article_locator = page.locator("div.markdown-body")
        
        if await article_locator.count() == 0:
            logging.error("Could not find the markdown body on the page.")
            await browser.close()
            return
            
        tables = article_locator.locator("table")
        table_count = await tables.count()
        logging.info(f"Found {table_count} tables.")
        
        apis = []
        for i in range(table_count):
            table = tables.nth(i)
            # Ensure the table has rows
            rows = table.locator("tbody tr")
            row_count = await rows.count()
            
            for j in range(row_count):
                row = rows.nth(j)
                first_cell = row.locator("td").first
                
                # Extract the <a> tag inside the first cell
                link = first_cell.locator("a")
                if await link.count() > 0:
                    api_name = await link.inner_text()
                    api_url = await link.get_attribute("href")
                    
                    if api_name and api_url:
                        apis.append({
                            "name": api_name.strip(),
                            "url": api_url.strip()
                        })
        
        await browser.close()
        
        if len(apis) == 0:
            logging.error("No APIs were extracted. The DOM structure might have changed drastically.")
            return
            
        logging.info(f"Extracted {len(apis)} APIs total.")
        
        # Deduplicate
        unique_apis = []
        seen = set()
        for api in apis:
            if api['url'] not in seen:
                seen.add(api['url'])
                unique_apis.append(api)
                
        logging.info(f"Saving {len(unique_apis)} unique APIs to discovery.json")
        
        with open("discovery.json", "w", encoding="utf-8") as f:
            json.dump(unique_apis, f, indent=2, ensure_ascii=False)
            
        logging.info("Scraping completed successfully.")

if __name__ == "__main__":
    asyncio.run(extract_apis())
