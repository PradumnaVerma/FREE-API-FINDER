import fs from 'fs';

async function fetchApis() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/public-apis/public-apis/master/README.md');
        const text = await response.text();
        
        const apis = [];
        const lines = text.split('\n');
        let currentCategory = "General";
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // Detect Category from headers (### Category)
            if (trimmed.startsWith('### ')) {
                currentCategory = trimmed.replace('### ', '').trim();
                continue;
            }

            if (trimmed.startsWith('|') && trimmed.includes('](')) {
                if (trimmed.includes('|---') || trimmed.includes('|:---') || trimmed.includes('| API |')) {
                    continue;
                }
                
                const parts = trimmed.split('|').map(p => p.trim());
                if (parts.length > 4) {
                    const apiCell = parts[1];
                    const descriptionCell = parts[2];
                    const authCell = parts[3];
                    
                    const match = apiCell.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                        let url = match[2].trim();
                        url = url.split(' ')[0];
                        
                        apis.push({
                            name: match[1].trim(),
                            url: url,
                            description: descriptionCell,
                            auth: authCell.replace(/`/g, '') || "No",
                            category: currentCategory
                        });
                    }
                }
            }
        }
        
        const unique = [];
        const seen = new Set();
        for (const api of apis) {
            if (!seen.has(api.url)) {
                seen.add(api.url);
                unique.push(api);
            }
        }
        
        fs.writeFileSync('discovery.json', JSON.stringify(unique, null, 2));
        console.log(`Saved ${unique.length} APIs to discovery.json`);
    } catch (e) {
        console.error(e);
    }
}

fetchApis();
