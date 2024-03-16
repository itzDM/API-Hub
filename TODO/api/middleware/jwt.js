import jwt from "jsonwebtoken";


// generateToken

export const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.SECRETE_KEY);
};


// verifyToken
export const verifyToken = (req, res, next) => {
    const auth = req.headers.token;
    if (auth) {
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.SECRETE_KEY, (err, data) => {
            if (err) {
                return res.status(403).json(err.message);
            }
            req.user = data;
            next();
        });

    } else {
        res.status(401).json("You are not Authenticate");
    }
};