import crypto from 'crypto';

//texten jag ska göra hash av
const password = 'hemligt124';
//gör om texten till en hash med sha256, createHash=hashMaskinen skapa ->uppdatera->smält den i hexform-> testa
const hash = crypto.createHash('sha256').update(password).digest('hex');

// testar,visa texten och dess hash
console.log('Text', password);
console.log('Hash', hash);