// DET GENERELLA SÄTTET (F7, som i föreläsningen och handboken)
// Används när det finns MÅNGA roller med olika rättigheter, t.ex. Admin, Editor, User
// eller i ParishHub: diakon, präst, super admin. Reglerna står i en tabell (roles.js).
// Jämför med require-admin.js: det ENKLA sättet när bara en fråga behövs (är du admin?).
import {roles} from '../roles.js';

// skapar en vakt som bara släpper in den som har permission
// authorize är en "tillverkare": authorize('read') skapar en middleware som kräver 'read'
// därför står den MED parenteser i routen: authorize('read')
export const authorize =(permission) =>{
    // det här är själva vakten (samma form som authenticateToken)
    return (req, res, next) =>{
        // slå upp rollens lista i roles.js, t.ex. Admin → ['create','read','update','delete']
        const userPermissions = roles[req.user.role];
        // rollen finns inte, eller listan saknar rättigheten → 403 (inloggad men får inte)
        if(!userPermissions || !userPermissions.includes(permission)){
            return res.status(403).json({error: 'Du har inte behörighet'})
        }
        // rättigheten finns → släpp vidare till controllern
        next();
    }
}
