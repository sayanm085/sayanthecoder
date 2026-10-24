# Full-width hero and cursor reveal

Reference: [Lumora on GetLayers](https://www.getlayers.ai/layer/lumora). Reviewed the public preview recording: a portrait fills the hero behind overlaid text, navigation, a feature card and a translucent wordmark. A temporary soft brush reveals a second image under the pointer.

The implementation uses Sayan's own color portrait and palette. The active assets have since been regenerated and exported at 3840 × 2160; see [the current assets and generation prompts](hero-4k-assets.md) for source resolution and export details. The following records the earlier generation.

Final assets:

- `public/assets/img/hero-studio-wide.webp` — static base, about 89 KB.
- `public/assets/img/hero-studio-reveal.webp` — brush-revealed alternate, about 114 KB.

The reveal uses a 143 CSS-pixel radial brush, interpolation between pointer positions, a gradually fading alpha mask and an idle cutoff. Its cover crop matches the base image on desktop. Small screens, coarse pointers and reduced-motion preferences use the static base image. The mask clears on resize, tab blur, document hiding and when the hero leaves the viewport.

## Base image prompt

> Use case: identity-preserve / outpainting. Asset type: full-bleed photographic website hero background, LANDSCAPE 16:9. Expand the supplied color studio portrait into a wide landscape editorial photograph. Preserve this SAME man's exact facial identity, hairstyle, age, natural warm skin tone, facial hair, expression and deep petrol-blue crewneck. Keep the complete head and hair in the frame. Compose the man chest-up at 65% of the canvas width; his head occupies the center-right region, his shoulders reach the bottom edge. Keep the LEFT 42% of the image entirely empty pale peach/ivory seamless studio background for headline text. Preserve enough open space in the far top-right corner for a small UI card. Background is a beautifully soft very pale peach studio wash, subtly blending to pale lilac on the far right, with soft warm daylight. Subject realistic and naturally colored, no dramatic dark shadows, no grayscale. Landscape composition 16:9, high resolution, premium independent design engineer portfolio aesthetic. No letters, typography, symbols, props or watermarks. This is a photograph used underneath actual website UI.

## Reveal image prompt

> Use case: precise-object-edit / identity-preserve. Asset type: SECOND LAYER of a website cursor-reveal effect. Edit this exact wide photograph. CRITICAL: preserve its exact 16:9 dimensions, camera, framing, subject placement, pose, facial identity, silhouette and every facial feature's pixel alignment. Do not move, crop, zoom or resculpt anything. Make an alternate colorful technology-art version: add elegant futuristic translucent AR glasses across his eyes and temples, with a slim transparent lavender/cobalt frame and beautiful warm coral and cyan reflections, eyes still visible. Keep warm realistic healthy skin tones, add subtle blue-violet rim lighting on hair and the petrol-blue shirt. Shift the background into a luminous soft lilac, pale turquoise and peach studio wash, with a few graceful fine iridescent light contours near the outer shoulders. The left 42% stays nearly empty for text. Natural facial identity must remain unchanged. This variant will be painted softly over the original image only under the cursor, so alignment is essential. Tasteful high-end technology editorial photography, full color, no black-and-white, no metallic skin, no masks covering his face, no text, logos or watermarks.
