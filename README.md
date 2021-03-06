# Ising Spin Model
A blazing-fast WebGL implementation of the Ising spin model.

![Screenshot of application](https://github.com/wgxli/ising-spin-model/raw/master/public/screenshot.png)

Reproduces many behaviours of ferromagnetic materials,
including:
- Magnetic domains
- Spontaneous magnetization
- Hysterisis
- Curie temperature

## Technical details
Simulation is done on the GPU (render-to-texture) via Metropolis sampling.
We store 4 spins (one per channel) in each pixel, so the simulation runs at twice
the native pixel resolution of the canvas.

To ensure that pixel updates remain independent
during parallelization, we perform two passes,
each of which updates pixels in a checkerboard formation.
This ensures that two adjacent pixels will never be simultaneously flipped.
