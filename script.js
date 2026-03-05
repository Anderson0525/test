// Minimal JS to demonstrate interactivity
const btn = document.getElementById('actionBtn');
const msg = document.getElementById('message');
const list = document.getElementById('items');

let counter = 0;
btn.addEventListener('click', () => {
  counter += 1;
  msg.textContent = `Button clicked ${counter} time${counter===1?'':'s'}.`;
  const li = document.createElement('li');
  li.textContent = `Item ${counter} — created at ${new Date().toLocaleTimeString()}`;
  list.prepend(li);
  if (list.children.length > 10) list.removeChild(list.lastChild);
});
