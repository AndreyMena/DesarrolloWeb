const http = require('http');

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
  res.write('<h1>Libro de Visitas</h1>');

  const form = `
    <h3>Dejar Comentario</h3>
    <form method="POST" action="grabe()">
        <textarea name="comment" rows="5" cols="40" placeholder="Escribe tu comentario"></textarea><br>
        <input type="submit" value="Enviar comentario">
    </form>
  `;


  const form2 = `
    <form name="visita" id="visita" method="post" action="grabe()">
        <input name="accion" type="hidden" value="grabe" />
        <p>Este formulario le permite enviar comentarios sobre este sitio.</p>
        <p>Nombre:
            <input name="nombre" type="text" id="nombre" size="51" maxlength="50" />
        </p>
        <p>Correo electr&oacute;nico:
            <input name="correo" type="text" id="correo" size="51" maxlength="50" />
        </p>

        <p>Comentario:
            <textarea name="comentario" cols="50" rows="3" wrap="VIRTUAL" id="comentario"></textarea>
        </p>
        <p>
            <input name="Enviar" type="submit" id="Enviar" />
        </p>
    </form>

    <a href="liste">Ver comentarios</a>
  `;


  res.end(form2);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});