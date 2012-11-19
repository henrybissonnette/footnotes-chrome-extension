// $(document).ready(function(){
//   var footnotes = $('<div>').addClass('footnotes minimized');
//   $('body').prepend(footnotes);
//   footnotes.text('<');

//   footnotes.click(function(){
//     if(footnotes.hasClass('minimized')){
//       $(this).animate({width:'150px'});
//       $(this).removeClass('minimized');
//       $(this).text('footnotes');      
//     }
//     else{
//       $(this).animate({width:'30px'});
//       $(this).addClass('minimized');
//       $(this).text('<');         
//     }
//   });
// });

window.withfootnotes = {}

withfootnotes.main = function(){
  var footnotes = $('<div>').addClass('footnotes minimized');
  footnotes.text('<');
  $('body').prepend(footnotes);
  footnotes.css({'margin-top':'-170px'});
   return footnotes;
}();

withfootnotes.show = function(){
  $(window.withfootnotes.main).addClass('deployed');
  $(window.withfootnotes.main).animate({'margin-top':'0px'});
};

withfootnotes.main.toggleMinimized = function(){
  var f = window.withfootnotes.main
  if(f.hasClass('minimized')){
    $(f).animate({width:'150px'});
    $(f).removeClass('minimized');
    $(f).text('footnotes');      
  }
  else{
    $(f).animate({width:'30px'});
    $(f).addClass('minimized');
    $(f).text('<');         
  }  
};

withfootnotes.main.click(function(){
  withfootnotes.main.toggleMinimized();
});

withfootnotes.hide = function(){
  if (!window.withfootnotes.main.hasClass('minimized')){
    window.withfootnotes.main.toggleMinimized();
  }
  $(window.withfootnotes.main).removeClass('deployed');
  $(window.withfootnotes.main).animate({'margin-top':'-170px'});
};


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ($(window.withfootnotes.main).hasClass('deployed')){
      window.withfootnotes.hide();
    }
    else{
      window.withfootnotes.show() ;
    }
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});

