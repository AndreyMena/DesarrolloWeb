const { fstat } = require('fs');

const http = require('http');
const { URL } = require('url');

const hostname = '127.0.0.1';
const port = 3000;

function grabe(post) {
    const fecha = new Date();
    fs.appendFile(
        'visitas.txt',
    post.nombre + ':' + post.correo + ':' + fecha.getDay() + '/' + (fecha.getMonth()+1) + '/' + fecha.getYear() + ':' + post.comentario.replace('\n', '<br />').replace('\r\n', ''),
    function (error) {
        if (error) throw error;
            console.log('¡Visita añadida!');
        }
    );
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const get = new URL(req.url, `http://${req.headers.host}`).searchParams;
    
    //let post = null;
    console.log(req.method);
    if (req.method === 'POST') {
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            post = parse(body);
        });
    }

    //const accion = get.get('accion') || post?.accion;

    accion = get.accion || post.accion;
    console.log(accion);

    switch (accion) {
        case 'liste':
            res.write('<h1>Libro de Visitas</h1>');
            res.write(`<p><a href="${req.url || '/'}">Enviar un nuevo comentario.</a></p>`);
            liste(res);
            res.write(`<p><a href="${req.url || '/'}">Enviar un nuevo comentario.</a></p>`);
            break;
        case 'grabe':
            // Realiza alguna acción para la opción 'grabe'
            break;
        default:
            // Acción predeterminada
    }
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});



/*
const http = require('http');

const hostname = '127.0.0.2';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


*/