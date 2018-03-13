$(function() {
	var storage = chrome.storage.local;

	storage.get('gitid', function(items) {
  	  if (items.gitid) {
  	    $("#git_id").val(items.gitid);
  	  }
  	});

	$("#git_save").click(function() {
		var _gitid = $("#git_id").val();
		$("#msgbox").html("获取GitHub信息中...");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.github.com/users/"+_gitid, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		    // JSON解析器不会执行攻击者设计的脚本.
		    userdata = JSON.parse(xhr.responseText);
		    if(userdata.message=='Not Found'){
		    	$("#msgbox").html("没有找到此ID的相关信息！请确认！");
		    }else{
		    	storage.set({'gitid':_gitid}, function() {
		    		$("#msgbox").html("保存成功！");
  				 	console.log('GitHub ID saved');
  				});
		    }
		  }
		}
		xhr.send();
	});

	$("#backToPop").click(function(){
		location.href = '../popup.html';
	});
});
