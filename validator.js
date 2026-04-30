import fs from 'fs';

async function checkApi(api) {
    const startTime = Date.now();
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(api.url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const latency = Date.now() - startTime;
        return {
            ...api,
            status: response.ok ? 'Online' : 'Offline',
            latency: latency,
            last_checked: new Date().toISOString()
        };
    } catch (e) {
        return {
            ...api,
            status: 'Offline',
            latency: null,
            last_checked: new Date().toISOString(),
            error: e.message
        };
    }
}

async function main() {
    const dataPath = './public/data.json';
    if (!fs.existsSync(dataPath)) {
        console.error('public/data.json not found');
        return;
    }

    const apis = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`Validating ${apis.length} APIs...`);

    const chunkSize = 20; 
    const updatedApis = [];

    for (let i = 0; i < apis.length; i += chunkSize) {
        const chunk = apis.slice(i, i + chunkSize);
        const results = await Promise.all(chunk.map(checkApi));
        updatedApis.push(...results);
        console.log(`Processed ${updatedApis.length}/${apis.length} APIs...`);
        
        if (updatedApis.length >= 100) {
            console.log("Validated 100 APIs. Stopping for demo purposes.");
            break;
        }
    }

    const finalData = updatedApis.length < apis.length 
        ? [...updatedApis, ...apis.slice(updatedApis.length)]
        : updatedApis;

    fs.writeFileSync(dataPath, JSON.stringify(finalData, null, 2));
    console.log(`Validation complete. Updated data saved to ${dataPath}`);
}

main();
