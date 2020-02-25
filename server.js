const express = require("express");
const server = express();
const nunjucks = require("nunjucks");


server.use(express.static(__dirname + '/public'));

server.use(express.urlencoded( {extended: true}));

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: 'ynuiasha12',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

nunjucks.configure('./', {
    express: server
});

server.get("/", (req, res) => {
    
    db.query("SELECT * FROM donors;", (err, result) => {
        if(err) 
            return res.send("Erro no banco de dados!");

        const donors = result.rows;
        return res.render("index.html", { donors });
    });
    
});

server.post("/", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let blood = req.body.blood;
    const queryInsert = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3);
    `;
    const values = [name, email, blood];

    if(name != "" && email != "" && blood !=""){
        db.query(queryInsert, values, (err) => {
            if(err) 
                return res.send("Erro no banco de dados");
            else
                return res.redirect("/");
        });
    } else {
        return res.send("Todos os campos são de preenchimento obrigatorio");
    }
    
    
});

server.listen(8080, () => {
     console.log(200);
});