const axios = require('axios');
const cheerio = require('cheerio');

const getProxies = async () => {
    try {
        const response = await axios.get('https://www.sslproxies.org/');
        const $ = cheerio.load(response.data);
        const proxies = [];

        $('#proxylisttable tbody tr').each((index, element) => {
            const ip = $(element).find('td').eq(0).text();
            const port = $(element).find('td').eq(1).text();
            proxies.push(`${ip}:${port}`);
        });

        console.log(proxies); // List of 'IP:PORT' proxies
    } catch (error) {
        console.error('Error fetching proxies:', error);
    }
}

module.exports = getProxies;