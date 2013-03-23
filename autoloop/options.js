/**
 * declare functions.
 */
// Saves options to localStorage.
function save_options() {
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	status.style.display = 'inline';
	setTimeout(function() {
		status.innerHTML = "";
		status.style.display = 'none';
	}, 750);
	// 提示语
	var iptMessage = document.getElementById("iptMessage");
	localStorage.setItem("message",iptMessage.value);
	// 间隔时间
	var iptTime = document.getElementById("iptTime");
	localStorage.setItem("delaytime",iptTime.value);
	// 是否自动提示下首歌曲信息
	var next_song_message = $('#chkAlertNextSong').attr('checked')?'true':'false';
	localStorage.setItem("next_song_message",next_song_message);
	// 保存优化宽屏下的界面配置
	var optimize_widescreen = $('#isOptimized').attr('checked')?'true':'false';
	localStorage.setItem("optimize_widescreen",optimize_widescreen);
	// 保存分辨率选项
	$('#screenOptimized').find(':radio').each(function(i,dom){
		if($(this).attr('checked')){
			localStorage.setItem("radioScreenOptimized",$(this).val());
		}
	});
	// 进场语
	var iptShowMessage = document.getElementById("iptShowMessage");
	localStorage.setItem("show_message",$.trim(iptShowMessage.value));
};

// Restores select box state to saved value from localStorage.
function restore_options() {
	// bind save button events
	document.getElementById('btnSave').onclick = save_options;
	
	// init
	// delay time
	var delaytime = localStorage.getItem("delaytime");
	document.getElementById("iptTime").value = delaytime;
	// show loop message
	var message = localStorage.getItem("message");
	var iptMessage = document.getElementById("iptMessage");
	iptMessage.value = message;
	// auto show next song message
	var next_song_message = localStorage.getItem("next_song_message");
	if(next_song_message == 'true'){
		$('#chkAlertNextSong').attr('checked',true);
	}else{
		$('#chkAlertNextSong').removeAttr('checked');
	}
	// 加载优化宽屏下的界面配置
	var optimize_widescreen = localStorage.getItem("optimize_widescreen");
	if(optimize_widescreen == 'true'){
		$('#isOptimized').attr('checked',true);
		$('#screenOptimized').find(':radio').attr('disabled',false);
	}else{
		$('#isOptimized').removeAttr('checked');
	}
	$('#screenOptimized').find(':radio').each(function(i,dom){
		if($(this).val() == localStorage.getItem("radioScreenOptimized")){
			$(this).attr('checked',true);
		}
	});
	// 为优化checkbox绑定事件
	$('#isOptimized').change(function(){
		if($(this).attr('checked')){
			$('#screenOptimized').find(':radio').each(function(i,dom){
				$(this).attr('disabled',false);
			});
		}else{
			$('#screenOptimized').find(':radio').each(function(i,dom){
				$(this).attr('disabled',true);
			});
		}
	});
	// show message
	var iptShowMessage = document.getElementById("iptShowMessage");
	iptShowMessage.value = localStorage.getItem("show_message");
};

/**
 * run.
 */
window.onload = restore_options;