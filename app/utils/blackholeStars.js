// import { rgba } from "framer-motion";

// export function blackhole(containerSelector) {
//   const container = document.querySelector(containerSelector);
//   if (!container) return;

//   const canvas = document.createElement("canvas");
//   container.appendChild(canvas);

//   const ctx = canvas.getContext("2d");

//   function resize() {
//     canvas.width = container.offsetWidth;
//     canvas.height = container.offsetHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   const cw = canvas.width;
//   const ch = canvas.height;
//   const centerX = cw / 2;
//   const centerY = ch / 2;

//   const stars = [];

//   const Star = () => {
//     let x = Math.random() * cw;
//     let y = Math.random() * ch;
//     let size = Math.random() * 2;
//     let speed = 0.1;

//     // Give each star a velocity
//     let angle = Math.random() * Math.PI * 2;
//     let vx = Math.cos(angle) * speed;
//     let vy = Math.sin(angle) * speed;

//     let update = () => {
//       const dx = centerX - x;
//       const dy = centerY - y;
//       const dist = Math.sqrt(dx * dx + dy * dy);

//       // Gravitational pull toward center (acts like acceleration)
//       const pullStrength = 150; // tweak this for stronger/weaker pull
//       vx += (dx / dist) * pullStrength;
//       vy += (dy / dist) * pullStrength;

//       // Update position with velocity
//       x += vx;
//       y += vy;

//       // If close to the center, respawn somewhere else
//       if (dist < 5) {
//         x = Math.random() * cw;
//         y = Math.random() * ch;
//         angle = Math.random() * Math.PI * 2;
//         vx = Math.cos(angle) * speed;
//         vy = Math.sin(angle) * speed;
//       }
//     };

//     let draw = () => {
//       ctx.fillStyle = "white";
//       ctx.beginPath();
//       ctx.arc(x, y, size, 0, Math.PI * 2);
//       ctx.fill();
//     };

//     return { update, draw };
//   };

//   let init = () => {
//     for (let i = 0; i < 500; i++) {
//       stars.push(Star());
//     }
//   };

//   let animate = () => {
//     ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     for (let star of stars) {
//       star.update();
//       star.draw();
//     }
//     requestAnimationFrame(animate);
//   };

//   init();
//   animate();
// }
