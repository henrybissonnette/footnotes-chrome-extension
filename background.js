console.log('background running');
chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
      $.ajax({
        url: 'https://birdcage-uat.groupondev.com/v1/environments.json',
        type: 'get',
        dataType: 'json',
        success: function(environments){
          console.log('response: ' + environments)
        }
      });
      console.log(response.farewell);
    });
  });
});


