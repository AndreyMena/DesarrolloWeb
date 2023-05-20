


const { fstat } = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function grabe(req) {
    const fecha = new Date();
    fs.appendFile(
        'visitas.tx',
        req.nombre + ':' + req.correo + ':' + fecha.getDay() + '/' + fecha.getMonth() +1
        + fecha.getYear() + ':' + req.comentario.replace('\n', '<br />').replace('\r\n',''),
        function(error) {
            if (error) throw error;
            console.log()
        }
    );
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



//segundo archivo
/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    switch (req.accion) {
        case 'liste':
            res.write(<h1>Libro de visitas</h1>);
            res.write(<p><a href="${req.url}">Enviar un nuevo comentario</a></p>);
            liste(res);
            res.write(<p><a href="${req.url}">Enviar un nuevo comentario</a></p>);
            break;
        case 'grabe':
            break;
        default:
    }
});

*/

