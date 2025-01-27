// contentScript.js
const searchHTML = `
<div id="deepseek-search-container" style="padding: 10px; border-bottom: 1px solid #eee;">
  <input type="text" id="deepseek-search-input" placeholder="Search chat history..." 
         style="width: 80%; padding: 8px; margin-bottom: 10px;">
  <div id="deepseek-search-results"></div>
</div>
`;

const observer = new MutationObserver(() => {
  // Target Deepseek's chat list container
  const chatListContainer = document.querySelector('.fb0a63fb');
  if (chatListContainer) {
    // Insert search bar ABOVE the chat list
    chatListContainer.insertAdjacentHTML('beforebegin', searchHTML);
    setupSearch();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function setupSearch() {
  const searchInput = document.getElementById('deepseek-search-input');
  const resultsDiv = document.getElementById('deepseek-search-results');

  searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (!query) {
      resultsDiv.innerHTML = '';
      return;
    }

    // Send search request to background script
    const results = await chrome.runtime.sendMessage({ action: 'SEARCH_CHATS', query });
    displayResults(results);
  });
}

function displayResults(results) {
  const resultsDiv = document.getElementById('deepseek-search-results');
  resultsDiv.innerHTML = results.map(result => `
    <div style="padding: 5px; margin: 5px 0; background: #f5f5f5; border-radius: 4px;">
      <a href="${result.url}" style="color: #06b6d4; text-decoration: none;">
        ${result.title}
      </a>
      <div style="font-size: 0.8em; color: #666;">${result.snippet}</div>
    </div>
  `).join('');
}