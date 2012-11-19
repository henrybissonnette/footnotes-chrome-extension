
chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
});

