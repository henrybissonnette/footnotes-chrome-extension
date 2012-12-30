

withfootnotes = {
  slideBase: '\
    <a id="slider" href="#footnotes_modal" style="display:none">null</a>\
    <div id="footnotes_modal" style="display:none">\
    <h1>Footnotes</h1>\
    </div>\
    ',
  
  initialize: function(){
    $('body').prepend(this.slideBase);
    $("#slider").pageslide({ direction: "left" }); 
    this.initListener()
  },

  initListener: function(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        for (var i in request.notes) {
          $('#footnotes_modal').append($('<div>').text(JSON.parse(request.notes[i]).title))
        }
        $('a#slider').click()
        console.log(request.notes);
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "hello")
          sendResponse({farewell: "goodbye"});
    });    
  }
}

withfootnotes.initialize()




