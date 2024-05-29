export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface ITrackTop {
    id: number;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    uploaderId: number;
    user: {
      id: number;
      email: string;
      name: string;
      password: string;
      address: string;
      role: string;
    };
  }

  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    // statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IShareTrack extends ITrackTop {
    isPlaying: boolean;
  }

  interface ITrackContext {
    currentTrack: IShareTrack;
    setCurrentTrack: (v: IShareTrack) => void;
  }
}
