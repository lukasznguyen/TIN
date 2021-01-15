// const ClientRepository = require('../repository/sequelize/ClientRepository');
//
// exports.login = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     ClientRepository.findByEmail(email)
//         .then(myClient => {
//             if(!myClient) {
//                 res.render('index', {
//                     navLocation: '',
//                     loginError: "Nieprawidłowy adres email lub hasło"
//                 })
//             } else if(myClient.password === password) {
//                 req.session.loggedUser = myClient;
//                 res.redirect('/');
//             } else {
//                 res.render('index', {
//                     navLocation: '',
//                     loginError: "Nieprawidłowy adres email lub hasło"
//                 })
//             }
//
//         })
//         .catch(err => {
//             console.log(err);
//         });
//
// }
//
// exports.logout = (req, res, next) => {
//     req.session.loggedUser = undefined;
//     res.redirect('/');
// }