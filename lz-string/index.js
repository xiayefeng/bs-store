"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r={isCompress:!0,plugin:function(r,o){return r(o={exports:{}},o.exports),o.exports}((function(r){var o=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",n={};function t(r,o){if(!n[r]){n[r]={};for(var e=0;e<r.length;e++)n[r][r.charAt(e)]=e}return n[r][o]}var s={compressToBase64:function(r){if(null==r)return"";var e=s._compress(r,6,(function(r){return o.charAt(r)}));switch(e.length%4){default:case 0:return e;case 1:return e+"===";case 2:return e+"==";case 3:return e+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:s._decompress(r.length,32,(function(e){return t(o,r.charAt(e))}))},compressToUTF16:function(o){return null==o?"":s._compress(o,15,(function(o){return r(o+32)}))+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:s._decompress(r.length,16384,(function(o){return r.charCodeAt(o)-32}))},compressToUint8Array:function(r){for(var o=s.compress(r),e=new Uint8Array(2*o.length),n=0,t=o.length;n<t;n++){var i=o.charCodeAt(n);e[2*n]=i>>>8,e[2*n+1]=i%256}return e},decompressFromUint8Array:function(o){if(null==o)return s.decompress(o);for(var e=new Array(o.length/2),n=0,t=e.length;n<t;n++)e[n]=256*o[2*n]+o[2*n+1];var i=[];return e.forEach((function(o){i.push(r(o))})),s.decompress(i.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":s._compress(r,6,(function(r){return e.charAt(r)}))},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),s._decompress(r.length,32,(function(o){return t(e,r.charAt(o))})))},compress:function(o){return s._compress(o,16,(function(o){return r(o)}))},_compress:function(r,o,e){if(null==r)return"";var n,t,s,i={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(s=0;s<r.length;s+=1)if(u=r.charAt(s),Object.prototype.hasOwnProperty.call(i,u)||(i[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(i,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(n=0;n<h;n++)m<<=1,v==o-1?(v=0,d.push(e(m)),m=0):v++;for(t=a.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1}else{for(t=1,n=0;n<h;n++)m=m<<1|t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=i[a],n=0;n<h;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),i[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(n=0;n<h;n++)m<<=1,v==o-1?(v=0,d.push(e(m)),m=0):v++;for(t=a.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1}else{for(t=1,n=0;n<h;n++)m=m<<1|t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=i[a],n=0;n<h;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,n=0;n<h;n++)m=m<<1|1&t,v==o-1?(v=0,d.push(e(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(e(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:s._decompress(r.length,32768,(function(o){return r.charCodeAt(o)}))},_decompress:function(o,e,n){var t,s,i,p,u,c,a,l=[],f=4,h=4,d=3,m="",v=[],w={val:n(0),position:e,index:1};for(t=0;t<3;t+=1)l[t]=t;for(i=0,u=Math.pow(2,2),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;switch(i){case 0:for(i=0,u=Math.pow(2,8),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;a=r(i);break;case 1:for(i=0,u=Math.pow(2,16),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;a=r(i);break;case 2:return""}for(l[3]=a,s=a,v.push(a);;){if(w.index>o)return"";for(i=0,u=Math.pow(2,d),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;switch(a=i){case 0:for(i=0,u=Math.pow(2,8),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;l[h++]=r(i),a=h-1,f--;break;case 1:for(i=0,u=Math.pow(2,16),c=1;c!=u;)p=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),i|=(p>0?1:0)*c,c<<=1;l[h++]=r(i),a=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[a])m=l[a];else{if(a!==h)return null;m=s+s.charAt(0)}v.push(m),l[h++]=s+m.charAt(0),s=m,0==--f&&(f=Math.pow(2,d),d++)}}};return s}();null!=r&&(r.exports=o)}))};exports.default=r;
