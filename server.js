/**
 * process.env.TWILIO_ACCOUNT_SID [Generate Here]()
 * process.env.TWILIO_API_KEY [Generate Here]()
 * process.env.TWILIO_API_SECRET [Generate Here]()
 */

require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const { jwt } = require('twilio');
const { AccessToken } = jwt;
const { VideoGrant } = AccessToken;

app.use(express.static('public'));
app.get('/token', generateToken);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

function generateToken (request, response) {
  const identity = randomName();

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = identity;

  const grant = new VideoGrant();
  token.addGrant(grant);

  response.send({
    identity: identity,
    token: token.toJwt()
  });
}

function randomName () {
  return `Ryan ${Math.floor(Math.random() * 1000)}`
}
