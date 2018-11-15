var background = chrome.extension.getBackgroundPage();
var t = background.total_time;
var t_seq = background.real_time;
setInterval(function(){
		t = background.total_time;
		$("#t_time").html("Total time spent: " + (Math.floor(t / 3600)>=10? "":"0") + Math.floor(t /3600) +":"+ (Math.floor(t / 60)>=10? "":"0") + Math.floor(t /60) +":"+ (Math.floor(t % 60)>=10? "":"0") + t %60);
		$('#time_table #youtube').html("Youtube: " +(Math.floor(t_seq[0] / 3600)>=10? "":"0") + Math.floor(t_seq[0] /3600) +":"+ (Math.floor(t_seq[0] / 60)>=10? "":"0") + Math.floor(t_seq[0] /60) +":"+ (Math.floor(t_seq[0] % 60)>=10? "":"0") + t_seq[0] %60);
		$('#time_table #facebook').html("Facebook: " +(Math.floor(t_seq[1] / 3600)>=10? "":"0") + Math.floor(t_seq[1] /3600) +":"+ (Math.floor(t_seq[1] / 60)>=10? "":"0") + Math.floor(t_seq[0] /60) +":"+ (Math.floor(t_seq[1] % 60)>=10? "":"0") + t_seq[1] %60);
		$('#time_table #reddit').html("Reddit: " +(Math.floor(t_seq[2] / 3600)>=10? "":"0") + Math.floor(t_seq[2] /3600) +":"+ (Math.floor(t_seq[2] / 60)>=10? "":"0") + Math.floor(t_seq[0] /60) +":"+ (Math.floor(t_seq[2] % 60)>=10? "":"0") + t_seq[2] %60);
		$('#time_table #instagram').html("Instagram: " +(Math.floor(t_seq[3] / 3600)>=10? "":"0") + Math.floor(t_seq[3] /3600) +":"+ (Math.floor(t_seq[3] / 60)>=10? "":"0") + Math.floor(t_seq[0] /60) +":"+ (Math.floor(t_seq[3] % 60)>=10? "":"0") + t_seq[3] %60);
},1000);