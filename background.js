console.log('background page is alive');

extension = {
  initialize: function(){
    this.open_listener()
  }, 

  fetch_notes: function(tab){
    console.log("fetching for: "+tab.url)
    $.ajax({
      url: "http://localhost:5050/api/notes.json",
      type: "get",
      dataType: "json",
      data: {external_url: tab.url},
      success: function(response){
        extension.send_message({
          tabID: tab.id,
          greeting: "hello",
          notes: response
        })
        console.log('response: ' + response.response);
      }
    }) 
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
      console.log(response.farewell);
    })   
  }
}

$(extension.initialize())


