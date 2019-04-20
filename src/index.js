import SocketIO from 'socket.io';
import http from 'http';
import app from './app';

app.listen(8080, () => {
  console.log('Typeracer running on port 8080!');
});

const server = http.createServer(app).listen(8081, () => {
  console.log('Typeracer socket running on port 8081!');
});
const io = SocketIO(server);

let playerCount = 0;
const players = {};
let raceStarted = false;

io.on('connection', (client) => {
  if (raceStarted) {
    client.emit('race-in-progress');
    return;
  }

  playerCount++;
  const playerInfo = {
    id: client.id,
    key: `guest-${playerCount}`,
    name: `Guest ${playerCount}`,
    wpm: 0,
    finished: false
  };
  players[client.id] = playerInfo;

  client.emit('welcome', playerInfo);

  client.on('player-status', (params) => {
    players[client.id] = {
      ...players[client.id],
      ...params,
    };
    io.emit('current-score', players);
  });

  client.on('player-finished', () => {
    players[client.id].finished = true;
    raceStarted = false;
    io.emit('race-over', players[client.id]);
  });

  client.on('time-up', () => {
    raceStarted = false;
  });

  client.on('disconnect', () => {
    io.emit('player-left', `${players[client.id]} has left the server.`);
    delete players[client.id];

    if (Object.keys(players).length === 1) {
      raceStarted = false;
      io.emit('waiting-players');
    }
  });

  if (Object.keys(players).length > 1) {
    io.emit('start-race');
    raceStarted = true;
  }
});
