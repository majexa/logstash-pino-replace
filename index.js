const Logstash = require('logstash-client');
const Stringify = require('fast-safe-stringify');

module.exports = () => {
    const logstash = new Logstash({
        type: 'tcp',
        host: process.env.LOGSTASH_HOST,
        port: process.env.LOGSTASH_PORT,
        format: (message) => {
            message.typeLog = process.env.TYPE_LOG;
            return Stringify(message);
        }
    });
    return {
        // 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
        info: (type, data) => {
            logstash.send(Object.assign(data, {type}));
        }
    };
};
