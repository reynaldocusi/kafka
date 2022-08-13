const kafka = require('kafka-node');

const client  = new kafka.KafkaClient({kafkaHost: '192.168.0.220:9092'});

//conexion a Base de datps real
var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'anunciaenlinea.com',
    database : 'anunciaenlinea_user',
    user : 'anunciaenlinea_db',
    password : 'Secreto2@22@++',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

//productores
var producer = new kafka.Producer(client);

producer.on('ready', function() {
        setInterval(function(){


        conexion.query(' SELECT * FROM  listings_activities ORDER BY last_activity LIMIT 5 ', function (error, results, fields) {
            if (error)
                throw error;
                results.forEach(result => {
	            producer.send( [ { topic: 'AnunciaenlineaTopic', messages: result.name_listing + ' : ' + result.description  } ], function (err, data) {} );
                });
            });

	}, 5000 );
});
