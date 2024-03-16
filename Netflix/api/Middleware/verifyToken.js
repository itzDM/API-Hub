import jwt, { decode } from "jsonwebtoken";


const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
            if (err) {
                return res.status(403).json(err.message);
            }

            req.user = user;
            next();


        });
    } else {
        res.status(401).json("You Are Not Authenticate");

    }

};

export default verifyToken;