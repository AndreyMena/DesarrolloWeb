const fs = require('fs');
const http = require('http');
var url = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const querystring = require('querystring');

function liste(res) {
    const archivo = fs.openSync('visitas.txt', 'r');
    const registros = fs.readFileSync(archivo, 'utf-8').split('\n');

    var counter = 0;
    for (const registro of registros) {
        const visita = registro.split(':');
        console.log(visita);
        if (visita.length === 1) {

        }else{
            console.log(visita.length)
            res.write('<p><em>Comentario enviado por <a href="mailto:'+visita[1]+'">'+visita[0]+'</a>.</em><br />Fecha: '+visita[2]+'<br /><q>'+visita[3]+'</q></p>');
        }
    }

    fs.closeSync(archivo);
}

function grabe(post) {
    const fecha = new Date();
    fs.appendFile(
        'visitas.txt',
    post.nombre + ':' + post.correo + ':' + fecha.getDay() + '/' + (fecha.getMonth()+1) + '/' + fecha.getYear() + ':' + post.comentario.replace('\n', '<br />').replace('\r\n', '')+"\n",
    function (error) {
        if (error) throw error;
            console.log('¡Visita añadida!');
        }
    );
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const get = url.parse(req.url, true).query;

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
        post = querystring.parse(body)
        if (req.url == '/grabe') {
            console.log(post.nombre);
            grabe(post)
        }
      });

    }
    
    console.log(req.url);
    switch(req.url) {
    case '/liste':
      res.write('<h1>Libro de Visitas</h1>');
      res.write(`<p><a href="${req.pathname || '/'}">Enviar un nuevo comentario.</a></p>`);
      liste(res);
      res.write(`<p><a href="${req.pathname || '/'}">Enviar un nuevo comentario.</a></p>`);
      break;
    case '/grabe':

        const grabe = `
                <p>
                    Comentario agregado exitosamente
                </p>

            <a href="liste">Ver comentarios</a>
            <br />
            <br />
            <a href="liste">Agregar otro comentario</a>
            `;
        res.end(grabe);
      break;
    default:

    const form2 = `
        <form name="visita" id="visita" method="post" action="grabe">
            <input name="accion" type="hidden" value="grabe" />
            <p>Este formulario le permite enviar comentarios sobre este sitio.</p>
            <p>Nombre:
                <input name="nombre" type="text" id="nombre" size="51" maxlength="50" required/>
            </p>
            <p>Correo electr&oacute;nico:
                <input name="correo" type="text" id="correo" size="51" maxlength="50" required/>
            </p>

            <p>Comentario:
                <textarea name="comentario" cols="50" rows="3" wrap="VIRTUAL" id="comentario" required></textarea>
            </p>
            <p>
                <input name="Enviar" type="submit" id="Enviar" />
            </p>
        </form>

        <a href="liste">Ver comentarios</a>
    `;
    res.end(form2);
    }
    res.end();
});

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${server.address().port}/`);
});