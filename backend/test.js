const { spawn } = require('child_process');
const server = spawn('node', ['src/index.js'], { env: { ...process.env, PORT: 5001 } });
server.stdout.on('data', d => console.log('STDOUT:', d.toString()));
server.stderr.on('data', d => console.log('STDERR:', d.toString()));
setTimeout(() => {
  fetch('http://localhost:5001/')
    .then(r => r.text())
    .then(t => { 
      console.log('RESPONSE:', t.substring(0, 1000)); // Log first 1000 chars of HTML
      server.kill(); 
    }).catch(e => {
      console.log('FETCH ERR:', e.message);
      server.kill();
    });
}, 2000);
