chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.msg == "open_register_tab") {
            chrome.tabs.create({"url": request.url});
        }
    }
);
