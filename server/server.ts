import express, { Request } from 'express';
import expressWs, { Application } from 'express-ws';

import { Player } from './player';
import { Message, expectMessage } from '../shared/protocol';

export class Server
{
    private _express: Application;
    private _players: Set<Player>;

    /* Creates a new server on the given port */
    public constructor()
    {
        this._express = expressWs(express()).app;
        this._players = new Set();

        // Serve the game session on the '/session' route
        this._express.ws('/session', this.handleSessionRoute.bind(this));

        // Serve static content from the 'static' directory on the default route
        this._express.use('/', express.static('static'));
    }

    /* Starts serving on the given port */
    public start(port: string | number)
    {
        this._express.listen(port);
    }

    /* Handles a new WebSocket connection on the '/session' route */
    private handleSessionRoute(socket: WebSocket, _request: Request)
    {
        // The client's player object (or null if it lacks one)
        let clientPlayer: Player | null = null;

        // Bind the client's message event
        socket.onmessage = (event) =>
        {
            try
            {
                // Parse the message
                const message = expectMessage(JSON.parse(event.data as string));

                if (clientPlayer !== null)
                {
                    // Explicitly check if the message is another 'join_request'
                    if (message.type === 'join_request')
                        throw new Error('Joined player attempted to send join message');

                    // Let the client's player object handle the message
                    clientPlayer.handleMessage(message);
                }
                else
                {
                    // The only valid message for a playerless client is 'join_request'
                    if (message.type !== 'join_request')
                        throw new Error('Un-joined player attempted to send non-join message');

                    // Create a player and add it to the list of players
                    clientPlayer = new Player(socket);
                    this._players.add(clientPlayer);

                    // Send a reply message
                    let reply: Message = {
                        type: 'join_response',
                        data: { success: true },
                        sequence: message.sequence
                    };
                    socket.send(JSON.stringify(reply));
                }
            }
            catch (error)
            {
                // Log the error for debugging
                console.log('** Exception in client message handler **');
                console.log(error);
                console.log('--------------------------------------------------------------------------------');

                // Destroy the client's player object and drop the client
                if (clientPlayer !== null)
                    this._players.delete(clientPlayer);
                socket.close();
            }
        };
    }

    /* The set of currently joined players */
    public get players() { return this._players; }
}
