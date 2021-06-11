const Menu = require('../../models/menu')
function homeController() {
    return {
        async index(req, res) {
            const data = await Menu.find();     //by using async
            // console.log(data);
            res.render('home.ejs', { data: data });      //1st data is a new variale where we are storing data in the form of Array
            // Menu.find().then(function (data) {       //by using traditional method
            //     console.log(data);
            //     res.render('home.ejs')
            // }
            // )
        }
    }
}

module.exports = homeController