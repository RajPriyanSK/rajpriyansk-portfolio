"use client";
import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Vec2, Vec4 } from 'ogl';

export default function FluidCursor() {
    const ctn = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ctn.current) return;
        const container = ctn.current;

        const renderer = new Renderer({ alpha: true, dpr: 2 });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const camera = new Camera(gl, { fov: 35 });
        camera.position.set(0, 0, 5);

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize, false);
        resize();

        const scene = new Transform();

        // Mouse state
        const mouse = new Vec2();
        const lastMouse = new Vec2();
        let velocity = new Vec2();

        window.addEventListener('mousemove', (e) => {
            // Convert to -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            lastMouse.copy(mouse);
            mouse.set(x, y);

            velocity.set(x - lastMouse.x, y - lastMouse.y);
        });

        const geometry = new Plane(gl);

        // simple "blob" shader
        const program = new Program(gl, {
            vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uVelocity;
        varying vec2 vUv;

        void main() {
            vec2 center = uMouse * 0.5 + 0.5; // map -1..1 to 0..1
            float dist = distance(vUv, center);
            
            // Basic blob showing mouse position
            // float alpha = smoothstep(0.1, 0.0, dist);
            // gl_FragColor = vec4(1.0, 0.8, 0.0, alpha); // Gold color

            // Create a trail effect (requires framebuffer, simplifying for now to just show functioning WebGL)
             float alpha = smoothstep(0.05, 0.0, dist);
             gl_FragColor = vec4(1.0, 1.0, 0.0, alpha); 
        }
      `,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new Vec2() },
                uVelocity: { value: new Vec2() },
            },
            transparent: true,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            program.uniforms.uMouse.value.lerp(mouse, 0.1);
            program.uniforms.uVelocity.value.lerp(velocity, 0.1);

            // Keep mesh filling screen
            // For a fullscreen quad effect without projection issues, we typically render a fullscreen triangle.
            // But here we use a plane in 3D space. Let's scale it to fit.
            // (Simplified: just making it huge for now)
            mesh.scale.set(10, 10, 1);

            renderer.render({ scene, camera });
        }
        animationId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (container && container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, []);

    return <div ref={ctn} className="fixed inset-0 pointer-events-none z-[50]" />;
}
