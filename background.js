extension = {
  initialize: function(){
    this.open_listener()
    this.url_listener()
  }, 

  url_listener: function(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.url_request == "true")
          sendResponse({external_url: sender.tab.url});
    }); 
  },

  open_listener: function(){
    chrome.browserAction.onClicked.addListener(function(){
      chrome.tabs.getSelected(null, function(tab) {
        extension.send_message({
          tabID: tab.id
        })
      });
    });    
  },

  send_message: function(data){
    chrome.tabs.sendMessage(data.tabID, data, function(response) {
      //console.log(response.farewell);
    })   
  }
}

$(extension.initialize())


