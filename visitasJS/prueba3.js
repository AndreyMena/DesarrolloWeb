const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const hostname = '127.0.0.1';
const commentsFile = path.join(__dirname, 'comments.json');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            // Ruta raíz, mostrar el formulario para dejar un comentario
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const form = `
                <html>
                <head><title>Dejar Comentario</title></head>
                <body>
                    <h1>Dejar Comentario</h1>
                    <form method="POST" action="/comment">
                        <textarea name="comment" rows="5" cols="40" placeholder="Escribe tu comentario"></textarea><br>
                        <input type="submit" value="Enviar comentario">
                    </form>
                </body>
                </html>
            `;
            res.end(form);
        } else if (req.url === '/comments') {
            // Ruta para mostrar todos los comentarios
            fs.readFile(commentsFile, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error interno del servidor');
                } else {
                    const comments = JSON.parse(data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    const commentList = comments.map(comment => `<li>${comment}</li>`).join('');
                    const html = `
                        <html>
                        <head><title>Comentarios</title></head>
                        <body>
                            <h1>Comentarios</h1>
                            <ul>${commentList}</ul>
                            <p><a href="/">Volver</a></p>
                        </body>
                        </html>
                    `;
                    res.end(html);
                }
            });
        } else {
            // Ruta no válida
            res.statusCode = 404;
            res.end('Ruta no encontrada');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/comment') {
            // Ruta para recibir el comentario enviado por POST
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const comment = url.parse(`?${body}`, true).query.comment;
                if (comment) {
                    fs.readFile(commentsFile, 'utf8', (err, data) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end('Error interno del servidor');
                        } else {
                            const comments = JSON.parse(data);
                            comments.push(comment);
                            fs.writeFile(commentsFile, JSON.stringify(comments), 'utf8', err => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.end('Error interno del servidor');
                                } else {
                                    res.statusCode = 302;
                                    res.setHeader('Location', '/comments');
                                    res.end();
                                }
                            });
                        }
                    });
                } else {
                    res.statusCode = 400;
                    res.end('Comentario inválido');
                }
            });
        } else {
            // Ruta no válida
            res.statusCode = 404;
            res.end('Ruta no encontrada');
        }
    } else {
        // Método HTTP no válido
        res.statusCode = 405;
        res.end('Método no permitido');
    }
    });
    
    const port = 3000;
    server.listen(port, () => {
    console.log('Servidor escuchando en el puerto ${port}');
    });