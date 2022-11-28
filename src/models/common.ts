import { SimpsonsResponse } from '../apis';

interface Common {
  simpsons?: SimpsonsResponse;
  loading: Readonly<object>;
  loadingCount: number;
  loadingText: string;
  requestCompleted: boolean;
}
export type CommonState = Readonly<Common>;
