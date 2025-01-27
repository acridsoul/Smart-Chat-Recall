chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SEARCH_CHATS') {
      searchChats(request.query).then(sendResponse);
      return true; // Keep message channel open
    }
  });
  
  async function searchChats(query) {
    // Retrieve indexed data from storage
    const { chats } = await chrome.storage.local.get('chats');
    return fuzzySearch(chats || [], query);
  }
  
  // Simple search algorithm
  function fuzzySearch(chats, query) {
    const terms = query.toLowerCase().split(' ');
    return chats.filter(chat => {
      const text = `${chat.title} ${chat.content}`.toLowerCase();
      return terms.every(term => text.includes(term));
    }).map(chat => ({
      title: chat.title,
      snippet: chat.content.slice(0, 100) + '...',
      url: chat.url // Assume chat URLs are stored in the data
    }));
  }