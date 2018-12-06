var background = chrome.extension.getBackgroundPage();
var t = background.total_time;
var t_seq = background.real_time;
var blocked_s = background.b_sites;
//var sdate = new Date();

var sdate = background.s_date1;
setInterval(function(){
		t = background.total_time;
		var dt = new Date();
		if(sdate!== undefined)
			$("#ext_interval").html("Started at " + sdate.getHours() + ":" + sdate.getMinutes() + ":" + sdate.getSeconds()+" - Currently "+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
		$("#t_time").html("Total time spent: " + (Math.floor(t / 3600)>=10? "":"0") + Math.floor(t /3600) +":"+ (Math.floor(t / 60)>=10? "":"0") + Math.floor(t /60) +":"+ (Math.floor(t % 60)>=10? "":"0") + t %60);
		
		var i = 0;
		$('#time_table tr td').each(function(){
			console.log(i);
			$(this).html(blocked_s[i] + ": " +(Math.floor(t_seq[i] / 3600)>=10? "":"0") + Math.floor(t_seq[i] /3600) +":"+ (Math.floor(t_seq[i] / 60)>=10? "":"0") + Math.floor(t_seq[i] /60) +":"+ (Math.floor(t_seq[i] % 60)>=10? "":"0") + t_seq[i] %60);
			i++;
		});
		
},1000);
function onLoadFunction(){
	t = background.total_time;
	$("#t_time").html("Total time spent: " + (Math.floor(t / 3600)>=10? "":"0") + Math.floor(t /3600) +":"+ (Math.floor(t / 60)>=10? "":"0") + Math.floor(t /60) +":"+ (Math.floor(t % 60)>=10? "":"0") + t %60);
	for(var i=0; i<t_seq.length;i++){
		var text = "<tr><td>" + blocked_s[i] + ": " +(Math.floor(t_seq[i] / 3600)>=10? "":"0") + Math.floor(t_seq[i] /3600) +":"+ (Math.floor(t_seq[i] / 60)>=10? "":"0") + Math.floor(t_seq[i] /60) +":"+ (Math.floor(t_seq[i] % 60)>=10? "":"0") + t_seq[i] %60 + "</td><tr>";
		$('#time_table ').append(text);
	}
	
	
}
window.onload = onLoadFunction;