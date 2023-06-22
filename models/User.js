const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const models = {

    route: '../database/usersDataBase.json',


    findAll: function () {
        const usersJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8')
        const users = JSON.parse(usersJSON);

        return users;
    },

   
    findById: function (id) {

        const users = this.findAll();

        const searched = users.find(item => item.id === id);

        (!searched)? searched = null: searched; 

        return searched;
        
    },

    findByFiled: function (field, value) {

        let users = this.findAll();

        let searched = users.find(item => item[field] === value);

        (!searched)? searched = null: searched; 

        return searched;
        
    },

  
    deleteById: function (id) {

        let users = this.findAll();

        users = users.filter(item => item.id !== id);

        fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(users, null, ' ')); 

        return users;
    },

    
    updateById: function (id, newData) {

        let users = this.findAll();

        const index = users.findIndex(item => item.id === id);

        const {name_data, user_name, birth_date, email, password, adress, user_image, user_type, phone} = newData 

        users[index] = {
            id: users[index].id,
            name_data,//Revisar
            user_name,
            birth_date,
            email,
            password,
            adress,
            user_image,
            user_type,
            phone
        };

        fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(users, null, ' '));
        
    },


    createOne: function (newUser) {

        let users = this.findAll();

        newUser.id = uuid.v4();

        users.push(newUser);

        const usersJSON = JSON.stringify(users, null , ' ');

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

        return newUser;
    },
}

module.exports = models;