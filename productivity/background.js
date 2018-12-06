//var time = [0, 0, 0, 0];
//var real_time = [0, 0, 0, 0];
var time = [];
var real_time = [];
var b_sites = [];
var minutes = 1;
var total_time = 0;
var s_date1 = new Date();
var block_this = false;
chrome.runtime.onStartup.addListener(function(){
	var s_date2 = new Date();
	chrome.storage.local.set({start_date: s_date2}, function() {
				console.log(s_date2);
				s_date1 = s_date2;
				console.log(s_date1);
			});
});
chrome.storage.local.get(['start_date'], function(result) {
			  console.log(result.start_date);
			  s_date1 = result.start_date;
			});
chrome.storage.local.get(['selected'], function(result) {
			  minutes = result.selected;
			});
chrome.storage.local.get(['checked'], function(result) {
			  block_this = result.checked;
			});
chrome.storage.local.get({list:[]}, function(result) {
			var list_aux = result.list;
			for(var i = 0;i<list_aux.length;i++){
				time.push(0);
				real_time.push(0);
				b_sites.push(list_aux[i]);
			}
			console.log(result.list);
		  
		});

chrome.storage.local.set({list_real_time:real_time}, function() {
				//console.log("list added");
			});
chrome.storage.local.get({list_real_time:[] },function(data){
			for(var i = 0;i< real_time.length;i++){
				real_time[i] = data.list_real_time[i];
			}
		});
chrome.storage.local.set({t_time: total_time}, function() {
			//console.log('Value is set to ' + total_time);
		});
chrome.storage.local.get(['t_time'], function(result) {
		  //console.log('Value currently is ' + result.t_time);
		  total_time = result.t_time;
		});
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
		if(request.value === undefined && request.block_check === undefined )
		{
			var list_aux = request.valueArray;
			//console.log(list_aux);
			time = [];
			real_time = [];
			b_sites = [];
			if(list_aux !== undefined)
				for(var i = 0;i<list_aux.length;i++){
					time.push(0);
					real_time.push(0);
					b_sites.push(list_aux[i]);
				}
		}
		else
		if(request.valueArray === undefined && request.block_check === undefined )
		{
			minutes = request.value;
			//console.log(request.value);
		}
		else
		if(request.value === undefined && request.valueArray === undefined)
		{
			block_this = request.block_check;
			console.log(block_this);
		}
		
		
});
setInterval(function(){
	total_time = 0;
	for(var i = 0;i<real_time.length;i++){
		total_time = total_time + real_time[i];
	}
	chrome.storage.local.set({list_real_time:real_time}, function() {
				//console.log("list added");
			});
	chrome.storage.local.get({list_real_time:[] },function(data){
				for(var i = 0;i< real_time.length;i++){
					real_time[i] = data.list_real_time[i];
				}
			});
	chrome.storage.local.set({t_time: total_time}, function() {
				//console.log('Value is set to ' + total_time);
			});
	chrome.storage.local.get(['t_time'], function(result) {
			  //console.log('Value currently is ' + result.t_time);
			  total_time = result.t_time;
			});
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0]){
			for(var i = 0;i<b_sites.length;i++)
			{
				if(tabs[0].url.includes(b_sites[i]) && !block_this){
					console.log(b_sites[i]);
					time[i]++;
					real_time[i]++;
				}
				
			
			}
			
		}
	});
	for(var i = 0;i<time.length;i++)
	{
		if(time[i] > minutes )
		{
			time[i] = 0;
			var notif = {
				type: 'basic' ,
				iconUrl: 'time.png',
				title: minutes +' second' + (minutes != 1 ? 's':'') + ' reached',
				message: ' You spent '+ minutes +' second' + (minutes != 1 ? 's':'') + ' on ' + b_sites[i]
			};
			chrome.notifications.create('timeNotif',notif);
		}
	}
	
},1000);

