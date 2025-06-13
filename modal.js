export default class SimpleModalScript {
  constructor(data) {
    this.data = data;
  }

  loadScript() {
    const style = document.createElement('style');
    style.innerHTML = `
      .simple-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .simple-modal-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        text-align: center;
      }

      .simple-modal-button {
        margin-top: 15px;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .simple-modal-button:hover {
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);

    const backdrop = document.createElement('div');
    backdrop.className = 'simple-modal-backdrop';

    const box = document.createElement('div');
    box.className = 'simple-modal-box';
    
    // Fix: prevent click inside box from closing modal
    box.addEventListener('click', (e) => e.stopPropagation());
    
    const message = document.createElement('div');
    message.innerHTML = this.data?.content || 'Default modal content';
    
    const button = document.createElement('button');
    button.className = 'simple-modal-button';
    button.innerText = 'Accept';
    button.onclick = () => backdrop.remove();
    
    box.appendChild(message);
    box.appendChild(button);
    backdrop.appendChild(box);
    document.body.appendChild(backdrop);

    // Close on outside click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.remove();
    });

    requestAnimationFrame(() => {
      backdrop.style.display = 'flex';
    });
    
// Use MutationObserver to wait for the button to appear in the DOM
const observer = new MutationObserver(() => {
  const reindexBtn = document.querySelector('[data-testid="course-reindex"]');
  if (reindexBtn) {
    reindexBtn.style.display = 'none';
    observer.disconnect(); // Stop observing once found
  }
});

// Start observing changes in the whole document body
observer.observe(document.body, {
  childList: true,
  subtree: true
});
  }
}
