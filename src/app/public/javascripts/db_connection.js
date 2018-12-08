var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blogDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


  sql = 'select * from Post;'

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
})

function query(sql,callback){
  connection.getConnection(function(err,connection){
    connection.query(sql,function(err,rows){
      callback(err,rows);
      connection.release();
    })
  })
}
 
exports.query = query;