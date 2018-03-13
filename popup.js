$(function() {
	var storage = chrome.storage.local;
	var gitid;
	var userdata;

	storage.get('gitid', function(items) {
  	  if (items.gitid) {
  	    gitid = items.gitid;
  	    var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.github.com/users/"+gitid, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		    // JSON解析器不会执行攻击者设计的脚本.
		    userdata = JSON.parse(xhr.responseText);
		    $("#avatar").attr('src',userdata.avatar_url);
		    $("#avatar").css({
		    	cursor:'pointer'
		    });
		    $("#avatar").click(function() {
		    	openHelper(userdata.html_url);
		    });
		  }
		}
		xhr.send();
  	  }else{
  	  	location.href = 'option/option.html';
  	  }
  	});

	$("#github").click(function() {
		openHelper('https://github.com/wanmeihuaxu');
	});

	$("#option").click(function() {
		location.href = 'option/option.html';
	});

	function focusOrCreateTab(url) {
		chrome.windows.getAll({
			"populate": true
		}, function(windows) {
			var existing_tab = null;
			for(var i in windows) {
				var tabs = windows[i].tabs;
				for(var j in tabs) {
					var tab = tabs[j];
					if(tab.url == url) {
						existing_tab = tab;
						break;
					}
				}
			}
			if(existing_tab) {
				chrome.tabs.update(existing_tab.id, {
					"selected": true
				});
			} else {
				chrome.tabs.create({
					"url": url,
					"selected": true
				});
			}
		});
	}

	function openHelper(url) {
		var manager_url = url;
		if(url.indexOf("http") != 0) {
			manager_url = chrome.extension.getURL(url);
		}
		focusOrCreateTab(manager_url);
	}
});
