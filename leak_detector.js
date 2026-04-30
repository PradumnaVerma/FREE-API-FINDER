import fs from 'fs';

async function findLeaks() {
    console.log("Searching GitHub for potential leaks...");
    const searchQueries = [
        'filename:.env "API_KEY"',
        'filename:config.js "secret_key"',
        'filename:settings.py "SECRET_KEY"'
    ];

    const leaks = [];
    
    for (const query of searchQueries) {
        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'API-Pulse-Detector'
            };
            
            if (process.env.GITHUB_TOKEN) {
                headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
            }

            const response = await fetch(`https://api.github.com/search/code?q=${encodeURIComponent(query)}&per_page=5`, {
                headers
            });

            if (!response.ok) {
                console.warn(`Search for "${query}" failed: ${response.statusText}`);
                continue;
            }

            const data = await response.json();
            
            for (const item of data.items) {
                leaks.push({
                    id: item.sha,
                    service: "GitHub",
                    owner: item.repository.owner.login,
                    repo: item.repository.name,
                    source_url: item.html_url,
                    leaked_key_preview: "KEY_FOUND", // We don't download the file to see the key for safety
                    detected_at: new Date().toISOString(),
                    severity: query.includes('.env') ? "Critical" : "High"
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    // Filter duplicates
    const uniqueLeaks = Array.from(new Map(leaks.map(item => [item.id, item])).values());

    fs.writeFileSync('./public/security.json', JSON.stringify(uniqueLeaks, null, 2));
    console.log(`Detected ${uniqueLeaks.length} potential leaks and saved to public/security.json`);
}

findLeaks();
