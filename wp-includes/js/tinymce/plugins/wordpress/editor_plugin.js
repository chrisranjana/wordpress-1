(function(){var a=tinymce.DOM;tinymce.create("tinymce.plugins.WordPress",{mceTout:0,init:function(f,c){var j=this,e=f.getParam("wordpress_adv_toolbar","toolbar2"),i=0,d,b,h,g;d='<img src="'+c+'/img/trans.gif" class="mceWPmore mceItemNoResize" title="'+f.getLang("wordpress.wp_more_alt")+'" />';b='<img src="'+c+'/img/trans.gif" class="mceWPnextpage mceItemNoResize" title="'+f.getLang("wordpress.wp_page_alt")+'" />';if(getUserSetting("hidetb","0")=="1"){f.settings.wordpress_adv_hidden=0}f.onPostRender.add(function(){var k=f.controlManager.get(e);if(f.getParam("wordpress_adv_hidden",1)&&k){a.hide(k.id);j._resizeIframe(f,e,28)}});f.addCommand("WP_More",function(){f.execCommand("mceInsertContent",0,d)});f.addCommand("WP_Page",function(){f.execCommand("mceInsertContent",0,b)});f.addCommand("WP_Help",function(){f.windowManager.open({url:tinymce.baseURL+"/wp-mce-help.php",width:450,height:420,inline:1})});f.addCommand("WP_Adv",function(){var k=f.controlManager,l=k.get(e).id;if("undefined"==l){return}if(a.isHidden(l)){k.setActive("wp_adv",1);a.show(l);j._resizeIframe(f,e,-28);f.settings.wordpress_adv_hidden=0;setUserSetting("hidetb","1")}else{k.setActive("wp_adv",0);a.hide(l);j._resizeIframe(f,e,28);f.settings.wordpress_adv_hidden=1;setUserSetting("hidetb","0")}});f.addCommand("WP_Medialib",function(){var l=f.getParam("wp_fullscreen_editor_id")||f.getParam("fullscreen_editor_id")||f.id,k=tinymce.DOM.select("#wp-"+l+"-media-buttons a.thickbox");if(k&&k[0]){k=k[0]}else{return}tb_show("",k.href)});f.addButton("wp_more",{title:"wordpress.wp_more_desc",cmd:"WP_More"});f.addButton("wp_page",{title:"wordpress.wp_page_desc",image:c+"/img/page.gif",cmd:"WP_Page"});f.addButton("wp_help",{title:"wordpress.wp_help_desc",cmd:"WP_Help"});f.addButton("wp_adv",{title:"wordpress.wp_adv_desc",cmd:"WP_Adv"});f.addButton("add_media",{title:"wordpress.add_media",image:c+"/img/image.gif",cmd:"WP_Medialib"});f.onBeforeExecCommand.add(function(r,q,u,p,l){var x=tinymce.DOM,m,k,t,w,v,s;if("mceFullScreen"==q){if("mce_fullscreen"!=r.id&&x.select("a.thickbox").length){r.settings.theme_advanced_buttons1+=",|,add_media"}}if("JustifyLeft"==q||"JustifyRight"==q||"JustifyCenter"==q){m=r.selection.getNode();if(m.nodeName=="IMG"){s=q.substr(7).toLowerCase();v="align"+s;k=r.dom.getParent(m,"dl.wp-caption");t=r.dom.getParent(m,"div.mceTemp");if(k&&t){w=r.dom.hasClass(k,v)?"alignnone":v;k.className=k.className.replace(/align[^ '"]+\s?/g,"");r.dom.addClass(k,w);if(w=="aligncenter"){r.dom.addClass(t,"mceIEcenter")}else{r.dom.removeClass(t,"mceIEcenter")}l.terminate=true;r.execCommand("mceRepaint")}else{if(r.dom.hasClass(m,v)){r.dom.addClass(m,"alignnone")}else{r.dom.removeClass(m,"alignnone")}}}}});f.onInit.add(function(m){var l=m.getParam("body_class",""),k=m.getBody();if(l){l=l.split(" ")}else{l=[]}if(m.getParam("directionality","")=="rtl"){l.push("rtl")}if(tinymce.isIE9){l.push("ie9")}else{if(tinymce.isIE8){l.push("ie8")}else{if(tinymce.isIE7){l.push("ie7")}}}if(m.id!="wp_mce_fullscreen"&&m.id!="mce_fullscreen"){l.push("wp-editor")}else{if(m.id=="mce_fullscreen"){l.push("mce-fullscreen")}}tinymce.each(l,function(n){if(n){m.dom.addClass(k,n)}});m.onNodeChange.add(function(o,n,q){var p;if(q.nodeName=="IMG"){p=o.dom.getParent(q,"dl.wp-caption")}else{if(q.nodeName=="DIV"&&o.dom.hasClass(q,"mceTemp")){p=q.firstChild;if(!o.dom.hasClass(p,"wp-caption")){p=false}}}if(p){if(o.dom.hasClass(p,"alignleft")){n.setActive("justifyleft",1)}else{if(o.dom.hasClass(p,"alignright")){n.setActive("justifyright",1)}else{if(o.dom.hasClass(p,"aligncenter")){n.setActive("justifycenter",1)}}}}});m.onBeforeSetContent.add(function(n,p){if(p.content){p.content=p.content.replace(/<p>\s*<(p|div|ul|ol|dl|table|blockquote|h[1-6]|fieldset|pre|address)( [^>]*)?>/gi,"<$1$2>");p.content=p.content.replace(/<\/(p|div|ul|ol|dl|table|blockquote|h[1-6]|fieldset|pre|address)>\s*<\/p>/gi,"</$1>")}})});if("undefined"!=typeof(jQuery)){f.onKeyUp.add(function(m,n){var l=n.keyCode||n.charCode;if(l==i){return}if(13==l||8==i||46==i){jQuery(document).triggerHandler("wpcountwords",[m.getContent({format:"raw"})])}i=l})}f.onSaveContent.addToTop(function(k,l){l.content=l.content.replace(/<p>(<br ?\/?>|\u00a0|\uFEFF)?<\/p>/g,"<p>&nbsp;</p>")});f.onSaveContent.add(function(k,l){if(k.getParam("wpautop",true)&&typeof(switchEditors)=="object"){if(k.isHidden()){l.content=l.element.value}else{l.content=switchEditors.pre_wpautop(l.content)}}});j._handleMoreBreak(f,c);g="alt";if(tinymce.isIE||tinymce.isOpera){g="shift+alt"}f.addShortcut(g+"+c","justifycenter_desc","JustifyCenter");f.addShortcut(g+"+r","justifyright_desc","JustifyRight");f.addShortcut(g+"+l","justifyleft_desc","JustifyLeft");f.addShortcut(g+"+j","justifyfull_desc","JustifyFull");f.addShortcut(g+"+q","blockquote_desc","mceBlockQuote");f.addShortcut(g+"+u","bullist_desc","InsertUnorderedList");f.addShortcut(g+"+o","numlist_desc","InsertOrderedList");f.addShortcut(g+"+n","spellchecker.desc","mceSpellCheck");f.addShortcut(g+"+a","link_desc","WP_Link");f.addShortcut(g+"+s","unlink_desc","unlink");f.addShortcut(g+"+m","image_desc","WP_Medialib");f.addShortcut(g+"+z","wordpress.wp_adv_desc","WP_Adv");f.addShortcut(g+"+t","wordpress.wp_more_desc","WP_More");f.addShortcut(g+"+d","striketrough_desc","Strikethrough");f.addShortcut(g+"+h","help_desc","WP_Help");f.addShortcut(g+"+p","wordpress.wp_page_desc","WP_Page");f.addShortcut(g+"+w","wordpress.wp_fullscreen_desc","wpFullScreen");f.addShortcut(g+"+g","fullscreen.desc","mceFullScreen");f.addShortcut("ctrl+s","save_desc",function(){if("function"==typeof autosave){autosave()}});f.onInit.add(function(k){tinymce.dom.Event.add(k.getWin(),"scroll",function(l){k.plugins.wordpress._hideButtons()});tinymce.dom.Event.add(k.getBody(),"dragstart",function(l){k.plugins.wordpress._hideButtons()})});f.onBeforeExecCommand.add(function(k,m,l,n){k.plugins.wordpress._hideButtons()});f.onSaveContent.add(function(k,l){k.plugins.wordpress._hideButtons()});f.onMouseDown.add(function(k,l){if(l.target.nodeName!="IMG"){k.plugins.wordpress._hideButtons()}});h=function(k){var l;if(k.target.id=="mceModalBlocker"||k.target.className=="ui-widget-overlay"){for(l in f.windowManager.windows){f.windowManager.close(null,l)}}};tinymce.dom.Event.remove(document.body,"click",h);tinymce.dom.Event.add(document.body,"click",h)},getInfo:function(){return{longname:"WordPress Plugin",author:"WordPress",authorurl:"http://wordpress.org",infourl:"http://wordpress.org",version:"3.0"}},_setEmbed:function(b){return b.replace(/\[embed\]([\s\S]+?)\[\/embed\][\s\u00a0]*/g,function(d,c){return'<img width="300" height="200" src="'+tinymce.baseURL+'/plugins/wordpress/img/trans.gif" class="wp-oembed mceItemNoResize" alt="'+c+'" title="'+c+'" />'})},_getEmbed:function(b){return b.replace(/<img[^>]+>/g,function(c){if(c.indexOf('class="wp-oembed')!=-1){var d=c.match(/alt="([^\"]+)"/);if(d[1]){c="[embed]"+d[1]+"[/embed]"}}return c})},_showButtons:function(f,d){var g=tinyMCE.activeEditor,i,h,b,j=tinymce.DOM,e,c;b=g.dom.getViewPort(g.getWin());i=j.getPos(g.getContentAreaContainer());h=g.dom.getPos(f);e=Math.max(h.x-b.x,0)+i.x;c=Math.max(h.y-b.y,0)+i.y;j.setStyles(d,{top:c+5+"px",left:e+5+"px",display:"block"});if(this.mceTout){clearTimeout(this.mceTout)}this.mceTout=setTimeout(function(){g.plugins.wordpress._hideButtons()},5000)},_hideButtons:function(){if(!this.mceTout){return}if(document.getElementById("wp_editbtns")){tinymce.DOM.hide("wp_editbtns")}if(document.getElementById("wp_gallerybtns")){tinymce.DOM.hide("wp_gallerybtns")}clearTimeout(this.mceTout);this.mceTout=0},_resizeIframe:function(c,e,b){var d=c.getContentAreaContainer().firstChild;a.setStyle(d,"height",d.clientHeight+b);c.theme.deltaHeight+=b},_handleMoreBreak:function(c,d){var e,b;e='<img src="'+d+'/img/trans.gif" alt="$1" class="mceWPmore mceItemNoResize" title="'+c.getLang("wordpress.wp_more_alt")+'" />';b='<img src="'+d+'/img/trans.gif" class="mceWPnextpage mceItemNoResize" title="'+c.getLang("wordpress.wp_page_alt")+'" />';c.onPostRender.add(function(){if(c.theme.onResolveName){c.theme.onResolveName.add(function(f,g){if(g.node.nodeName=="IMG"){if(c.dom.hasClass(g.node,"mceWPmore")){g.name="wpmore"}if(c.dom.hasClass(g.node,"mceWPnextpage")){g.name="wppage"}}})}});c.onBeforeSetContent.add(function(f,g){if(g.content){g.content=g.content.replace(/<!--more(.*?)-->/g,e);g.content=g.content.replace(/<!--nextpage-->/g,b)}});c.onPostProcess.add(function(f,g){if(g.get){g.content=g.content.replace(/<img[^>]+>/g,function(i){if(i.indexOf('class="mceWPmore')!==-1){var h,j=(h=i.match(/alt="(.*?)"/))?h[1]:"";i="<!--more"+j+"-->"}if(i.indexOf('class="mceWPnextpage')!==-1){i="<!--nextpage-->"}return i})}});c.onNodeChange.add(function(g,f,h){f.setActive("wp_page",h.nodeName==="IMG"&&g.dom.hasClass(h,"mceWPnextpage"));f.setActive("wp_more",h.nodeName==="IMG"&&g.dom.hasClass(h,"mceWPmore"))})}});tinymce.PluginManager.add("wordpress",tinymce.plugins.WordPress)})();