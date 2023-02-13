// Author: Zach Flathers
// Last Date Modified: 2/10/23
// Description: 


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
const twitchClientId = process.env.CLIENT_ID;
const twitchSecretToken = process.env.CLIENT_SECRET;
let client; // forward declaration of variable

// CITE: https://github.com/jgdigitaljedi/video-game-db-supplemental-data/blob/master/server/igdb.controller.js

// helper functions
async function getAppAccessToken() {
  return axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretToken}&grant_type=client_credentials`
  );
}

// Refresh API key
async function refreshAppKey() {
    try {
        const appKeyRes = await getAppAccessToken();
        appKey = appKeyRes.data;
        return igdb(twitchClientId, appKey.access_token);
    } catch (e) {
        console.error(e);
    }
}

// Helper search function 
async function fuzzyApiSearch(game) {
    if (!client || !appKey) {
      client = await refreshAppKey();
    }
    return client
      .fields(`name,first_release_date,cover.url,id`)
      .search(game)
      .request('/games');
  }

// route handlers
app.get('/', (req, res) => {
    refreshAppKey();
    res.sendFile('index.html', {root: __dirname});                                         
});

app.get('/search', async (req, res) => {
    const name = req.query.game;
    console.log(name);
    try {
        if (name) {
        const apiResults = await fuzzyApiSearch(name);
        const data = apiResults.data;
        res.json(data);
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
