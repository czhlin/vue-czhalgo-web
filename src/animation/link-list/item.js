import { fabric } from 'fabric'
const CONFIG={
    Line2:{
        width:5
    }
}
class Item {
    static CONFIG=CONFIG
    constructor(data){
        this.init(data)
    }
    set({x,y,text,color="red"}){
        this.ref.set({x,y})
        const Line=this.ref.item(0)
        const Text=this.ref.item(2)
        Line.set({fill:color})
        Text.set({text})
    }
    init(data){
        const {width,height,color,text,x,y}=data
        this.data=data
        const Line = new fabric.Rect({
            width,
            height,
            fill: color,
            originX: 'center',
            originY: 'center'
        })
        const Line2 = new fabric.Rect({
            width:CONFIG.Line2.width,
            height,
            left:(width+CONFIG.Line2.width)/2,
            top: 0,
            fill:'gray',
            originX: 'center',
            originY: 'center',
        })
        const Text = new fabric.Text(
            text,
            {
              fontSize: 10,
              left: 0,
              top: 0,
              originX: 'center',
              originY: 'center'
            }
        )
        const Text2 = new fabric.Text(
            "^",
            {
              fontSize: 10,
              left: (width+CONFIG.Line2.width)/2,
              top: 0,
              originX: 'center',
              originY: 'center'
            }
        )
        //将fabric对象挂载到this.ref
        this.ref = new fabric.Group([Line,Line2, Text,Text2], {
            top: y,
            left: x,
            originX: 'center',
            originY: 'center'
        })
    }
}
export default Item