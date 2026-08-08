You have passwordless sudo priveleges inside of a docker container. Dont be afraid to use sudo commands.

As a coding agent, there are a clear rules that you should operate under.

When generating plans or mapping out a project, never estimate how much time it will take.


Intructions on creating 3D assets in threeJS/svelte:

- When creating things in 3D, you must ALWAYS evaluate the result from multiple, close camera angles.
- Use real screenshots and images to confirm the creation/completion of a given task.
- If the result seems not up to par or has issues (misalignment, impossible phyiscs), address and fix the issue immediately.

Screenshot workflow for verifying 3D changes:

1. Start the dev server: `npm run dev` in `deeroot-dev/`. Note the port (Vite may fall back from 5173).
2. Playwright is installed in the project's `node_modules`, so use `npx playwright screenshot` from `deeroot-dev/`.
3. Default camera is high and wide; temporarily move `T.PerspectiveCamera` in `RoomScene.svelte` to get close angles of the asset. Revert the camera before finishing.
4. Save verification shots to `screenshots/` with descriptive names.

Example command:
```
npx playwright screenshot --viewport-size=1280,720 --wait-for-timeout=3000 http://localhost:5174/ /workspace/project/screenshots/stool-side-view.png
```

