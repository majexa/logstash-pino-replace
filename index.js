const Logstash = require('logstash-client');
const Stringify = require('fast-safe-stringify');

module.exports = () => {
    if (!process.env.LOGSTASH_HOST) throw new Error('Env var LOGSTASH_HOST is not defined');
    if (!process.env.LOGSTASH_PORT) throw new Error('Env var LOGSTASH_PORT is not defined');
    if (!process.env.TYPE_LOG) throw new Error('Env var TYPE_LOG is not defined');
    const logstash = new Logstash({
        type: 'tcp',
        host: process.env.LOGSTASH_HOST,
        port: process.env.LOGSTASH_PORT,
        format: (message) => {
            message.typeLog = process.env.TYPE_LOG;
            return Stringify(message);
        }
    });
    const send = (data1, data2) => {
        if (typeof data1 !== 'Object') data1 = {kind: data1};
        if (!data2) data2 = {};
        console.log(Object.assign(data1, data2));
        logstash.send(Object.assign(data1, data2));
    };
    return {
        // 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
        info: send,
        error: (err) => {
            if (typeof err === 'Object') {
                err.kind = 'error';
                logstash.send(err);
            } else {
                logstash.send({
                    kind: 'error',
                    err
                });
            }

        }
    };
};
