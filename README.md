# SDK7 Scene Chat Bubble


**Previewing the scene**

1. Download this repository.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```
npm run start
```

## To include in your scene

## Required dependencies

- [DCL NPC Toolkit (SDK7)](https://github.com/decentraland-scenes/dcl-npc-toolkit)
- [DCL UI Toolkit (SDK7)](https://github.com/decentraland-scenes/dcl-ui-toolkit)


### 1. Install

```npm i @dcl/npc-scene-utils```

```npm i @dcl/ui-scene-utils```

### 2. Copy Files

Copy chat.ts and chat.ui.tsx to you scene's src folder.

### Add setup to index.ts

```ts
import {setupChat} from "./chat";
import {setupUi} from "./ui";

export function main() {
    setupUi()
    setupChat()

}
```

### 3. Add ChatComponent UI to scene

```tsx
import ReactEcs, {ReactEcsRenderer} from '@dcl/sdk/react-ecs'
import ChatComponent from "./chat.ui";

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
    <ChatComponent/>
)

```
