const User = require('../models/user');
const Userroles = require('../models/user_roles');
exports.signup = (req, res) => {
    console.log(req.body);
    //create a new user instance

    User.find({ name: { $ne: null } }, function (err, users) {
        const user = new User(req.body);
        //user table is not empty
        if (users.length) {


            //user dsave
            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({ err: 'something went wrong' });
                }

            });
            const userroles = new Userroles({ user_id: user._id, Roles: "others" });
            //user roles save
            userroles.save((err, roles) => {
                if (err) {
                    return res.status(400).json({ err: 'something went wrong' });
                }
                else {

                    res.json({ user: user, userroles: roles });
                }
            });
            //user is empty
        } else {


            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({ err: 'something went wrong' });
                }

            });
            const userroles = new Userroles({ user_id: user._id, Roles: "admin" });
            userroles.save((err, roles) => {
                if (err) {
                    return res.status(400).json({ err: 'something went wrong' });
                }
                else {

                    res.json({ user: user, userroles: roles });
                }
            });
        }
    });


}