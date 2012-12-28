console.log('background page is alive');
chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.getSelected(null, function(tab) {
    $.ajax({
      url: "http://localhost:5050/api/notes.json",
      type: "get",
      dataType: "json",
      success: function(response){
        console.log('response: '+response.response)
      }
    })
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
});


