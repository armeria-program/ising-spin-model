(this["webpackJsonpising-spin"]=this["webpackJsonpising-spin"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,n,t){e.exports=t(29)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),i=t(5),o=t.n(i),l=(t(19),t(2));t(20);var c=function(){var e=Object(a.useState)(0),n=Object(l.a)(e,2),t=n[0],i=n[1],o=Object(a.useState)(0),c=Object(l.a)(o,2),u=c[0],s=c[1],m=function(){var e=window.devicePixelRatio;i(window.innerWidth*e),s(window.innerHeight*e)};return Object(a.useEffect)((function(){window.addEventListener("resize",m),m()})),r.a.createElement(r.a.Fragment,null,r.a.createElement("canvas",{id:"canvas",width:t,height:u}))},u=t(11),s=t(9),m=t(10),d=t(6),f=t(40);t(21);var E=function(e){var n=e.id,t=e.name,a=e.unit,i=e.icon,o=e.value,l=e.min,c=e.max,u=e.decimals,s=e.onChange;return r.a.createElement("div",{className:"slider "+n},r.a.createElement("p",{className:"name"},t),r.a.createElement("p",{className:"value"},o.toFixed(u)," ",a,r.a.createElement("span",{className:"icon"},i)),r.a.createElement(f.a,{value:o,min:l,max:c,step:Math.pow(10,-u),onChange:function(e,n){return s(n)}}))},p=(t(26),{temperature:{name:"Temperature",min:1,max:800,decimals:0,unit:"K",icon:r.a.createElement(s.a,null)},coupling:{name:"Coupling Constant",min:.2,max:5,decimals:2,icon:r.a.createElement(m.a,null)},field:{name:"External Field Strength",min:-2,max:2,decimals:3,unit:"T",icon:r.a.createElement(d.a,null)}});var _=function(e){var n=e.state,t=e.setState;return r.a.createElement("div",{id:"controls"},Object.entries(n).map((function(e){var a=Object(l.a)(e,2),i=a[0],o=a[1];return r.a.createElement(E,Object.assign({key:i,id:i,value:o,onChange:function(e){var a=Object(u.a)({},n);a[i]=e,t(a)}},p[i]))})))};t(27);var v=function(){var e=Object(a.useState)(!0),n=Object(l.a)(e,2),t=n[0],i=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"help-container "+(t?"open":"closed")},r.a.createElement("div",{className:"help-text"},r.a.createElement("div",{className:"header"},r.a.createElement("span",{className:"icon"},r.a.createElement(d.a,null)),r.a.createElement("div",{className:"title"},"Ising Spin Model",r.a.createElement("p",{className:"subtitle"},"Made with ","<3"," by Samuel J. Li"))),"The ",r.a.createElement("b",null,"Ising spin model")," is a simplified model of ferromagnetic material (e.g. iron) at the microscopic level. Each pixel represents an electron, and its color represents the direction of its spin.",r.a.createElement("p",null,"Each electron is influenced by two opposing forces:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("b",null,"Magnetism"),", which tends to align the spin of each electron with its neighbors and the external magnetic field, and"),r.a.createElement("li",null,r.a.createElement("b",null,"Temperature"),", which causes random flucuations in orientation.")),"Despite its simplicity, the model exhibits complex behavior, including spontaneous magnetization, magnetic domains, and a Curie temperature.",r.a.createElement("button",{onClick:function(){return i(!1)}},"Got it!"))))},g=null,h=null,T=null,b=null,R=null,w={coupling:.5,field:0,temperature:273,iteration:0,random_seed:0},x={};function A(e,n){var t=g.createShader(e);if(g.shaderSource(t,n),g.compileShader(t),g.getShaderParameter(t,g.COMPILE_STATUS))return t;console.error(g.getShaderInfoLog(t)),g.deleteShader(t)}function S(){var e=g.createTexture();return g.bindTexture(g.TEXTURE_2D,e),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.NEAREST),g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.NEAREST),F(),e}function F(){for(var e=[],n=[g.canvas.width,g.canvas.height],t=n[0],a=n[1],r=0;r<t*a*4;r++)e.push(Math.random()<.5?0:255);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,t,a,0,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(e)),g.uniform2f(x.resolution,t,a)}function O(e,n){w[e]=n,g.uniform1f(x[e],n)}function C(){if(null===g){var e=document.getElementById("canvas");g=e.getContext("webgl"),function(){var e=A(g.VERTEX_SHADER,"\nattribute vec2 a_position;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n    v_texCoord = (a_position + 1.0) / 2.0;\n    gl_Position = vec4(a_position, 0, 1);\n}\n"),n=A(g.FRAGMENT_SHADER,"\nprecision highp float;\n\nuniform sampler2D u_spin;\nuniform vec2 u_resolution;\n\nuniform float u_coupling;\nuniform float u_field;\nuniform float u_temperature;\n\nuniform float u_iteration;\nuniform float u_random_seed;\n\nvarying vec2 v_texCoord;\n\nconst float C_BOLTZMANN = 4e-3;\n\nfloat get_spin(float dx, float dy) {\n    return 2.0 * texture2D(\n        u_spin,\n        v_texCoord + vec2(dx, dy) / u_resolution\n    ).x - 1.0;\n}\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    float spin = get_spin(0.0, 0.0);\n    float delta_h = 2.0 * spin * (u_coupling * (\n        get_spin(1.0, 0.0)\n        + get_spin(-1.0, 0.0)\n        + get_spin(0.0, 1.0)\n        + get_spin(0.0, -1.0)\n    ) + u_field);\n    float beta = 1.0 / (u_temperature * C_BOLTZMANN);\n    float flip_probability = exp(-max(delta_h, 0.0) * beta);\n\n    // Ensures we never flip two adjacent cells at once\n    bool mask = mod(\n        gl_FragCoord.x + gl_FragCoord.y + u_iteration, 2.0\n    ) < 0.5;\n\n    float new_spin = (spin + 1.0)/2.0;\n    if (mask && (rand(\n        v_texCoord + u_random_seed * vec2(1.0, 3.14159)\n    ) < flip_probability)) {\n        new_spin = 1.0 - new_spin;\n    }\n    gl_FragColor = vec4(new_spin, new_spin, new_spin, 1.0);\n}\n");R=g.createProgram(),g.attachShader(R,e),g.attachShader(R,n),g.linkProgram(R),g.getProgramParameter(R,g.LINK_STATUS)&&g.useProgram(R),console.error(g.getProgramInfoLog(R)),g.deleteProgram(R)}(),function(){var e=g.getAttribLocation(R,"a_position"),n=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,n),g.enableVertexAttribArray(e),g.vertexAttribPointer(e,2,g.FLOAT,!1,0,0),g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),g.STATIC_DRAW)}(),T=S(),b=g.createFramebuffer(),h=S(),function(){for(var e=0,n=Object.entries(w);e<n.length;e++){var t=Object(l.a)(n[e],2),a=t[0],r=t[1];x[a]=g.getUniformLocation(R,"u_"+a),g.uniform1f(x[a],r)}x.resolution=g.getUniformLocation(R,"u_resolution")}(),window.addEventListener("resize",U),U(),D()}}function U(){g.bindTexture(g.TEXTURE_2D,h),F(),g.bindTexture(g.TEXTURE_2D,T),F(),g.viewport(0,0,g.canvas.width,g.canvas.height)}function D(){g.bindTexture(g.TEXTURE_2D,h),g.bindFramebuffer(g.FRAMEBUFFER,b),g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,T,0),g.drawArrays(g.TRIANGLES,0,6),g.bindFramebuffer(g.FRAMEBUFFER,null),g.drawArrays(g.TRIANGLES,0,6);var e=h;h=T,T=e,O("iteration",1-w.iteration),O("random_seed",Math.random()),requestAnimationFrame(D)}document.addEventListener("DOMContentLoaded",(function(){return setTimeout(C,100)}));t(28);var L=function(){var e=Object(a.useState)({temperature:273,coupling:.5,field:0}),n=Object(l.a)(e,2),t=n[0],i=n[1],o=function(e){return e.preventDefault()};return Object(a.useEffect)((function(){document.addEventListener("gesturestart",o,{passive:!1}),document.addEventListener("touchmove",o,{passive:!1})})),r.a.createElement(r.a.Fragment,null,r.a.createElement(c,null),r.a.createElement(_,{state:t,setState:function(e){for(var n=0,t=Object.entries(e);n<t.length;n++){var a=Object(l.a)(t[n],2);O(a[0],a[1])}i(e)}}),r.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.752b6350.chunk.js.map