
var sites = [];
var block = false;
chrome.storage.local.get(['checked'], function(result) {
			  block= result.checked;
			});
chrome.storage.local.get({list:[]}, function(result) {
			var list_aux = result.list;
			for(var i = 0;i<list_aux.length;i++){
				
				sites.push(list_aux[i]);
			}
			var url = window.location.toString();
			for(var i = 0; i < sites.length; i++){
					
					if(url.includes(sites[i]) && block){
						document.body.innerHTML = "";
						//console.log("works");
					}
			}
		  
		});

chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
		if(request.value === undefined && request.block_check === undefined )
		{
			var list_aux = request.valueArray;
			if(list_aux !== undefined)
				for(var i = 0;i<list_aux.length;i++){
					sites.push(list_aux[i]);
				}
			var url = window.location.toString();
			for(var i = 0; i < sites.length; i++){
					
					if(url.includes(sites[i]) && block){
						document.body.innerHTML = "";
						//console.log("works");
					}
			}
		}
		else
		if(request.value === undefined && request.valueArray === undefined)
		{
			block = request.block_check;
		}
});
