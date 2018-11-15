var time = [0, 0, 0, 0];
var real_time = [0, 0, 0, 0];
var minutes = 1;
var total_time = 0;
chrome.storage.sync.get(['selected'], function(result) {
			  minutes = result.selected;
			  
			});
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
		minutes = request.value;
		console.log(request.value);
});
setInterval(function(){
	total_time = 0;
	for(var i = 0;i<real_time.length;i++){
		total_time = total_time + real_time[i];
	}
	chrome.storage.sync.set({list:real_time}, function() {
				console.log("list added");
			});
	chrome.storage.sync.get({list:[] },function(data){
				for(var i = 0;i< real_time.length;i++){
					real_time[i] = data.list[i];
				}
			});
	chrome.storage.sync.set({t_time: total_time}, function() {
				console.log('Value is set to ' + total_time);
			});
	
	chrome.storage.sync.get(['t_time'], function(result) {
			  console.log('Value currently is ' + result.t_time);
			  total_time = result.t_time;
			});
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0]){
			
			if(tabs[0].url.includes("youtube.com")){
				console.log(tabs[0].url);
				time[0]++;
				real_time[0]++;
				
			}else
			if(tabs[0].url.includes("facebook.com")){
				console.log(tabs[0].url);
				time[1]++;
				real_time[1]++;
				
			}else
			if(tabs[0].url.includes("reddit.com")){
				console.log(tabs[0].url);
				time[2]++;
				real_time[2]++;
				
			}else
			if(tabs[0].url.includes("instagram.com")){
				console.log(tabs[0].url);
				time[3]++;
				real_time[3]++;
				
			}
				
		}
	});
	if(time[0] > minutes )
	{
		time[0] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' second' + (minutes != 1 ? 's':'') + ' reached',
			message: ' You spent '+ minutes +' second' + (minutes != 1 ? 's':'') + ' on youtube'
		};
		chrome.notifications.create('timeNotif',notif);
	}else
	if(time[1] > minutes )
	{
		time[1] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' second' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' second' + (minutes != 1 ? 's':'') + ' on facebook'
		};
		chrome.notifications.create('timeNotif',notif);
	}else
	if(time[2] > minutes )
	{
		time[2] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' second' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' second' + (minutes != 1 ? 's':'') + ' on reddit'
		};
		chrome.notifications.create('timeNotif',notif);
	}
	else
	if(time[3] > minutes )
	{
		time[3] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' second' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' second' + (minutes != 1 ? 's':'') + ' on instagram'
		};
		chrome.notifications.create('timeNotif',notif);
	}
},1000);

