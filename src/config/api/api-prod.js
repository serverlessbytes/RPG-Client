const protocol = 'http';
const host = '97.74.85.182';
const port = '5000';
const trailUrl = 'api/v1';

const hostUrl = `${host}/`;
// const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}`;
const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;

export default {
    // protocol: protocol,
    host: host,
    // port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl,
};