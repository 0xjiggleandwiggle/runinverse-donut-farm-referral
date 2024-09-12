const axios = require('axios');

const getProxies = async (quantity) => {
    try {
        const response = await axios.get('https://proxylist.geonode.com/api/proxy-list', {
            params: {
                limit: quantity,   // Number of proxies to fetch
                page: 1,
                sort_by: 'lastChecked',
                sort_type: 'desc',
                protocols: 'http',  // or 'socks4', 'socks5'
            }
        });

        const proxies = response.data.data.map(proxy => `${proxy.ip}:${proxy.port}`);

        return proxies;
    } catch (error) {
        console.error('Error fetching proxy list:', error);
    }
}

module.exports = getProxies;