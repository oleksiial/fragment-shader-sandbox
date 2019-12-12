#version 300 es

precision mediump float;

out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float fillCircle(vec2 pos, vec2 center, float radius) {
    float d = distance(pos, center);
    return smoothstep(radius, radius-0.009, d);
}

float circle(vec2 pos, vec2 center, float radius) {
    float c1 = fillCircle(pos, center, radius + 0.15);
    float c2 = fillCircle(pos, center, radius - 0.15);
    return c1 - c2;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0, 0.0, 0.0);
    
    st *= 5.;
    st -= 2.5;
    st.y += 2.5;
    
    vec3 colors[7];
    colors[0] = vec3(1. , 0., 0.);
    colors[1] = vec3(1. , 0.5, 0.);
    colors[2] = vec3(1. , 1., 0.);
    colors[3] = vec3(0. , 1., 0.);
    colors[4] = vec3(0. , 0., 1.);
    colors[5] = vec3(75. / 256. , 0., 130. / 256.);
    colors[6] = vec3(148. / 256. , 0., 211. / 256.);
    
    vec2 center = vec2(5.8, -2.0);
    float poss[7];
    poss[0] = circle(st, center, 6.6);
    poss[1] = circle(st, center, 6.9);
    poss[2] = circle(st, center, 7.2);
    poss[3] = circle(st, center, 7.5);
    poss[4] = circle(st, center, 7.8);
    poss[5] = circle(st, center, 8.1);
    poss[6] = circle(st, center, 8.4);
    
    st.y -= 1.0;
    
    float objectsPos = 0.0;
    
    for (int i = 0; i < 7; i++) {
        color += poss[i] * colors[i]; 
        objectsPos += poss[i];
    }
    
    st.x += 2.5;
    st.y -= 3.9;
    float r = length(st)*0.6;
    float a = atan(st.y,st.x);
    float f = smoothstep(-0.5,1., cos(a*16.0))*0.640+0.582;
    vec3 fc = vec3( 1.-smoothstep(f,f+0.002,r) );
    st.x -= 2.5;
    st.y += 3.9;
    objectsPos += 1. - step(f, r);
    
    float bgColorFactor = 1. - objectsPos;
    vec3 bgColor = vec3(135. / 256., 206. / 256., 235. / 256.) * bgColorFactor;
    
    color += fc * vec3(1., 1., 0.);
    color += bgColor;
    
    fragColor = vec4(color, 1.0);
}