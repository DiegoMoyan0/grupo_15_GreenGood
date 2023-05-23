// Controladores de las vistas de login, post y register, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {
    getLogin: (req,res) => {
        return res.render('UserViews/login', {title: "Login"});
    },
    getRegister:(req,res) => {
        return res.render('UserViews/register', {title: "Registro"});
    }
}
// exportamos el controller //
module.exports = controller;