
(function(){
  window.withfootnotes = {}
  var slideBase = '\
  <a id="slider" href="#footnotes_modal" style="display:none">null</a>\
  <div id="footnotes_modal" style="display:none">\
  <h1>Footnotes</h1>\
  </div>\
  ';
  $('body').prepend(slideBase);
  $("#slider").pageslide({ direction: "left" });
})();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    $('a#slider').click()
    console.log(request.notes);
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});


