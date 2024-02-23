const io = require('socket.io-client');

// Replace 'http://localhost:4000' with the URL of your Socket.IO server
const socket = io('http://localhost:4000', {
  query: {
    username: 'testUser', // Provide a username if required by your server
  },
});

// Event handlers for socket events
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});

socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});

// Additional event handlers as needed

// Example: Send a message to the server
socket.emit('chatMessage', 'Hello, server!');
