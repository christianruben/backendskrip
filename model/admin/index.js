const connection = require('../connection');

class Admin{
    constructor(){}

    Auth(username, password, callback){
        connection.execute('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, results, fields)=>{
            if(err) return;
            
        });
    }

    CreateAdmin({firstname, secondname, username, password, image, phonenumber, email}, callback){
        
    }

    UpdateAdmin({id, firstname, secondname, username, password, phonenumber, email}, callback){

    }

    UpdateAdminImage({id, image}, callback){

    }

    DeleteAdmin({id}, callback){

    }

    AdminList({orderby, order, rows}, callback){
        
    }
}

module.exports = Admin;