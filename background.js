console.log('background page is alive');

debugger
extension = {
  initialize: function(){
    this.fetch_notes()
    this.open_listener()
  }, 

  fetch_notes: function(){
    $.ajax({
      url: "http://localhost:5050/api/notes.json",
      type: "get",
      dataType: "json",
      success: function(response){
        console.log('response: ' + response.response);
        extension.notes = response
      }
    }) 
  },

  open_listener: function(){
    chrome.browserAction.onClicked.addListener(function(){
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {greeting: "hello", notes: extension.notes}, function(response) {
          console.log(response.farewell);
        });
      });
    });    
  }
}

$(extension.initialize())


