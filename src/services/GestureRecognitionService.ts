import type {Gesture} from '../types';
type P={x:number;y:number;z:number};
const dist=(a:P,b:P)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
export class GestureRecognitionService{
 private candidate:Gesture='none'; private frames=0; private stable:Gesture='none'; private lastPalm?:P; private lastAt=0; private cooldown=0;
 recognize(l:P[]):Gesture{
  const palm=Math.max(.06,dist(l[0],l[9]));
  const extended=(tip:number,pip:number)=>dist(l[tip],l[0])>dist(l[pip],l[0])*1.13;
  const fingers=[extended(8,6),extended(12,10),extended(16,14),extended(20,18)];
  const pinch=dist(l[4],l[8])/palm<.38;
  let raw:Gesture=pinch?'pinch':fingers.every(Boolean)?'open':fingers.every(v=>!v)?'fist':fingers[0]&&!fingers[1]&&!fingers[2]&&!fingers[3]?'point':fingers[0]&&fingers[1]&&!fingers[2]&&!fingers[3]?'victory':'none'; const now=performance.now(),p=l[9];if(this.lastPalm&&now-this.lastAt<120&&now>this.cooldown){const dx=p.x-this.lastPalm.x,dy=p.y-this.lastPalm.y;if(Math.abs(dx)>.075&&Math.abs(dx)>Math.abs(dy)*1.4){raw=dx>0?'swipeLeft':'swipeRight';this.cooldown=now+900}else if(Math.abs(dy)>.075){raw=dy<0?'swipeUp':'swipeDown';this.cooldown=now+900}}this.lastPalm={...p};this.lastAt=now;
  if(raw.startsWith('swipe'))return raw;
  if(raw===this.candidate)this.frames++;else{this.candidate=raw;this.frames=0} if(this.frames>3)this.stable=raw;
  return this.stable;
 }
}
