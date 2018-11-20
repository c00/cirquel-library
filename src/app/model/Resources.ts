export class Images {
    static DEFAULT_AVATAR = 'blank_avatar';
    static DEFAULT_IMAGE = 'sad-face'
}

export interface BaseResource {
    id?: number;
    date?: number;
    type: string;
    link?: string;
}

export interface PhotoResource {
    id: number;
    date: number;
    type: string;
    imgBase: string;
    extension: string;
}

export interface VideoResource {
    id?: number;
    date?: number;
    type: string;
    dashUri: string;
    hlsUri: string;
    imgBase: string;
}