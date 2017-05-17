# Logstash pino replace


## Usage

Define env vars

    LOGSTASH_HOST
    LOGSTASH_PORT
    TYPE_LOG // project scope index
    
Start logging

    pino.info('messageType', {some: 'data'});