export interface Champion {
  name: string;
  image: {
    full: string;
  };
  stats: Record<string, number>;
  [key: string]: any;
}

