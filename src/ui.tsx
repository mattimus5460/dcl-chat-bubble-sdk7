import ReactEcs, {ReactEcsRenderer} from '@dcl/sdk/react-ecs'
import ChatComponent from "./chat.ui";

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
    <ChatComponent/>
)
