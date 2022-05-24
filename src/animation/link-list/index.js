import Item from "./item"
import Arrow from './arrow'
import { Anima } from '@/animation/utils'//定义动画类
// 动画修改
const mutations = {
    
}
// 动画行为
const action = {
    
}
// 整体配置
const CONFIG={
    // 一行长度
    rowLength:5,
    // 水平间距
    xSpace:40,
    // 垂直间距
    ySpace:30,
    // 每个节点的宽度
    width:20,
    // 每个节点的高度
    height:10
}
class LinkList extends Anima {
    // 修改数据
    mutations=mutations
    // 行为
    static action=action
    // 配置
    static CONFIG=CONFIG
    constructor(data, option) {
      super()
      this.option = option
      this.init(data)
    }
    setTarget(x,y,text="target",color="red"){
    const {width,height}=CONFIG
      const {Line2:{width:ItemLin2Width}}=Item.CONFIG
      const xSpace=width+ItemLin2Width+CONFIG.xSpace
      this.targetNode.set({
            color,text,
            x: x * xSpace+ItemLin2Width/2+xSpace/2,
            y: -height*5/4+y*height*4
      })
    }
    init(data = [], option = this.option) {
      this.arrowArr=[]
      let preItem=null
      const {width,height,rowLength}=CONFIG
      const {Line2:{width:ItemLin2Width}}=Item.CONFIG
      const xSpace=width+ItemLin2Width+CONFIG.xSpace
      const ySpace=height+CONFIG.ySpace
      const topNode={color:'green',text:"Top"}
      const targetNode= new Item({ 
        color:"red",text:"B",width,height,
        x: 3 * xSpace+ItemLin2Width/4+xSpace/2,
        y: -height*5/4+0*height*4
    })
      this.topNode=topNode
      this.targetNode=targetNode
      data.unshift(topNode)
      this.itemArr = data.map(//将数据数组映射成Item数组
        (item, i) => {
            const {color='red',text='A'}=item
            let x=i%rowLength
            let y=i/rowLength|0
            const itemObj=new Item({
                color,text,width,height,
                x: x * xSpace,
                y: y * ySpace
            })
            if(preItem){
                const prePoints={x:preItem.data.x+width/2,y:preItem.data.y}
                const points=[]
                if(i%rowLength===0){
                    points.push(
                        prePoints,
                        {x:prePoints.x+2*ItemLin2Width,y:prePoints.y},
                        {x:prePoints.x+2*ItemLin2Width,y:prePoints.y+ySpace/2},
                        {x:-width-ItemLin2Width/2,y:prePoints.y+ySpace/2},
                        {x:-width-ItemLin2Width/2,y:prePoints.y+ySpace},
                        {x:x*xSpace-(width+ItemLin2Width)/2,y:y*ySpace}
                    )
                }else{
                    points.push(prePoints,{x:x*xSpace-(width+ItemLin2Width)/2,y:y*ySpace})
                }
                this.arrowArr.push(new Arrow(
                    {
                        x:prePoints.x,
                        y:prePoints.y,
                        points,
                        op:option.op
                    }
                ))
            }
            preItem=itemObj
            return itemObj
        }
      )
      this.itemArr.push(targetNode)
      //将组合fabric对象挂载到ref上
      this.ref = new fabric.Group(
        [
            ...this.itemArr.map(item => item.ref),
            ...this.arrowArr.map(item => item.ref)
        ], option)
        this.setTarget(0,1,"C","yellow")
    }
}

export default LinkList