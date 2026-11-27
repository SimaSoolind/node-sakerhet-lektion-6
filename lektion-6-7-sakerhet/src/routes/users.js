import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/require-admin.js';
import { getAllUsers, deleteUser } from '../services/userService.js';

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
    router.delete('/users/:id', authenticateToken, requireAdmin, async (req,res) =>{
       try{
        const id = req.params.id
        const deletedUser = await deleteUser(id);
        if(!deletedUser) {
            return res.status(404).json({error: 'Användaren finns inte'})
        }
        res.status(200).json(deletedUser)
       } catch(error){
        res.status(500).json({error: 'Något gick fel'})

       }
    })
// delar rutterna med server.js
export default router;
