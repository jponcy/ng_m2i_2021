export enum ActionType {
  FOLLOW = 'follow', SHARE = 'share', BUY = 'buy'
}

export interface GameFilter {
  name: string;
  type: string;
  editor: string;
}
