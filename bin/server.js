'use strict';

const app = require('../src/app')
// Importando node modules
const http = require('http');
const debug = require('debug')('nodestr:server');


// Função para normalizar a porta
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

// Configurando o app
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Criando o servidor
const server = http.createServer(app);

// Tratamento de erros
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Usando o debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// Iniciando o servidor
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta: ' + port);
