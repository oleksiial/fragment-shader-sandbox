#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 fragColor;

#define PI 3.1415

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 red = vec3(1.0, 0.0, 0.0);
  
  vec2 pos = vec2(0.25, 0.5)-st;

  float r = length(pos)*.25;
  float a = atan(pos.y,pos.x);
  float f = cos(a * 16.);
  // float f = cos((a * 16.) + fract(u_time) * PI * 2.);

  float c = step(0.25, r / .15);

  fragColor = vec4(
      (vec3(smoothstep(f, f+0.002, r)) * c) + red,
      1.0
	);
}