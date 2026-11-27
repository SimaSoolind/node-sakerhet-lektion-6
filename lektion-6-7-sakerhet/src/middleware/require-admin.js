// DET ENKLA SÄTTET (10-sekundersregeln)
// Används när det bara finns EN fråga: är du admin? Lektion 7 och Skär-projektet.
// Behöver ingen roles.js. Man ska kunna läsa koden på 10 sekunder.
// Jämför med authorize.js: det GENERELLA sättet för många roller och rättigheter.

// en vanlig middleware (samma form som authenticateToken)
// därför står den UTAN parenteser i routen: requireAdmin
export const requireAdmin = (req, res, next) =>{
    // rollen kommer från token (authenticateToken sparade den i req.user), !== betyder "är inte lika med"
    if (req.user.role !== 'Admin'){
        // inloggad men inte admin → 403
        return res.status(403).json({error: 'Bara admin får göra detta'});
    }
    // admin → släpp vidare till controllern
    next();
}
