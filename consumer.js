const kafka = require('kafka-node');

const client  = new kafka.KafkaClient({kafkaHost: '192.168.0.220:9092'});
//consumidores
var consumer = new kafka.Consumer(client, [ { topic: 'AnunciaenlineaTopic' } ] );

consumer.on('message', function (message) {
        console.log(message);
});

