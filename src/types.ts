export type Gesture='none'|'open'|'fist'|'pinch'|'point'|'victory'|'swipeLeft'|'swipeRight'|'swipeUp'|'swipeDown';
export type HandData={tracked:boolean;x:number;y:number;depth:number;rotation:number;gesture:Gesture;confidence:number;handedness?:'Left'|'Right';landmarks?:{x:number;y:number;z:number}[]};
export const EMPTY_HAND:HandData={tracked:false,x:0,y:0,depth:0,rotation:0,gesture:'none',confidence:0};

