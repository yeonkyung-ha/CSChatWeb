import hashutil from './hashutil.js';

let full_name = "Yeonkyung Ha";
let pw = "";
const passhash = hashutil(full_name, pw);

console.log ('Passhash: ' + passhash);
//9d849787d54dce38d35f366025f76e22e03df7ce05b305e61551585c0ddbaa7