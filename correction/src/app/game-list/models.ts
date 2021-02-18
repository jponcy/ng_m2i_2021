export enum ActionType {
  FOLLOW = 'follow', SHARE = 'share', BUY = 'buy'
}

export interface GameFilter {
  name: string;
  type: number;
  editor: string;
}

interface GameBase {
  id: number;

  /** Note sur 10. */
  note: number;

  description: string;

  /** URL of the cover image; */
  coverImage: string;

  editor: string;
}

export interface Game extends GameBase {
  name: string;

  categories: GameCategory[];
}

export interface GameList extends GameBase {
  name: string;

  /** IDs of game categories. */
  genres: number[];
}

export interface GameDto extends GameBase {
  /** The product' name. */
  title: string;

  /** IDs of game categories. */
  genres: number[];

  // TODO: Manage publisher.
  // TODO: Manage dev.
}

export interface GameCategory {
  id: number;
  name: string;
}
