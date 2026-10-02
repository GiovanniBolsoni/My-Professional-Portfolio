const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
  { name: 'html5', v: 'original' },
  { name: 'css3', v: 'original' },
  { name: 'javascript', v: 'original' },
  { name: 'typescript', v: 'original' },
  { name: 'react', v: 'original' },
  { name: 'python', v: 'original' },
  { name: 'flask', v: 'original' },
  { name: 'bootstrap', v: 'original' },
  { name: 'vitejs', v: 'original' },
  { name: 'vercel', v: 'original' },
  { name: 'git', v: 'original' },
  { name: 'github', v: 'original' },
  { name: 'salesforce', v: 'original' },
  { name: 'vscode', v: 'original' },
  { name: 'notion', v: 'original' }
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  const dir = path.join(__dirname, 'public', 'logos');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const logo of logos) {
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/${logo.name}/${logo.name}-${logo.v}.svg`;
    const dest = path.join(dir, `${logo.name}.svg`);
    try {
      await downloadFile(url, dest);
      console.log(`Downloaded ${logo.name}`);
    } catch (e) {
      console.error(e);
    }
  }

  // AWS Special Case (Simple Icons for clean square)
  try {
    await downloadFile('https://cdn.simpleicons.org/amazonaws/232F3E', path.join(dir, 'amazonwebservices.svg'));
    console.log(`Downloaded AWS from Simple Icons`);
  } catch (e) {
    console.error(e);
  }
}

main();
