async function extractChatHistory() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('deepseek-chat');
        
        request.onerror = (event) => {
            reject(`Database error: ${event.target.error}`);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('history-message', 'readonly');
            const store = transaction.objectStore('history-message');
            const data = [];

            transaction.onerror = (event) => {
                reject(`Transaction error: ${event.target.error}`);
            };

            const cursorRequest = store.openCursor();
            
            cursorRequest.onerror = (event) => {
                reject(`Cursor error: ${event.target.error}`);
            };

            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    try {
                        const chatData = {
                            id: cursor.key,
                            title: cursor.value.title || 'Untitled Chat',
                            content: cursor.value.messages
                                .filter(m => m.text)  // Filter out empty messages
                                .map(m => m.text)
                                .join('\n'),
                            // Updated URL pattern based on your example
                            url: `https://chat.deepseek.com/a/chat/s/${cursor.key}`,
                            createdAt: cursor.value.create_time // Example of additional metadata
                        };
                        data.push(chatData);
                        cursor.continue();
                    } catch (e) {
                        reject(`Data parsing error: ${e}`);
                    }
                } else {
                    chrome.storage.local.set({ chats: data }, () => {
                        if (chrome.runtime.lastError) {
                            reject(`Storage error: ${chrome.runtime.lastError}`);
                        } else {
                            resolve(data);
                        }
                    });
                }
            };
        };
    });
}

// Updated installation handler with proper tab handling
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: extractChatHistory,
                args: [],
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error('Injection error:', chrome.runtime.lastError);
                } else {
                    console.log('Chat history extracted:', results[0]);
                }
            });
        }
    });
});