const fs = require('fs');

const file = 'content.json';
const args = process.argv.slice(2);
const command = args[0];

let posts = JSON.parse(fs.readFileSync(file, 'utf8'));

if (command === 'text' && args.length >= 3) {
  posts.push({
    type: 'text',
    title: args[1],
    content: args.slice(2).join(' ')
  });
} else if (command === 'video' && args.length >= 3) {
  if (!args[2].startsWith('https://')) {
    console.log('Gunakan link video HTTPS.');
    process.exit(1);
  }

  posts.push({
    type: 'video',
    title: args[1],
    url: args[2]
  });
} else if (command === 'list') {
  console.log(posts);
  process.exit(0);
} else if (command === 'delete') {
  const index = Number(args[1]);
  if (!Number.isInteger(index) || index < 1 || index > posts.length) {
    console.log('Nomor postingan tidak valid.');
    process.exit(1);
  }
  posts.splice(index - 1, 1);
} else {
  console.log('Perintah:');
  console.log('node manage.js text "Judul" "Isi"');
  console.log('node manage.js video "Judul" "Link HTTPS"');
  console.log('node manage.js list');
  console.log('node manage.js delete NOMOR');
  process.exit(1);
}

fs.writeFileSync(file, JSON.stringify(posts, null, 2));
console.log('Konten berhasil diperbarui!');
