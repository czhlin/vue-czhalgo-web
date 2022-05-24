import { fabric } from 'fabric'
import {deepClone} from "@/utils/deepClone"
class Arrow {
    constructor(data){
        this.init(data)
    }
    computeArrowLocation(points){
        const [p1,p2]=points.slice(-2)
        let yk=p2.y-p1.y
        let xk=p2.x-p1.x
        let angle=Math.atan2(yk,xk)/Math.PI*180+90
        return {
            top:p2.y,
            left:p2.x,
            angle
        }
    }
    init(data){
        const {x,y,points=[],op}=data
        console.log(op,8);
        if(points.length<2){
            return
        }
        const polyline=new fabric.Polyline(points,{
            stroke:'black',
            fill: 'transparent',
            objectCaching:false,
            strokeWidth:0.5
        })
        const location=this.computeArrowLocation(points)
        const triangle= new fabric.Triangle({
            ...location,
            fill: 'black',
            objectCaching:false,
            width: 2,
            height: 3,
            originX: 'center',
            originY: 'center',
        })
        //将fabric对象挂载到this.ref
        this.ref = new fabric.Group([polyline,triangle], {
            y,
            x,
            originX: "center",
            originY:  "center"
        })
    }
    setPoints(newPoints){
        const newLocation=this.computeArrowLocation(newPoints)
        const polyline=this.ref.item(0)
        const triangle=this.ref.item(1)
        polyline.set({
            points:newPoints
        })
        triangle.set({
            angle:newLocation.angle,
            left:newLocation.left-this.ref.left,
            top:newLocation.top-this.ref.top
        })
    }
}
export default Arrow