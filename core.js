var protocol = window.location.protocol;
var oScript= document.createElement("script");
oScript.type = "text/javascript";
oScript.src=protocol+"//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
document.documentElement.appendChild(oScript);

const actualCode = "$(\"li[data-newstype='ads']\").remove();";
let s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
console.log('baidu-nolimit injected');