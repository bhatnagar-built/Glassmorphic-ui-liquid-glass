/**
 * Liquid Glass SVG Optics & Displacement Filter Generator
 * Creates hardware-accelerated procedural optical refraction and surface caustics.
 */

export function generateRefractionFilterId(sceneId: string, refraction: number): string {
  return `lg-refract-${sceneId}-${Math.round(refraction)}`;
}

export function generateSpecularFilterId(sceneId: string): string {
  return `lg-specular-${sceneId}`;
}

export function generateChromaticFilterId(sceneId: string, scale: number): string {
  return `lg-chromatic-${sceneId}-${Math.round(scale)}`;
}

export interface FilterProps {
  id: string;
  refraction: number;
  chromatic?: boolean;
}

/**
 * Creates SVG filter elements that produce fluid-like refraction:
 * - feTurbulence generates gentle organic surface curvature vectors
 * - feDisplacementMap distorts the backdrop through the refraction vector
 * - feSpecularLighting renders directional edge caustics & glints
 */
export function createSvgFilterDefs(sceneId: string, refraction: number = 30): string {
  const refractId = generateRefractionFilterId(sceneId, refraction);
  const specId = generateSpecularFilterId(sceneId);
  const chromId = generateChromaticFilterId(sceneId, refraction);

  // Normalize scale (0 - 100 to sensible pixel displacement 0 - 32px)
  const scale = (refraction / 100) * 32;

  return `
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;" aria-hidden="true">
      <defs>
        <!-- Fluid Refraction Displacement Filter -->
        <filter id="${refractId}" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feComposite in="SourceGraphic" in2="displaced" operator="over" />
        </filter>

        <!-- Specular Surface Caustics Filter -->
        <filter id="${specId}" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="35" lighting-color="#ffffff" result="specOut">
            <fePointLight x="-100" y="-100" z="200" />
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specular" />
          <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>

        <!-- Prismatic Chromatic Dispersion Filter -->
        <filter id="${chromId}" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" seed="3" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="${scale * 0.85}" xChannelSelector="R" yChannelSelector="B" result="rDisp" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="${scale}" xChannelSelector="G" yChannelSelector="R" result="gDisp" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="${scale * 1.15}" xChannelSelector="B" yChannelSelector="G" result="bDisp" />
          <feColorMatrix in="rDisp" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feColorMatrix in="gDisp" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feColorMatrix in="bDisp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="chromaticResult" />
        </filter>
      </defs>
    </svg>
  `;
}
