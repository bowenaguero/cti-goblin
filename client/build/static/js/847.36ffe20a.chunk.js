"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[847],{4847:(r,e,t)=>{t.r(e),t.d(e,{rpmChanges:()=>i,rpmSpec:()=>f});var n=/^-+$/,a=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)  ?\d{1,2} \d{2}:\d{2}(:\d{2})? [A-Z]{3,4} \d{4} - /,c=/^[\w+.-]+@[\w.-]+/;const i={name:"rpmchanges",token:function(r){if(r.sol()){if(r.match(n))return"tag";if(r.match(a))return"tag"}return r.match(c)?"string":(r.next(),null)}};var o=/^(i386|i586|i686|x86_64|ppc64le|ppc64|ppc|ia64|s390x|s390|sparc64|sparcv9|sparc|noarch|alphaev6|alpha|hppa|mipsel)/,p=/^[a-zA-Z0-9()]+:/,u=/^%(debug_package|package|description|prep|build|install|files|clean|changelog|preinstall|preun|postinstall|postun|pretrans|posttrans|pre|post|triggerin|triggerun|verifyscript|check|triggerpostun|triggerprein|trigger)/,l=/^%(ifnarch|ifarch|if)/,s=/^%(else|endif)/,m=/^(\!|\?|\<\=|\<|\>\=|\>|\=\=|\&\&|\|\|)/;const f={name:"rpmspec",startState:function(){return{controlFlow:!1,macroParameters:!1,section:!1}},token:function(r,e){if("#"==r.peek())return r.skipToEnd(),"comment";if(r.sol()){if(r.match(p))return"header";if(r.match(u))return"atom"}if(r.match(/^\$\w+/))return"def";if(r.match(/^\$\{\w+\}/))return"def";if(r.match(s))return"keyword";if(r.match(l))return e.controlFlow=!0,"keyword";if(e.controlFlow){if(r.match(m))return"operator";if(r.match(/^(\d+)/))return"number";r.eol()&&(e.controlFlow=!1)}if(r.match(o))return r.eol()&&(e.controlFlow=!1),"number";if(r.match(/^%[\w]+/))return r.match("(")&&(e.macroParameters=!0),"keyword";if(e.macroParameters){if(r.match(/^\d+/))return"number";if(r.match(")"))return e.macroParameters=!1,"keyword"}return r.match(/^%\{\??[\w \-\:\!]+\}/)?(r.eol()&&(e.controlFlow=!1),"def"):(r.next(),null)}}}}]);
//# sourceMappingURL=847.36ffe20a.chunk.js.map