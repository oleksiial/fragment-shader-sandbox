#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 fragColor;

float fillCircle(vec2 pos, vec2 center, float radius) {
    float d = distance(pos, center);
    return smoothstep(radius, radius-0.001, d);
}

float circle(vec2 pos, vec2 center, float radius) {
    float c1 = fillCircle(pos, center, radius + 0.002);
    float c2 = fillCircle(pos, center, radius - 0.002);
    return c1 - c2;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  vec3 green = vec3(0.,1.,0.);

  st *= 2.;
  st -= vec2(1.);
  
  float r = abs(sin(u_time * 2.)) / 2. + 0.3;   
  color += green * circle(st, vec2(0.0), 1.0 * r);
  color += green * circle(st, vec2(0.0), 0.5 * r);
  color += green * circle(st, vec2(0.0), 0.05 * r);

  fragColor = vec4(color, 1.0);
}