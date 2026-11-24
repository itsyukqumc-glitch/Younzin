fetch('content.json')
.then(r => r.json())
.then(posts => {
  const root = document.getElementById('posts');
  root.innerHTML = '';

  posts.slice().reverse().forEach(post => {
    const item = document.createElement('article');
    item.className = 'post';

    const title = document.createElement('h3');
    title.textContent = post.title;
    item.appendChild(title);

    if (post.type === 'text') {
      const p = document.createElement('p');
      p.textContent = post.content;
      item.appendChild(p);
    } else {
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      video.src = post.url;
      item.appendChild(video);
    }

    root.appendChild(item);
  });
})
.catch(() => {
  document.getElementById('posts').textContent =
    'Belum ada postingan.';
});
