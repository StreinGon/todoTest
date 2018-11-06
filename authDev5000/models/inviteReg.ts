const mongoose = require('mongoose');

const inviteToRegSchema = mongoose.Schema({
  sessionActivity: { type: Date, expires: '86400s', default: Date.now },
  invite_token: { type: String, required: true },
});
const inviteToRegSchemaModel = mongoose.model('InviteToReg', inviteToRegSchema);
export  { inviteToRegSchemaModel };
