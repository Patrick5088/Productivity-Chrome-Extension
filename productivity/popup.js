
$("#time").change(function(){
	var sel = $("#time option:selected").val();
	chrome.extension.sendMessage({value : sel});
	chrome.storage.sync.set({selected: sel}, function() {
			  console.log('Value is set to ' + sel);
			});
	
	chrome.storage.sync.get(['selected'], function(result) {
			  console.log('Value currently is ' + result.selected);
			});
});
chrome.storage.sync.get(['selected'], function(result) {
			  $('#time').val(result.selected);
			  
			});