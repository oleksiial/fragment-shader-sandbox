#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

#define PI 3.14159265359

float plot(float x, float y){
	return  smoothstep(y-0.01, y, x) - smoothstep(y, y+0.01, x);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	
	float a = 0.1;
	float a1 = a * cos(u_time * 2.0);
	float a2 = a * cos(u_time * 2.0 + PI);
	float a3 = a * sin(u_time * 2.0 + PI);
	float a4 = a * sin(u_time * 2.0);

	float p1 = plot(st.x, sin(st.y * PI * 5.0 + 0.) * a1 + 0.5);
	float p2 = plot(st.x, sin(st.y * PI * 5.0 + 0.) * a2 + 0.5);
	float p3 = plot(st.x, sin(st.y * PI * 5.0 + 0.) * a3 + 0.5);
	float p4 = plot(st.x, sin(st.y * PI * 5.0 + 0.) * a4 + 0.5);
	
	vec3 color = 
		p1*vec3(1.0,0.0,0.0) + 
		p2*vec3(0.0,1.0,0.0) + 
		p3*vec3(0.0,0.0,1.0) + 
		p4*vec3(1.0,1.0,1.0);

	fragColor = vec4(color,1.0);
}
