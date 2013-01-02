console.log('background page is alive');

extension = {
  initialize: function(){
    this.open_listener()
    this.url_listener()
  }, 

  fetch_notes: function(tab){
    $.ajax({
      url: "http://localhost:5050/api/notes.json",
      type: "get",
      dataType: "json",
      data: {external_url: tab.url},
      success: function(response){
        extension.send_message({
          tabID: tab.id,
          greeting: "hello",
          notes: response,
          external_url: tab.url
        })
      }
    }) 
  },

  url_listener: function(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        debugger
        if (request.url_request == "true")
          sendResponse({external_url: sender.tab.url});
    }); 
  },

  open_listener: function(){
    chrome.browserAction.onClicked.addListener(function(){
      chrome.tabs.getSelected(null, function(tab) {
        extension.fetch_notes(tab)
      });
    });    
  },

  send_message: function(data){
    chrome.tabs.sendMessage(data.tabID, data, function(response) {
      // console.log(response.farewell);
    })   
  }
}

$(extension.initialize())


