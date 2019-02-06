const connection = require('../connection');

export default class {
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