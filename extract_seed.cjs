const fs = require('fs');

const code = fs.readFileSync('stitch_script.js', 'utf8');

// Find where SEED starts and ends
const seedStart = code.indexOf('const SEED=');
console.log('seedStart:', seedStart);

// Let's find where SEED ends by finding "const S=" or similar
const afterSeed = code.indexOf('const S=', seedStart);
console.log('afterSeed:', afterSeed);

let seedStr = code.substring(seedStart + 'const SEED='.length, afterSeed).trim();
if (seedStr.endsWith(';')) seedStr = seedStr.slice(0, -1);

console.log('seedStr length:', seedStr.length);

// Safely eval object literal: wrap in parenthesis
const fn = new Function('return (' + seedStr + ');');
const seed = fn();

console.log('Parsed SEED keys:', Object.keys(seed));

// Extract images to separate files to keep clean
fs.mkdirSync('extracted_assets', { recursive: true });

function saveBase64(name, dataUri) {
  if (!dataUri || !dataUri.startsWith('data:')) return dataUri;
  const match = dataUri.match(/^data:(.+?);base64,(.+)$/);
  if (!match) return dataUri;
  const ext = match[1].includes('png') ? 'png' : 'jpg';
  const filename = `${name}.${ext}`;
  fs.writeFileSync(`extracted_assets/${filename}`, Buffer.from(match[2], 'base64'));
  return `extracted_assets/${filename}`;
}

if (seed.home && seed.home.photo) {
  saveBase64('profile_photo', seed.home.photo);
}
if (seed.home && seed.home.die) {
  saveBase64('die_shot', seed.home.die);
}

// Check other images in projects, hackathons, gallery, achievements, certs
['projects', 'hackathons', 'achievements', 'gallery', 'certs'].forEach(cat => {
  if (Array.isArray(seed[cat])) {
    seed[cat].forEach((item, idx) => {
      ['img', 'photo', 'image', 'banner'].forEach(imgKey => {
        if (item[imgKey] && typeof item[imgKey] === 'string' && item[imgKey].startsWith('data:')) {
          saveBase64(`${cat}_${idx}_${imgKey}`, item[imgKey]);
        }
      });
    });
  }
});

const cleanSeed = JSON.parse(JSON.stringify(seed, (k, v) => {
  if (typeof v === 'string' && v.startsWith('data:image')) {
    return '[DATA_IMAGE]';
  }
  return v;
}));

fs.writeFileSync('clean_seed.json', JSON.stringify(cleanSeed, null, 2));
console.log('Successfully wrote clean_seed.json and extracted assets!');
