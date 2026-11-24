import bcrypt from 'bcrypt';

const password = 'hemligt123';
console.time('10 rundor');
await bcrypt.hash(password,10);
console.timeEnd('10 rundor');// resultat från teminalen 10 rundor: 49.257ms

console.time('14 rundor');
await bcrypt.hash(password, 14);
console.timeEnd('14 rundor'); // svar 14 rundor: 773.114ms

// för En angripare som gissar 1 miljon lösenord
// 10 roundor = 14 h, 14 rundor= 9 dagar