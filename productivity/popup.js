
$("#time").change(function(){
	var sel = $("#time option:selected").val();
	chrome.extension.sendMessage({value : sel});
	chrome.storage.local.set({selected: sel}, function() {
			  console.log('Value is set to ' + sel);
			});
	
	chrome.storage.local.get(['selected'], function(result) {
			  console.log('Value currently is ' + result.selected);
			});
});
$("input:radio[value='yes']").change(function(){
	var check = true;
	chrome.extension.sendMessage({block_check: check});
	chrome.storage.local.set({checked:check}, function(){
				console.log('Value is set to ' + check);
			});
	chrome.storage.local.get(['checked'], function(result) {
			  console.log('Value currently is ' + result.checked);
			});
});
$("input:radio[value='no']").change(function(){
	var check = false;
	chrome.extension.sendMessage({block_check: check});
	chrome.storage.local.set({checked:check}, function(){
				console.log('Value is set to ' + check);
			});
	chrome.storage.local.get(['checked'], function(result) {
				console.log('Value currently is ' + result.checked);
			});
});
$("#myFile").change(function(){
	if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
		var vect = e.target.result.split(/\r?\n/);
		for(var i = 0; i< vect.length;i++){
			if(vect[i][0]=='='||vect[i].length==0 || vect[i][0]=='-' ||vect[i].trim ==''){
				vect.splice(i,1);
				i--;
			}
		}
		
		for(var i = 0; i< vect.length;i++){
			vect[i] = vect[i].replace(/[^a-zA-Z,.-=();"'<> ]/g, '');
		}
		chrome.storage.local.set({list:vect}, function() {
          console.log("added to list");
		  
		});
		chrome.storage.local.get({list:[]},function(result){
			console.log(result.list);
		}
		);
		chrome.extension.sendMessage({valueArray: vect});
		
      


		
    });



    reader.readAsBinaryString(myFile);
  }
	
		
});
chrome.storage.local.get(['checked'], function(result) {
				if(result.checked == true){
					$("input:radio[value='yes']").attr('checked',true);
					
				}
				else
				{
					$("input:radio[value='no']").attr('checked',true);
				}
			});
chrome.storage.local.get(['selected'], function(result) {
				$('#time').val(result.selected);
			});