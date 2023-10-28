const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000; // Porta del server

// Configura il middleware per servire i file statici (HTML, JS, immagini)
app.use(express.static('public'))
app.get('/img', (req, res) => {
    const imageFolderPath = path.join(__dirname, 'public/img'); // Assicurati che il percorso sia corretto
    fs.readdir(imageFolderPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Errore nella lettura della cartella delle immagini.');
        }
        const imagePaths = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'))
            .map(file => '/img/' + file); // Crea un elenco di percorsi alle immagini
        res.json(imagePaths);
    });
});

// Avvia il server
app.listen(port, () => {
    console.log(`Il server è in esecuzione su http://localhost:${port}`);
});
