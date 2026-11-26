// hämta paket
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByUsername } from '../services/userService.js';

// samla alla rutter
const router = express.Router();
// POST /register: skapa konto
router.post('/register', async (req, res) => {
  // plockar upp namn och lösenord.
  const { username, password } = req.body ?? {};
  // 400 om något saknas eller är för kort
  if (!username || !password || password.length < 8) {
    return res
      .status(400)
      .json({ error: 'namn och lösenord(minst 8 tecken)krävs.' });
  }
  try {
    // spara användare
    const user = await registerUser(username, password);
    // med svar 201 skapad
    res.status(201).json(user);
  } catch (error) {
    // 23505 = namnet finns redan
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Användarnamnet är upptaget.' });
    }
    // 500 utan tekniska detaljer
    res.status(500).json({ error: 'Något gick fel' });
  }
});
// post log in 
router.post('/login', async (req,res) => {
  //plocka in värden logg in 
  const {username,password} = req.body ?? {};
  if (!username || !password){
    //om det saknas något svara med 400
    return res.status(400).json({error:'Namn och lösenord krävs'});
  }
  try{
    //med try försöker jag fånga fel.
    const user = await findUserByUsername(username);
    // 401 (jag vet inte vem du är)ges om namnet inte finns
    if (!user){
      return res.status(401).json({error:'Fel namn eller lösenord'})
    }
    // komihåg: Hash när jag sparar, compare när jag loggar in.
    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if(!passwordOk){
      return res.status(401).json({error:'Fel namn eller lösenord'});
    }
    // skapa token(armbandet), giltigt i en timme
    //header = automatiskt, payload = du skriver, signature = hemligheten räknar.
    const token = jwt.sign({id:user.id, username: user.username, role: user.role},
      process.env.JWT_SECRET,{expiresIn:'1h'}
    );
    res.status(200).json({token: token});
  }catch(error) {
    //ger kod 500 
    res.status(500).json({error:'Något gick fel'}); 

  }

  
});

// delar rutterna med server.js
export default router;
