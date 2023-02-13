require('dotenv').config();
const express = require('express'); // Import express
const igdb = require('igdb-api-node').default;
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();              // Instantiate express app

// For parsing application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// variables
const port = 5000;
const twitchClientId = process.env.CLIENT_ID; // 'qjtdnsfn9pqsdybu2zhwrhsq46vl2q';
const twitchSecretToken = process.env.CLIENT_SECRET; // 'w23yddb384nkoinridzgysgg7axqv0'; 
let client; // forward declaration of variable

// from: https://github.com/jgdigitaljedi/video-game-db-supplemental-data/blob/master/server/igdb.controller.js

// helper functions
async function getAppAccessToken() {
  return axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretToken}&grant_type=client_credentials`
  );
}

//
async function refreshAppKey() {
    try {
        const appKeyRes = await getAppAccessToken();
        appKey = appKeyRes.data;
        //console.log('clientId', twitchClientId);
        //console.log('token', appKey.access_token);
        return igdb(twitchClientId, appKey.access_token);
    } catch (e) {
        console.error(e);
    }
}

// 
async function apiSearch(game) {
    if (!client || !appKey) {
      client = await refreshAppKey();
    }
    return client
      .fields(`name,first_release_date,cover.url,id`)
      .search(game)
      .request('/games');
  }

 /* async function apiCoverArt(coverId) {
    if (!client || !appKey) {
      client = await refreshAppKey();
    }
    return client
      .fields(`url`)
      .request('/covers');
  } */

// route handlers
app.get('/', (req, res) => {
    refreshAppKey();
    res.sendFile('index.html', {root: __dirname});                                         
});

app.get('/search', async (req, res) => {
    const name = req.query.game;
    try {
        if (name) {
          const searchResults = await apiSearch(name);
          const data = searchResults.data;
          res.send(data);
        } else {
          res.status(500).json({ error: true, message: 'What is your game called?' });
        }
    } catch (e) {
        console.error(e);
    }
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});
