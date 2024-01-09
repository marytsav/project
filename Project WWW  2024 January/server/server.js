const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const base64 = require('base-64');
// Serve static files from the 'public' directory
app.use(express.static('../public'));

// Serve the HTML file for all other requests (SPA behavior)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    console.log(`Attempting to serve: ${filePath}`);
    res.sendFile(filePath);
});

app.get('/authors', (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost', // Replace with your host name
        user: 'root',      // Replace with your database username
        password: '',      // Replace with your database password
        database: 'newdb' // // Replace with your database Name
      }); 
      conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
      });
      var sql='SELECT * FROM authors';
      conn.query(sql, function(err, result,fields) {
        if(err) throw err;
        console.log(result);
        var data = JSON.stringify(result);
        res.writeHead(200);
        res.end(data);
      });
});

app.get('/users', (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost', // Replace with your host name
        user: 'root',      // Replace with your database username
        password: '',      // Replace with your database password
        database: 'newdb' // // Replace with your database Name
      }); 
      conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
      });
      var sql='SELECT * FROM users';
      conn.query(sql, function(err, result,fields) {
        if(err) throw err;
        console.log(result);
        var data = JSON.stringify(result);
        res.writeHead(200);
        res.end(data);
      });
});

app.get('/singers', (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost', // Replace with your host name
        user: 'root',      // Replace with your database username
        password: '',      // Replace with your database password
        database: 'newdb' // // Replace with your database Name
      }); 
      conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
      });
      var sql='SELECT * FROM singers';
      conn.query(sql, function(err, result,fields) {
        if(err) throw err;
        console.log(result);
        var data = JSON.stringify(result);
        res.writeHead(200);
        res.end(data);
      });
});

app.get('/albums', (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost', // Replace with your host name
        user: 'root',      // Replace with your database username
        password: '',      // Replace with your database password
        database: 'newdb' // // Replace with your database Name
      }); 
      conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
      });
      var sql='SELECT * FROM albums';
      conn.query(sql, function(err, result,fields) {
        if(err) throw err;
        console.log(result);
        var data = JSON.stringify(result);
        res.writeHead(200);
        res.end(data);
      });
});

app.get('/images', async (req, res) => {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost', // Replace with your host name
        user: 'root',      // Replace with your database username
        password: '',      // Replace with your database password
        database: 'newdb' // // Replace with your database Name
      }); 
      conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
      });
      var sql='SELECT images FROM albums';
        const getImages = () => {
            return new Promise((resolve, reject) => {
                conn.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        
                        if (Array.isArray(results) && results.length) {
                            resolve(results.map(row => row.images));
                        } else {
                            reject(new Error('No data found or invalid data structure'));
                        }
                    }
                });
            });
        };

    const images = await getImages();
    console.log(images);

      const convertedImages = images.map(image => {
        //images are buffers, we convert them to base64
        const base64Data = image.toString('base64');
        return `data:image/jpeg;base64,${base64Data}`;
    });
    //res.writeHead(200);
    res.json(convertedImages);
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});