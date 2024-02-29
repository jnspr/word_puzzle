import { Message } from "../shared/protocol";

export class Player
{
    private _socket: WebSocket;

    /* Constructs a new player */
    public constructor(socket: WebSocket)
    {
        this._socket = socket;
    }

    /* Handles a message from the player's client */
    public handleMessage(message: Message): void
    {
        // FIXME: Not implemented
    }
}
