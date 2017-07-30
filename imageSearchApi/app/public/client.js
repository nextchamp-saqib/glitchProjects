// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

});
$('document').ready(function(){
  $('#submit').on('click',function(){
    var url = 'https://fccimagesearch.glitch.me/api/images/' + $('#query').val();
    var offset = parseInt($('#offset').val());
    
    if(offset>0)
      url = url + '?offset=' + offset;
    
    $.ajax({
    url: url,
    type: 'GET',
    dataType: "json",
    success: function(data){ 
      $("#result").html(document.createTextNode(JSON.stringify(data,null,3)));
      },
    error: function(data) {
        console.log('Error');
      }
    });
  });
  
  $('#history').on('click',function(){
    var url = 'https://fccimagesearch.glitch.me/api/history';
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data){
        
        $("#result").html(document.createTextNode(JSON.stringify(data,null,3)));
      },
      error: function(data){
        console.log('error');
      }
    })
  })
})