import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllUsers } from '../services/userService.js';

//1. samla alla rutterna
const router = express.Router();

//GET/users: bara giltig token
router.get('/users', authenticateToken, async (req, res) => {
    try{
        //hämta alla användare 
        const users = await getAllUsers();
        //resultat:200 + listan
        res.status(200).json(users);

    }catch (error){
        res.status(500).json({error:'Något gick fel'});
    }
});

// delar rutterna med server.js
export default router;
