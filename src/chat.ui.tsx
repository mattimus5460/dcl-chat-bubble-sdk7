import {Color4} from '@dcl/sdk/math'
import ReactEcs, {Button, Label, UiEntity} from '@dcl/sdk/react-ecs'
import {currentPlayerId, sceneMessageBus} from "./chat";
import *  as  ui from 'dcl-ui-toolkit'

let isChatMenuVisible: boolean = false

function toggleChatMenuVisibility() {
    isChatMenuVisible = !isChatMenuVisible
}

let curTextValue = ''

const promptTextBox = new ui.CustomPrompt({})
    .addTextBox({
        placeholder: 'Enter text',
        xPosition: 35,
        yPosition: -145,
        onChange: (value: string) => {
            curTextValue = value
        },
    })

const ChatComponent = () => (
    <UiEntity
        uiTransform={{
            width: 400,
            maxHeight: 290,
            positionType: 'absolute',
            position: {top: 20, right: 150},
            padding: 4,
        }}
    >
        <UiEntity
            uiTransform={{
                width: 160,
                height: 90,
                positionType: 'absolute',
                position: {top: 308, right: -100},
                padding: 4,
            }}
            uiBackground={{
                color: Color4.create(0.1, 0.1, 0.1, 0.6),
            }}
            onMouseDown={() => toggleChatMenuVisibility()}
        >
        </UiEntity>
        <Label
            onMouseDown={() => {
                toggleChatMenuVisibility()
            }}
            value={`Chat`}
            fontSize={50}
            font={'serif'}
            color={Color4.Black()}
            uiTransform={{
                width: 160,
                height: 90,
                positionType: 'absolute',
                position: {top: 306, right: -101},
                padding: 4,
            }}
        />
        <Label
            onMouseDown={() => {
                toggleChatMenuVisibility()
            }}
            value={`Chat`}
            fontSize={48}
            font={'serif'}
            color={Color4.White()}
            uiTransform={{
                width: 160,
                height: 90,
                positionType: 'absolute',
                position: {top: 305, right: -100},
                padding: 4,
            }}
        />
        <ChatInputComponent/>
    </UiEntity>
)

const ChatInputComponent = () => (
    <UiEntity
        uiTransform={{
            width: 400,
            height: 160,
            positionType: 'absolute',
            position: {top: 304, right: 80},
            padding: 4,
            display: isChatMenuVisible ? 'flex' : 'none',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
        }}
        uiBackground={{
            color: Color4.create(0.1, 0.1, 0.1, 0.6),
        }}
    >
        <UiEntity
            uiTransform={{width: 350, height: 60, margin: {left: 20, bottom: 20}, padding: {bottom: 4}}}
            uiBackground={{color: Color4.create(1, 1, 1, 0.8)}}>
            {promptTextBox.render()}
        </UiEntity>

        <Button
            uiTransform={{width: 200, height: 40, margin: {left: 80}, padding: 4}}
            value='Send Message'
            variant='primary'
            fontSize={14}
            onMouseDown={() => {
                sceneMessageBus.emit('sendChatMessage', {
                    text: curTextValue,
                    type: 'text',
                    userId: currentPlayerId,
                })
            }}
        />
    </UiEntity>
)

export default ChatComponent