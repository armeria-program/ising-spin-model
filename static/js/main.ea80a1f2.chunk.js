(this["webpackJsonpising-spin"]=this["webpackJsonpising-spin"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,n,t){e.exports=t(30)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),i=t(6),o=t.n(i),c=(t(19),t(3));t(20);var l=function(e){var n=e.width,t=e.height;return r.a.createElement("canvas",{id:"canvas",width:n,height:t})},u=t(11),s=t(4),m=t(10),d=t(7),f=t(41);t(21);var E=function(e){var n=e.id,t=e.name,a=e.unit,i=e.icon,o=e.value,c=e.min,l=e.max,u=e.decimals,s=e.onChange;return r.a.createElement("div",{className:"slider "+n},r.a.createElement("p",{className:"name"},t),r.a.createElement("p",{className:"value"},o.toFixed(u)," ",a,r.a.createElement("span",{className:"icon"},i)),r.a.createElement(f.a,{value:o,min:c,max:l,step:Math.pow(10,-u),onChange:function(e,n){return s(n)}}))},v=(t(26),{temperature:{name:"Temperature",min:1,max:800,decimals:0,unit:"K",icon:r.a.createElement(s.c,null)},coupling:{name:"Coupling Constant",min:.2,max:2,decimals:2,icon:r.a.createElement(m.a,null)},field:{name:"External Field Strength",min:-.5,max:.5,decimals:3,unit:"T",icon:r.a.createElement(d.a,null)}});var p=function(e){var n=e.state,t=e.setState;return r.a.createElement("div",{id:"controls"},Object.entries(n).map((function(e){var a=Object(c.a)(e,2),i=a[0],o=a[1];return r.a.createElement(E,Object.assign({key:i,id:i,value:o,onChange:function(e){var a=Object(u.a)({},n);a[i]=e,"temperature"==i&&function(e){var n=r.a.createElement(s.a,null);e>100&&(n=r.a.createElement(s.d,null)),e>200&&(n=r.a.createElement(s.c,null)),e>400&&(n=r.a.createElement(s.e,null)),e>600&&(n=r.a.createElement(s.b,null)),v.temperature.icon=n}(e),t(a)}},v[i]))})))},g=(t(27),2/Math.log(1+Math.sqrt(2)));function h(e){var n=e.name,t=e.value;return r.a.createElement("div",{className:"entry"},r.a.createElement("p",{className:"name"},n),r.a.createElement("p",{className:"value"},t))}var _=function(e){var n=e.state,t=e.simWidth,a=e.simHeight,i=n.coupling,o=g*i/.004;return r.a.createElement("div",{className:"info-bar"},r.a.createElement(h,{name:"Curie Temperature",value:o.toFixed(1)+" K"}),r.a.createElement(h,{name:"Simulation Size",value:t+" \xd7 "+a}))};t(28);var b=function(){var e=Object(a.useState)(!0),n=Object(c.a)(e,2),t=n[0],i=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"help-container "+(t?"open":"closed"),onClick:function(){return i(!1)}},r.a.createElement("div",{className:"help-text",onClick:function(e){return e.stopPropagation()}},r.a.createElement("div",{className:"header"},r.a.createElement("span",{className:"icon"},r.a.createElement(d.a,null)),r.a.createElement("div",{className:"title"},"Ising Spin Model",r.a.createElement("p",{className:"subtitle"},"Made with ","<3"," by Samuel J. Li"))),"The ",r.a.createElement("b",null,"Ising spin model")," is a simplified model of ferromagnetic material (e.g. iron) at the microscopic level. Each pixel represents an electron, and its color represents the direction of its spin.",r.a.createElement("p",null,"Each electron is influenced by two opposing forces:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("b",null,"Magnetism"),", which tends to align the spin of each electron with its neighbors and the external magnetic field, and"),r.a.createElement("li",null,r.a.createElement("b",null,"Temperature"),", which causes random flucuations in orientation.")),"Despite its simplicity, the model exhibits complex behavior, including spontaneous magnetization, magnetic domains, and a Curie temperature.",r.a.createElement("button",{onClick:function(){return i(!1)}},"Got it!"))))},T=null,x=null,w=null,R=null,A=null,y={coupling:.5,field:0,temperature:273,iteration:0,pass:0,random_seed:0},S={};function C(e,n){var t=T.createShader(e);if(T.shaderSource(t,n),T.compileShader(t),T.getShaderParameter(t,T.COMPILE_STATUS))return t;console.error(T.getShaderInfoLog(t)),T.deleteShader(t)}function F(){var e=T.createTexture();return T.bindTexture(T.TEXTURE_2D,e),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_S,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_T,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MIN_FILTER,T.NEAREST),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MAG_FILTER,T.NEAREST),N(),e}function N(){for(var e=[],n=[T.canvas.width,T.canvas.height],t=n[0],a=n[1],r=0;r<t*a*4;r++)e.push(Math.random()<.5?0:255);T.texImage2D(T.TEXTURE_2D,0,T.RGBA,t,a,0,T.RGBA,T.UNSIGNED_BYTE,new Uint8Array(e)),T.uniform2f(S.resolution,t,a)}function O(e,n){y[e]=n,T.uniform1f(S[e],n)}function U(){if(null===T){var e=document.getElementById("canvas");T=e.getContext("webgl"),function(){var e=C(T.VERTEX_SHADER,"\nattribute vec2 a_position;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n    v_texCoord = (a_position + 1.0) / 2.0;\n    gl_Position = vec4(a_position, 0, 1);\n}\n"),n=C(T.FRAGMENT_SHADER,"\nprecision highp float;\n\nuniform sampler2D u_spin;\nuniform vec2 u_resolution;\n\nuniform float u_coupling;\nuniform float u_field;\nuniform float u_temperature;\n\nuniform float u_pass;\nuniform float u_iteration;\nuniform float u_random_seed;\n\nvarying vec2 v_texCoord;\n\nconst float C_BOLTZMANN = 4e-3;\n\nvec4 get_pixel(float dx, float dy) {\n    return 2.0 * texture2D(\n        u_spin,\n        v_texCoord + vec2(dx, dy) / u_resolution\n    ) - 1.0;\n}\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    vec4 current = get_pixel(0.0, 0.0);\n    vec4 new = (current + 1.0)/2.0;\n\n    // We cram a 2x2 block of binary spin states into each pixel:\n    // R G\n    // B A\n    vec4 top = get_pixel(0.0, 1.0);\n    vec4 bottom = get_pixel(0.0, -1.0);\n    vec4 left = get_pixel(-1.0, 0.0);\n    vec4 right = get_pixel(1.0, 0.0);\n\n    // Sum of four adjacent spin vectors for each 'subpixel'\n    vec4 adjacent_sum = vec4(\n        current.y + current.z + top.z + left.y,\n        current.x + current.w + top.w + right.x,\n        current.x + current.w + left.w + bottom.x,\n        current.y + current.z + right.z + bottom.y\n    );\n\n    // Render to texture on pass zero, otherwise render to screen.\n    if (u_pass < 0.5) {\n        // Compute new spins on pass 0, otherwise just display existing spins.\n        vec4 delta_h = 2.0 * current * (u_coupling * adjacent_sum + u_field);\n        float beta = 1.0 / (u_temperature * C_BOLTZMANN);\n        vec4 flip_probability = exp(-max(delta_h, 0.0) * beta);\n\n        // Update only 'odd' checkerboard on odd iterations and vice-versa\n        vec2 noise = vec2(\n            rand(v_texCoord + u_random_seed * vec2(3.14159, 0.0)),\n            rand(v_texCoord + u_random_seed * vec2(0.0, 3.14159))\n        );\n        if (u_iteration > 0.5) {\n            if (flip_probability.x > noise.x) {new.x = 1.0 - new.x;}\n            if (flip_probability.w > noise.y) {new.w = 1.0 - new.w;}\n        } else {\n            if (flip_probability.y > noise.x) {new.y = 1.0 - new.y;}\n            if (flip_probability.z > noise.y) {new.z = 1.0 - new.z;}\n        }\n\n        gl_FragColor = new;\n    } else {\n        float average = (new.x + new.y + new.z + new.w) / 4.0;\n        gl_FragColor = vec4(average, average, average, 1.0);\n    }\n}\n");A=T.createProgram(),T.attachShader(A,e),T.attachShader(A,n),T.linkProgram(A),T.getProgramParameter(A,T.LINK_STATUS)&&T.useProgram(A),console.error(T.getProgramInfoLog(A)),T.deleteProgram(A)}(),function(){var e=T.getAttribLocation(A,"a_position"),n=T.createBuffer();T.bindBuffer(T.ARRAY_BUFFER,n),T.enableVertexAttribArray(e),T.vertexAttribPointer(e,2,T.FLOAT,!1,0,0),T.bufferData(T.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),T.STATIC_DRAW)}(),w=F(),R=T.createFramebuffer(),x=F(),function(){for(var e=0,n=Object.entries(y);e<n.length;e++){var t=Object(c.a)(n[e],2),a=t[0],r=t[1];S[a]=T.getUniformLocation(A,"u_"+a),T.uniform1f(S[a],r)}S.resolution=T.getUniformLocation(A,"u_resolution")}(),window.addEventListener("resize",D),D(),L()}}function D(){T.bindTexture(T.TEXTURE_2D,x),N(),T.bindTexture(T.TEXTURE_2D,w),N(),T.viewport(0,0,T.canvas.width,T.canvas.height)}function L(){T.bindTexture(T.TEXTURE_2D,x),O("pass",0),T.bindFramebuffer(T.FRAMEBUFFER,R),T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,w,0),T.drawArrays(T.TRIANGLES,0,6),O("pass",1),T.bindFramebuffer(T.FRAMEBUFFER,null),T.drawArrays(T.TRIANGLES,0,6);var e=x;x=w,w=e,O("iteration",1-y.iteration),O("random_seed",Math.random()),requestAnimationFrame(L)}document.addEventListener("DOMContentLoaded",(function(){return setTimeout(U,100)}));t(29);var j=function(){var e=Object(a.useState)({temperature:273,coupling:.5,field:0}),n=Object(c.a)(e,2),t=n[0],i=n[1],o=Object(a.useState)(0),u=Object(c.a)(o,2),s=u[0],m=u[1],d=Object(a.useState)(0),f=Object(c.a)(d,2),E=f[0],v=f[1],g=function(){var e=window.devicePixelRatio;m(window.innerWidth*e),v(window.innerHeight*e)};Object(a.useEffect)((function(){window.addEventListener("resize",g),g()}));var h=function(e){return e.preventDefault()};return Object(a.useEffect)((function(){document.addEventListener("gesturestart",h,{passive:!1}),document.addEventListener("touchmove",h,{passive:!1})})),r.a.createElement(r.a.Fragment,null,r.a.createElement(l,{width:s,height:E}),r.a.createElement(p,{state:t,setState:function(e){for(var n=0,t=Object.entries(e);n<t.length;n++){var a=Object(c.a)(t[n],2);O(a[0],a[1])}i(e)}}),r.a.createElement(_,{state:t,simWidth:2*s,simHeight:2*E}),r.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.ea80a1f2.chunk.js.map