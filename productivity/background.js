var time = [0, 0, 0, 0];
var minutes = 1;
chrome.storage.sync.get(['selected'], function(result) {
			  minutes = result.selected;
			  
			});
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
		minutes = request.value;
		console.log(request.value);
});
setInterval(function(){
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0]){
			if(tabs[0].url.includes("youtube.com")){
				console.log(tabs[0].url);
				time[0]++;
			}else
			if(tabs[0].url.includes("facebook.com")){
				console.log(tabs[0].url);
				time[1]++;
			}else
			if(tabs[0].url.includes("reddit.com")){
				console.log(tabs[0].url);
				time[2]++;
			}else
			if(tabs[0].url.includes("instagram.com")){
				console.log(tabs[0].url);
				time[3]++;
			}
				
		}
	});
	if(time[0] > minutes * 60)
	{
		time[0] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' minute' + (minutes != 1 ? 's':'') + ' reached',
			message: ' You spent '+ minutes +' minute' + (minutes != 1 ? 's':'') + ' on youtube'
		};
		chrome.notifications.create('timeNotif',notif);
	}else
	if(time[1] > minutes * 60)
	{
		time[1] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' minute' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' minute' + (minutes != 1 ? 's':'') + ' on facebook'
		};
		chrome.notifications.create('timeNotif',notif);
	}else
	if(time[2] > minutes * 60)
	{
		time[2] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' minute' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' minute' + (minutes != 1 ? 's':'') + ' on reddit'
		};
		chrome.notifications.create('timeNotif',notif);
	}
	else
	if(time[3] > minutes * 60)
	{
		time[3] = 0;
		var notif = {
			type: 'basic' ,
			iconUrl: 'time.png',
			title: minutes +' minute' + (minutes != 1 ? 's':'') + ' reached',
			message: 'You spent '+ minutes +' minute' + (minutes != 1 ? 's':'') + ' on instagram'
		};
		chrome.notifications.create('timeNotif',notif);
	}
},1000);

