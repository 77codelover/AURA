# Hand Universe

A browser-based AI hand-controlled 3D particle installation. It renders up to 5,000 adaptive particles at native 4K resolution with custom physics and tracks one hand locally using MediaPipe Tasks Vision.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL, select **Enter Experience**, and allow camera access. Camera access requires HTTPS in production (localhost is allowed). If camera or model loading fails, use demo mode.

## Controls

- Open palm: repel particles
- Closed fist: attract and compress
- Pinch: grab the particle field
- Index finger: energize nearby points
- Two fingers: next formation
- Mouse demo: move to steer; click/hold for force; wheel changes depth
- Keyboard: left/right changes formation, space explodes, R resets

The app includes 20 fluid formations spanning cosmic, geometric, organic, abstract, and text-based designs. Tracking is smoothed before it reaches the particle engine. Video frames never leave the browser.

## Production

```bash
npm run build
```

Deploy the generated `dist` folder to Netlify, or import this repository into Vercel as a Vite project. No environment variables or backend are required. The MediaPipe WASM and hand model are fetched from their public CDNs at runtime.
