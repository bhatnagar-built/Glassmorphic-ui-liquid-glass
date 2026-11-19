/**
 * Squircle & Continuous Curvature Geometry Generator
 * Computes smooth continuous curvature border radii and clip-path squircles.
 */

export function resolveBorderRadius(radius?: number | 'capsule' | 'circle'): string {
  if (radius === undefined) return '16px';
  if (radius === 'capsule') return '9999px';
  if (radius === 'circle') return '50%';
  return `${radius}px`;
}

/**
 * Calculates responsive inner radii for concentric nested glass surfaces
 * R_inner = max(0, R_outer - padding)
 */
export function calculateConcentricRadius(outerRadius: number, inset: number): number {
  return Math.max(4, outerRadius - inset);
}
