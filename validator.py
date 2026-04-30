import asyncio
import aiohttp
import json
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def check_api(session, api):
    start_time = time.time()
    try:
        # Use a short timeout to prevent hanging the validator
        async with session.get(api['url'], timeout=10) as response:
            latency = int((time.time() - start_time) * 1000)
            status = "Online" if response.status == 200 else "Offline"
            return {
                **api,
                "status": status,
                "latency": latency,
                "last_checked": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
    except Exception as e:
        return {
            **api,
            "status": "Offline",
            "latency": None,
            "last_checked": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "error": str(e)
        }

async def main():
    try:
        with open('public/data.json', 'r', encoding='utf-8') as f:
            apis = json.load(f)
    except FileNotFoundError:
        logging.error("public/data.json not found.")
        return

    logging.info(f"Validating {len(apis)} APIs...")
    
    # Process in chunks to avoid overwhelming the system or network
    chunk_size = 50
    updated_apis = []
    
    async with aiohttp.ClientSession() as session:
        for i in range(0, len(apis), chunk_size):
            chunk = apis[i:i + chunk_size]
            tasks = [check_api(session, api) for api in chunk]
            results = await asyncio.gather(*tasks)
            updated_apis.extend(results)
            logging.info(f"Processed {len(updated_apis)}/{len(apis)} APIs...")
            # Brief sleep between chunks
            await asyncio.sleep(1)

    with open('public/data.json', 'w', encoding='utf-8') as f:
        json.dump(updated_apis, f, indent=2, ensure_ascii=False)
    
    logging.info("Validation complete. Data saved to public/data.json")

if __name__ == "__main__":
    asyncio.run(main())
