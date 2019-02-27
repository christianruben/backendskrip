// const con = require('./connection');
// const util = require('../util');

// con.query("SELECT * FROM admin ORDER BY id_admin DESC", (err, results, fields)=>{ // Select table
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(results);
//     // console.log(fields);
// });
// console.log(util.getDateNow());
// let passhash = util.passEncrypt("HelloWorld");
// console.log(passhash);
// con.query("INSERT INTO admin(username, name, password, tanggal_pembuatan) VALUES(?,?,?,?)", ["rhyurhyu", "kristbyen", passhash, util.getDateNow()], (err, results, fields)=>{
//     if(err) {
//         console.log(err);
//         return;
//     }
//     // console.log(results);
//     // console.log(fields);
// });
// util.passValidate("$2a$10$QpwWOeR.JCMp8XRTffnDNuTioyk/PsqXSbQ/H3.84VDWcPp1nDZcu", "HelloWorld", (err, res)=>{
//     if(err) return;
//     console.log(res ? "Match" : "Not Match");
// });

const admdb = require('./admin');

admdb.CreateAdmin({firstname: "Kristian", secondname: "Ruben", username: "rhyuben", password: "starmoon0902", image: ""}, (result)=>{
    if(result.status === 0){
        console.log("GAGAL");
    }else{
        console.log("BERHASIL");
    }
})

// admdb.AdminList({search: "", orderby: "firstname", order: "ASC", index: 0, len: 10}, (err, res, field)=>{
//     if(err) throw err;
//     res.forEach(element => {
//         console.log(element.firstname);
//     });
// });