/* Tile ID for empty tile */
export const TILE_ID_EMPTY = 0;

/* Tile ID for 'A' */
export const TILE_ID_ALPHA_FIRST = 1;

/* Tile ID for 'Z' */
export const TILE_ID_ALPHA_LAST = 26;

/* Tile ID for 'Ä' */
export const TILE_ID_AE = 27;

/* Tile ID for 'Ö' */
export const TILE_ID_OE = 28;

/* Tile ID for 'Ü' */
export const TILE_ID_UE = 29;

/* Tile ID for 'ß' */
export const TILE_ID_SS = 30;

/* First valid tile ID */
export const TILE_ID_FIRST = TILE_ID_EMPTY;

/* Last valid tile ID */
export const TILE_ID_LAST = TILE_ID_SS;

/* Code point for 'A' */
const ALPHA_FIRST = 65;

/* Code point for 'Z' */
const ALPHA_LAST = 90;

/* Adjustment value from A..Z code points to tile IDs */
const ALPHA_ADJUST = ALPHA_FIRST - TILE_ID_ALPHA_FIRST;

/* Various helper functions for handling tile IDs */
export class Tile
{
    /* Transforms the given string to uppercase with an extra rule for 'ß' */
    private static adjustCase(value: string): string
    {
        if (value === 'ß')
            return value;
        return value.toUpperCase();
    }

    /* Gets whether the given tile ID is an empty tile or not */
    public static isEmpty(tileID: number): boolean
    {
        return tileID == TILE_ID_EMPTY;
    }

    /* Gets whether the given tile ID is valid or not */
    public static isValid(tileID: number): boolean
    {
        return tileID >= TILE_ID_FIRST && tileID <= TILE_ID_LAST;
    }

    /* Converts the given text character to a tile ID */
    public static fromCharacter(textCharacter: string): number
    {
        // Check if the given string has at least a single character
        if (textCharacter.length < 1)
            throw new Error('Tile character string must not be zero-length');

        // Adjust case of the character
        textCharacter = Tile.adjustCase(textCharacter[0]);

        // Convert A..Z characters
        const codePoint = textCharacter.codePointAt(0);
        if (codePoint === undefined)
            throw new Error('Bad tile character string');
        if (codePoint >= ALPHA_FIRST && codePoint <= ALPHA_LAST)
            return codePoint - ALPHA_ADJUST;

        // Convert special / umlaut characters
        switch (textCharacter)
        {
            case 'Ä': return TILE_ID_AE;
            case 'Ö': return TILE_ID_OE;
            case 'Ü': return TILE_ID_UE;
            case 'ß': return TILE_ID_SS;
        }

        throw new Error('Unsupported character');
    }

    /* Converts the given tile ID to a text character */
    public static toCharacter(tileID: number): string
    {
        // Prevent empty tiles from being converted
        if (Tile.isEmpty(tileID))
            throw new Error('Tile ID must not be an empty tile');

        // Convert A..Z tiles
        if (tileID >= TILE_ID_ALPHA_FIRST && tileID <= TILE_ID_ALPHA_LAST)
            return String.fromCodePoint(tileID + ALPHA_ADJUST);

        // Convert special / umlaut tiles
        switch (tileID)
        {
            case TILE_ID_AE: return 'Ä';
            case TILE_ID_OE: return 'Ö';
            case TILE_ID_UE: return 'Ü';
            case TILE_ID_SS: return 'ß';
        }

        throw new Error('Invalid tile ID');
    }
}
