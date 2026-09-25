const fs = require('fs');
const content = fs.readFileSync('stitch_script.js', 'utf8');

const idx = content.indexOf('const SEED={');
console.log('const SEED index:', idx);

let open = 0;
let start = content.indexOf('{', idx);
let end = -1;
let inString = false;
let quoteChar = '';
let escape = false;

for (let i = start; i < content.length; i++) {
  const c = content[i];
  if (escape) {
    escape = false;
    continue;
  }
  if (c === '\\') {
    escape = true;
    continue;
  }
  if (inString) {
    if (c === quoteChar) {
      inString = false;
    }
    continue;
  }
  if (c === "'" || c === '"' || c === '`') {
    inString = true;
    quoteChar = c;
    continue;
  }
  if (c === '{') {
    open++;
  } else if (c === '}') {
    open--;
    if (open === 0) {
      end = i;
      break;
    }
  }
}

console.log('Found matching brace at:', end);
if (end !== -1) {
  const seedJsonStr = content.substring(start, end + 1);
  console.log('Seed length:', seedJsonStr.length);
  const fn = new Function('return (' + seedJsonStr + ');');
  const seed = fn();
  console.log('Extracted SEED keys:', Object.keys(seed));

  // Save clean seed without base64
  const cleanSeed = JSON.parse(JSON.stringify(seed, (k, v) => {
    if (typeof v === 'string' && v.startsWith('data:image')) {
      return '[DATA_IMAGE_' + v.length + ']';
    }
    return v;
  }));
  fs.writeFileSync('clean_seed.json', JSON.stringify(cleanSeed, null, 2));
  console.log('clean_seed.json written!');

  // Also extract and save images
  fs.mkdirSync('extracted_assets', { recursive: true });
  function saveBase64(name, dataUri) {
    if (!dataUri || !dataUri.startsWith('data:')) return;
    const match = dataUri.match(/^data:(.+?);base64,(.+)$/);
    if (!match) return;
    const ext = match[1].includes('png') ? 'png' : 'jpg';
    const filename = name + '.' + ext;
    fs.writeFileSync('extracted_assets/' + filename, Buffer.from(match[2], 'base64'));
    console.log('Saved image:', filename);
  }
  if (seed.home && seed.home.photo) saveBase64('profile_photo', seed.home.photo);
  if (seed.home && seed.home.die) saveBase64('die_shot', seed.home.die);
  ['projects', 'hackathons', 'achievements', 'gallery', 'certs'].forEach(cat => {
    if (Array.isArray(seed[cat])) {
      seed[cat].forEach((item, idx) => {
        ['img', 'photo', 'image', 'banner'].forEach(imgKey => {
          if (item[imgKey]) saveBase64(cat + '_' + idx, item[imgKey]);
        });
      });
    }
  });
}
