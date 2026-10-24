# Sharp homepage portrait exports

Both active hero assets were regenerated with the built-in imagegen tool on 2026-10-24. The tool returned originals at 1672 × 940 (normal) and 1672 × 941 (glasses); these are **not native 4K generations**. Each was exported to 3840 × 2160 with Lanczos resizing and WebP quality 96. Upscaling does not create native 4K photographic detail.

- Normal: `public/assets/img/hero-studio-wide-4k.webp`
- Glasses: `public/assets/img/hero-studio-reveal-4k.webp`

The hero loads the complete source directly to prevent small Next.js viewport derivatives from being enlarged for the tall mobile cover crop. The hover canvas supports device pixel ratios up to 3 with a 12-million-pixel buffer limit. Its opaque brush center avoids mixing two slightly different facial layers; only the outer brush edge feathers. Mobile top shading ends before the face.

## Normal generation prompt

Use case: identity-preserve. Edit target: supplied portrait, recreate as an exceptionally crisp photorealistic professional studio photograph. OUTPUT NATIVE 4K UHD 3840 x 2160 pixels, landscape 16:9, maximum available detail and resolution. Preserve exactly the SAME man's facial identity, hair, expression, pose, head angle, petrol blue shirt, framing and subject placement, face centered at 66% width; empty peach/lilac left 42% for website typography. No glasses in this normal mode. Resolve fine sharp eyes, iris detail, eyelashes, individual hair strands, natural skin texture, beard hairs and fabric weave. Even studio lighting, face and hair entirely in focus. Remove the low-resolution softness and painterly smooth skin. No beauty smoothing, shallow focus on the face, bloom, haze, motion blur or fog. Background can be a flat clean pastel wash, not blurred subject edges. Do not add text, watermark or UI. Keep the head fully inside frame. Request actual 3840x2160 output, not a small preview.

## Glasses generation prompt

Use case: identity-preserve. Edit target image 1, the newly regenerated crisp normal portrait. Add ONLY elegant clear lavender/cyan augmented-reality glasses across his eyes and subtle futuristic cyan contour accents on the shirt, matching the style of image 2. Preserve exact facial identity, expression, fine skin texture, sharp hair detail, pose, face size and pixel position, shirt, studio lighting, pastel peach/lilac background and empty left typography space of IMAGE 1. Do not move or resize anything. Glass lenses must be transparent so eyes and face remain sharply visible. No bloom, fog, haze, blur, smoothing or soft focus anywhere on the subject. Maximum photographic detail; request 3840x2160 4K landscape output. No text/watermarks/UI.
