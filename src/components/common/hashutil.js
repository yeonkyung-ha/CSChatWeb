import sha256 from 'crypto-js/sha256.js';

var UInt32 = function (value) {
	return (value & 0x7FFFFFFF);
};
var highbit = function(value) {
    return (value & 0x80000000);
};

// hashutil generates a SHA256 from first name, last name and
// password. Pass in the 3 strings and the hash is generated 
// and returned.
function hashutil(fullName, password) {
    console.log("|"+fullName+"|");
    console.log("|"+password+"|");

    const passhash = sha256(fullName + password);
    let passouthash = '';
    const translations = ['8','9','a','b','c','d','e','f']

    for (let num of passhash.words) {
        let n1 = UInt32(num);
        let n2 = highbit(num);

        let n1string = n1.toString(16);
        let n1_1string = n1string.substring(1);
        let front = n1string.substring(0,1);

        if (n2 < 0) {
            front = translations[parseInt(front,10)];
        }
        let value = front + n1_1string;
        passouthash += value;
    }
    return passouthash;
  }
export default hashutil;