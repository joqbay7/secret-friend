import './style.css';

const app = document.getElementById('app')!;

app.innerHTML = `
  <div class="container">
    <img src="/assets/secret-friend.svg" alt="Secret Friend" style="display:block;margin:0 auto 1.5rem auto;max-width:220px;width:80vw;filter: brightness(0) invert(1) drop-shadow(0 0 8px #7f5af0);" />
    <h1>Secret Friend</h1>
    <form class="form" autocomplete="off">
      <input type="text" id="name-input" placeholder="Type a name..." aria-label="Friend name" />
      <button type="submit" id="add-btn">Add</button>
    </form>
    <div id="names-area" style="display:none;">
      <ul id="names-list"></ul>
      <button id="draw-btn">Draw Friend</button>
      <div id="result" style="display:none;"></div>
      <div class="centered-row"><button id="restart-btn" style="display:none;">Restart</button></div>
    </div>
  </div>
  <footer style="margin-top:2.5rem;text-align:center;opacity:0.85;">
    <a href="https://github.com/seu-usuario" target="_blank" aria-label="GitHub" style="margin:0 0.7em;vertical-align:middle;display:inline-block;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eaeaea" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
    </a>
    <a href="https://linkedin.com/in/seu-usuario" target="_blank" aria-label="LinkedIn" style="margin:0 0.7em;vertical-align:middle;display:inline-block;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eaeaea" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.5"/><circle cx="8" cy="8" r="1.5"/></svg>
    </a>
  </footer>
`;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;

const names: string[] = [];
const nameInput = document.getElementById('name-input') as HTMLInputElement;
const form = document.querySelector('.form') as HTMLFormElement;
const namesArea = document.getElementById('names-area') as HTMLDivElement;
const namesList = document.getElementById('names-list') as HTMLUListElement;
const drawBtn = document.getElementById('draw-btn') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const tooltip = document.getElementById('tooltip') as HTMLSpanElement; // legacy, not used

function renderList() {
  if (names.length > 0) {
    namesArea.style.display = '';
  } else {
    namesArea.style.display = 'none';
    restartBtn.style.display = 'none';
    resultDiv.style.display = 'none';
  }
  namesList.innerHTML = '';
  names.forEach((name, idx) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '0.5rem';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    nameSpan.style.flex = '1';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.marginRight = '0.25rem';
    editBtn.addEventListener('click', () => {
      // Replace nameSpan with input for editing
      const input = document.createElement('input');
      input.type = 'text';
      input.value = name;
      input.style.flex = '1';
      li.replaceChild(input, nameSpan);
      input.focus();

      // Change Edit to Save
      editBtn.textContent = 'Save';
      editBtn.onclick = () => {
        const newName = input.value.trim();
        if (!newName) {
          input.classList.add('input-error');
          input.placeholder = 'Please enter a valid name.';
          setTimeout(() => {
            input.classList.remove('input-error');
            input.placeholder = '';
          }, 1500);
          input.focus();
          return;
        }
        names[idx] = newName;
        renderList();
      };

      // Allow saving with Enter key
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const newName = input.value.trim();
          if (!newName) {
            input.classList.add('input-error');
            input.placeholder = 'Please enter a valid name.';
            setTimeout(() => {
              input.classList.remove('input-error');
              input.placeholder = '';
            }, 1500);
            input.focus();
            return;
          }
          names[idx] = newName;
          renderList();
        }
      });

      // Add cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.onclick = () => {
        renderList();
      };
      li.appendChild(cancelBtn);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.position = 'relative';
    deleteBtn.onclick = () => {
      // Remove any existing confirm tooltips
      const existing = li.querySelector('.delete-tooltip');
      if (existing) existing.remove();

      // Create custom tooltip
      const tooltipDel = document.createElement('span');
      tooltipDel.className = 'delete-tooltip';
      tooltipDel.textContent = 'Delete this friend?';
      tooltipDel.style.position = 'absolute';
      tooltipDel.style.left = '0';
      tooltipDel.style.top = '100%';
      tooltipDel.style.marginTop = '0.3em';
      tooltipDel.style.background = '#222';
      tooltipDel.style.color = '#fff';
      tooltipDel.style.padding = '0.3em 0.7em';
      tooltipDel.style.borderRadius = '4px';
      tooltipDel.style.fontSize = '0.95em';
      tooltipDel.style.zIndex = '20';
      tooltipDel.style.boxShadow = '0 2px 8px #0002';
      tooltipDel.style.display = 'flex';
      tooltipDel.style.alignItems = 'center';
      tooltipDel.style.gap = '0.5em';

      const yesBtn = document.createElement('button');
      yesBtn.textContent = 'Yes';
      yesBtn.style.marginLeft = '0.5em';
      yesBtn.onclick = (e) => {
        e.stopPropagation();
        names.splice(idx, 1);
        renderList();
        resultDiv.style.display = 'none';
      };

      const noBtn = document.createElement('button');
      noBtn.textContent = 'No';
      noBtn.onclick = (e) => {
        e.stopPropagation();
        tooltipDel.remove();
      };

      tooltipDel.appendChild(yesBtn);
      tooltipDel.appendChild(noBtn);
      deleteBtn.appendChild(tooltipDel);
    };

    li.appendChild(nameSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    namesList.appendChild(li);
  });
}

function drawRandomFriend() {
  const randomIndex = Math.floor(Math.random() * names.length);
  const selected = names[randomIndex];
  resultDiv.textContent = `The secret friend is: ${selected}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    // Pode exibir um alert simples ou nada
    return;
  }
  names.push(name);
  nameInput.value = '';
  nameInput.focus();
  renderList();
});

drawBtn.addEventListener('click', () => {
  if (names.length === 0) {
    tooltip.textContent = 'Add at least one name to draw.';
    tooltip.style.display = 'block';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 2000);
    return;
  }
  drawRandomFriend();
  resultDiv.style.display = '';
  restartBtn.style.display = 'inline-block';
});

restartBtn.addEventListener('click', () => {
  names.length = 0;
  renderList();
  resultDiv.textContent = '';
  resultDiv.style.display = 'none';
  restartBtn.style.display = 'none';
});
