import {MessageBus} from "@dcl/sdk/message-bus";
import * as npc from "dcl-npc-toolkit";
import {Dialog} from "dcl-npc-toolkit";
import {openBubble} from "dcl-npc-toolkit/dist/bubble";
import {Quaternion, Vector3} from "@dcl/sdk/math";
import {AvatarAnchorPointType, AvatarAttach, engine, executeTask} from "@dcl/sdk/ecs";
import {getUserData} from "~system/UserIdentity";

export const sceneMessageBus = new MessageBus()

export interface UserMessage {
    type: string
    text: string
    userId: string
}

export let currentPlayerId: string
export function setupChat() {

    void executeTask(async () => {
        const user = await getUserData({})
        if (!user.data) return
        currentPlayerId = user.data?.userId
    })

    sceneMessageBus.on('sendChatMessage', (message: UserMessage) => {

        console.log("message received: " + JSON.stringify(message))

        const newE = attachSpeech(message.userId)

        let Message: Dialog[] = [
            {
                text: message.text,
                triggeredByNext: () => {
                    engine.removeEntity(newE)
                },
                isEndOfDialog: true
            }
        ]

        openBubble(newE, Message)
    })
}

function attachSpeech(userId: string) {

    let myNPC = npc.create(
        {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
            scale: Vector3.create(1, 1, 1)
        },
        {
            type: npc.NPCType.CUSTOM,
            textBubble: true,
            bubbleXOffset: .5,
            bubbleYOffset: -2.5,
            onlyExternalTrigger: true,
            onActivate: () => {
            }
        }
    )

    AvatarAttach.create(myNPC, {
        avatarId: userId,
        anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
    })
    return myNPC
}
