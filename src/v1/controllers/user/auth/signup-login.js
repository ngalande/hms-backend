const bcrypt = require('bcrypt');
User = require("../../../models/user")

exports.loginUser = async (req, res) => {
    //return res.send("login")
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ message: 'User not found',});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)return res.status(401).json({message: 'Incorrect password, try again'});
            await user.generateAuthToken()
            //await user.generateRefreshToken();
            res.status(200).send({
                userid: user._id,
                token: user.token,
                message: "login successful",
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}