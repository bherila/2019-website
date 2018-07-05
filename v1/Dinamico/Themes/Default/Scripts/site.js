$.fn.plupdown=function(options){options=$.extend({callback:function(){}},options);var isForm=this.is("form");var open=function(e){e&&e.preventDefault();if(isForm){$(this).closest("li").addClass("open").end().siblings("ul").children("li").show();var form=this;function close(){$(form).closest("li").removeClass("open");$(document).unbind(".plupdown_closer");}
$(document).bind("click.plupdown_closer",function(e){close();}).bind("keydown.plupdown_closer",function(e){if(e.keyCode!=27)
return;close();});}
else
$(this).unbind("click.plupdown");var url=isForm?this.action:this.href;var data=isForm?$(this).serialize():{};var $ul=$(this).siblings("ul");if(options.loadingHtml)
$ul.html(options.loadingHtml);$ul.load(url,data,options.callback);};if(isForm)
$(this).bind("submit.plupdown",open);else
$(this).bind("click.plupdown",open);return this;};$.fn.any=function(){return this.length>0;}
$.fn.menudown=function(options){options=$.extend({submenuclass:"submenu"},options);var top=this;var open=function(){$(top).find(".opened").children(".closer").trigger("click");$(this).siblings("a").addClass("expanded");$(this.parentNode).addClass("opened");$(this).siblings("ul").clone().addClass(options.submenuclass).insertAfter(top).each(function(){$(top).data("submenu",this)});};var close=function(){$(top.data("submenu")).remove();$(this.parentNode).removeClass("opened");$(this).siblings("a").removeClass("expanded");};$(this).addClass("menudown");$(this).find("ul").each(function(){$("<a href='#submenu' class='opener toggler'>&nbsp;</a>").prependTo(this.parentNode).click(open);$("<a href='#submenu' class='closer toggler'>&nbsp;</a>").prependTo(this.parentNode).click(close);$(this.parentNode).addClass("openable");});$(this).find(".current,.trail").siblings(".opener").trigger("click");}
$(document).ready(function(){function highlight(text){if(!window.highlightLoaded)
$("<script type='text/javascript' />").attr("src","/Dinamico/Themes/Default/lib/jquery/jquery.highlight-3.js").appendTo($("head"));window.highlightLoaded=true;setTimeout(function(){var splits=text.split(" ");for(var i in splits)
$("#main *").highlight(splits[i]);},1);}
$("#searchform").plupdown({callback:function(){var value=$("#searchform input").val();var here=location.href.replace(/#.*/,"");$("a",this).each(function(i){if(i===0)this.focus();if(this.href===here)
$(this).focus().click(function(){$("span.highlight").removeClass("highlight");highlight(value);});this.href+="#q="+value;});},opener:false});if(location.hash.match("^#q=")){var text=location.hash.substr(3).replace(/[+]/g," ");$("#searchform input").attr("value",text);$("#searchform").submit();highlight(text);}
$("#sitemapopener").plupdown({resultsClass:"dropmenu sitemapresults",callback:function(){var here=location.href.replace(/#.*/,"");$("a",this).each(function(i){if(i===0)this.focus();if(this.href===here)this.focus();this.href+="#sm";});}});if(location.hash==="#sm")
$("#sitemapopener").click();$("#translationsopener").plupdown();});