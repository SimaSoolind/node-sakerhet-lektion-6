import jwt from 'jsonwebtoken';// hämta jwt för att kolla token
export const authenticateToken = (req, res,next) =>{
   // läsa headern
   const authHeader = req.headers.authorization;
   // tar det står efter mellanslaget med hjälp av 'split' själva token.[1] betyder att den tar andra plats 
   const token = authHeader?.split(' ')[1];
   if (!token){
    //401(jag vet inte vem du är)om ingen token skickas
    return res.status(401).json({error:'Token saknas'})
   }
   try{
    // kollar stämpel med hemligheter, ger en payload är äkta
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //sparar vem användaren är, så att routen kan läsa den 
    req.user = payload;
    //släpp vidare till routen
    next();
    // fångar felet ger 403
   } catch (error){
    // 403(jag vet vem du är men du får inte komma in) ger falskt om token är gammal
    return res.status(403).json({error:'Ogiltigt token'});
   }
}
