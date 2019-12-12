float fillRect(vec2 pos, float x, float y, float w, float h) {
    float l = step(x, pos.x);
    float r = step(y, pos.y);
    float t = step(1. - x - w, 1. - pos.x);
    float b = step(1. - y - h, 1. - pos.y);
    return l * r * t * b;
}

// another approach
// float fillRect(vec2 st, float x, float y, float w, float h) {
//     float x1 = step(x, st.x);
//     float y1 = step(y, st.y);
//     float x2 = 1.0 - step(x + w, st.x);
//     float y2 = 1.0 - step(y + h, st.y);
//     return x1 * y1 * x2 * y2;
// }

float line(vec2 pos, float y) {
    return smoothstep(y - 0.003, y, pos.y) - smoothstep(y, y + 0.003, pos.y);
}

mat2 rotate2d(float angle){
    return mat2(
        cos(angle), -sin(angle),
        sin(angle),  cos(angle)
    );
}

float fillCircle(vec2 pos, vec2 center, float radius) {
    float d = distance(pos, center);
    return smoothstep(radius, radius-0.001, d);
}

float circle(vec2 pos, vec2 center, float radius) {
    float c1 = fillCircle(pos, center, radius + 0.002);
    float c2 = fillCircle(pos, center, radius - 0.002);
    return c1 - c2;
}