import jwt from 'jsonwebtoken';
export const middle=(req, res, next)=> {
     //Get the user from the jwt token and add id to req 
    const token=req.header('auth-token');
    console.log(token);
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token11"});
    }
    try {
        const data= jwt.verify(token,process.env.JWT_SECRET);
        console.log(data);
        req.userId=data.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({error:"Please authenticate using a valid token22"});
    }
}