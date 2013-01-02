Footnotes.slideBase = '<a id="slider" href="" style="display:none">null</a>'

Footnotes.isOpen = false
  
Footnotes.initialize = function(){
    this.render()
    this.initListener()
  },

Footnotes.render = function(){
    $('body').prepend(this.slideBase);
    $("#slider").pageslide({ direction: "left", modal: true });    
    Footnotes.setQuery();
  },

Footnotes.setQuery = function(url){
    chrome.extension.sendMessage({url_request: "true"}, function(response) {
      $('#slider').attr('href',"http://localhost:5050/notes_for_url?external_url="+response.external_url+"&from_extension=true")
    });
  },

Footnotes.initListener = function(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        $('a#slider').click();
    });    
  },

Footnotes.initialize()




