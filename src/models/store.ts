import { SimpsonsResponse } from '../apis';

export interface StoredSimpsons extends SimpsonsResponse {
  simpsons?: StoredSimpson[];
}

export interface StoredSimpson {
  avatar?: string;
  description?: string;
  id?: string;
  job?: string;
  name?: string;
  order: number;
}
