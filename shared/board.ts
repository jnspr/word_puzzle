import { TILE_ID_EMPTY, Tile } from "./tile";

export class Board
{
    private _data: number[];
    private _width: number;
    private _height: number;

    /* Constructs a board of the given dimensions */
    public constructor(width: number, height: number)
    {
        this._width = width;
        this._height = height;

        // Initialize the board to be empty
        this._data = new Array(width * height);
        this._data.fill(TILE_ID_EMPTY);
    }

    /* Gets the given position's tile ID */
    public getTile(x: number, y: number): number
    {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return 0;
        return this._data[y * this._width + x];
    }

    /* Sets the given position's tile ID */
    public setTile(x: number, y: number, tileID: number): void
    {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return;
        if (!Tile.isValid(tileID))
            throw new Error('Tile ID must be valid');
        this._data[y * this._width + x] = tileID;
    }

    /* The board's width */
    public get width() { return this._width; }

    /* The board's height */
    public get height() { return this._height; }
}
