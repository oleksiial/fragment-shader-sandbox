#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 4.;

    vec3 color = vec3(0.0);
    vec2 mouse = u_mouse * 4. / u_resolution;
    color += 1. - distance(mouse, st) * 3.;
    color *= 1. - distance(vec2(2.0, 1.), st) * 3.;
    color *= 1. - distance(vec2(1.0, 2.), st) * 3.;
    color *= 1. - distance(vec2(3.0, 2.), st) * 3.;
    // color *= distance(vec2(0.5), st) * 3.;
    // color *= distance(vec2(2.), st) * 3.;

    // float rect = step((sin(u_time) + 1.) / 2. - 0.002, st.y) 
    //   - step((sin(u_time) + 1.) / 2. + 0.002, st.y);

    // fragColor = vec4(u_mouse / u_resolution, 0.0, 1.0);
    fragColor = vec4(1. - color, 1.0);
}