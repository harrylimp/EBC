var ndef = require('./lib/ndef');

// if (process.version.indexOf('v0.8') === 0) {
//     // Monkey Patch Buffer for Node 0.8 support
//     Buffer.prototype.toJSON = function() {
//         j = [];
//         for (var i = 0; i < this.length; i++) {
//             j[i] = this[i];
//         }
//         return j;
//     }
// }
//global.Buffer.TYPED_ARRAY_SUPPORT = false;

module.exports = ndef;
