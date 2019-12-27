import { createProgramFromShaderSources, resizeCanvasToDisplaySize } from './utils';
import gl from './context';

import vertexShaderSource from './shaders/shader.vert';
import fragmentShaderSource from './shaders/rainbow3yoKid.frag';

const main = () => {  
	const program = createProgramFromShaderSources(gl, vertexShaderSource, fragmentShaderSource);
	const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
	const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
	const timeLoc = gl.getUniformLocation(program, 'u_time');

	const mouse = [0, 0];
	const rect = gl.canvas.getBoundingClientRect();
	gl.canvas.addEventListener('mousemove', (e) => {
		mouse[0] = e.clientX - rect.left;
		mouse[1] = gl.canvas.height - e.clientY + rect.top;
	});

	const start = Math.floor(Date.now());
	const drawScene = () => {
		resizeCanvasToDisplaySize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);
		gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);
		gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
		gl.uniform1f(timeLoc, (Date.now() - start) / 1000);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		requestAnimationFrame(drawScene);
	}

	requestAnimationFrame(drawScene);
}

document.addEventListener('DOMContentLoaded', main);