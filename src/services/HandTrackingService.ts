import {FilesetResolver,HandLandmarker} from '@mediapipe/tasks-vision';
import {GestureRecognitionService} from './GestureRecognitionService';
import type {HandData} from '../types';
export class HandTrackingService{
 private landmarker?:HandLandmarker; private gestures={Left:new GestureRecognitionService(),Right:new GestureRecognitionService()}; private last=0; private raf=0;
 async init(){const vision=await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');this.landmarker=await HandLandmarker.createFromOptions(vision,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',delegate:'GPU'},runningMode:'VIDEO',numHands:2,minHandDetectionConfidence:.55,minTrackingConfidence:.5});}
 start(video:HTMLVideoElement,onData:(hands:HandData[])=>void){const tick=()=>{if(this.landmarker&&video.readyState>=2&&video.currentTime!==this.last){this.last=video.currentTime;const r=this.landmarker.detectForVideo(video,performance.now());const hands=r.landmarks.map((l,i)=>{const palm=l[9],openness=[8,12,16,20].reduce((sum,n)=>sum+Math.hypot(l[n].x-l[0].x,l[n].y-l[0].y),0)/4;const handedness=(r.handedness[i]?.[0]?.categoryName||'Left') as 'Left'|'Right';return {tracked:true,x:(.5-palm.x)*2,y:(.5-palm.y)*2,depth:Math.min(1,Math.max(-1,(openness-.25)*4)),rotation:Math.atan2(l[5].y-l[17].y,l[5].x-l[17].x),gesture:this.gestures[handedness].recognize(l),confidence:r.handedness[i]?.[0]?.score||.8,handedness,landmarks:l} as HandData});onData(hands);}this.raf=requestAnimationFrame(tick)};tick()} stop(){cancelAnimationFrame(this.raf);this.landmarker?.close();}
}

