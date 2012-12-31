

Footnotes.slideBase = '\
    <a id="slider" href="#footnotes_modal" style="display:none">null</a>\
    <div id="footnotes_modal" style="display:none">\
    <h1>Footnotes</h1>\
    <div id="right_bar"></div>\
    </div>\
    '

Footnotes.isOpen = false
  
Footnotes.initialize = function(){
    this.render()
    this.initListener()
  },

Footnotes.render = function(){
    $('body').prepend(this.slideBase);
    $("#slider").pageslide({ direction: "left" });     
  },

Footnotes.initListener = function(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
          Footnotes.renderNotes(request.notes);
        }
        else {
          $('.note').remove();
        }
        $('a#slider').click();
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "hello"){
          sendResponse({farewell: "goodbye"});
        }
    });    
  },

Footnotes.renderNotes = function(notes){
    notes = _.map(notes, function(noteString){
      return JSON.parse(noteString)
    })
    var questions = new Footnotes.Collections.Questions(notes)
    var overlay = new Footnotes.Views.OverlayView({
      questions: questions
    })   
    overlay.render()
  }


Footnotes.initialize()




