chrome.runtime.onMessage.addListener(
    function (count, sender, sendResponse) {
        chrome.browserAction.setBadgeBackgroundColor({
            color: '#F00'
        });

        chrome.browserAction.setBadgeText({
            text: count.toString()
        });

        chrome.browserAction.setTitle({
            title: '已为您清除' + count + '了条广告'
        });
    }
);