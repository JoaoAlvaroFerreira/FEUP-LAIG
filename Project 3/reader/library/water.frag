#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

	
		
	
	gl_FragColor = color;
} 

/* #ifdef GL_ES
precision highp float;
#endif
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;
uniform vec4 selColor;
void main() {
// half the object gets the normal color. The other half sums r+g+b
if (coords.x > 0.0)
gl_FragColor = normal;
else {
gl_FragColor.rgb = abs(coords.xyz)/3.0;
gl_FragColor.a = 1.0;
}
gl_FragColor.rgb=mix(gl_FragColor.rgb, selColor.rgb, timeFactor);
}
*/
