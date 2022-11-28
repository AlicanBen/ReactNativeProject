export interface SimpsonsResponse {
  simpsons?: Simpson[];
}

export interface Simpson {
  avatar?: string;
  description?: string;
  id?: string;
  job?: string;
  name?: string;
}
