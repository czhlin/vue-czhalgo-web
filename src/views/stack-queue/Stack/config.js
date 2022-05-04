/*
 * @Date: 2021-11-23 20:59:50
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 20:32:06
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\InsertSort\config.js
 */
// codeMirror 配置
const option = {
  readOnly: true
}
// 
const title = [
  '输入排序数据',
  '演示操作'
]
// 面包屑
const levelList = [
  {
    name: '演示'
  }
]
const display = {
  add: false,
  edit: false,
  addFooter:true,
  editFooter:true
}
// 代码数据
const codeDataList = [
  `//插入排序
    private void sortBubble(int* a,int len)
    {
        int i,j,temp;
        for(i=0;i<len;i++)
        {
            for(j=0;j<len-i-1;j++)
            {
               if(a[j]>a[j+1]){
                   temp=a[j];
                   a[j]=a[j+1];
                   a[j+1]=temp;
               }
            }
        }
    }`,
  `//插入排序
    private void sortBubble(vector<int>& a)
    {
        int i,j,temp,len=a.size();
        for(i=0;i<len;i++)
        {
            for(j=0;j<len-i-1;j++)
            {
               if(a[j]>a[j+1]){
                   temp=a[j];
                   a[j]=a[j+1];
                   a[j+1]=temp;
               }
            }
        }
    }`,
  `//插入排序
    private void sortBubble(int[] a)
    {
        int i,j,temp,len=a.length;
        for(i=0;i<len;i++)
        {
            for(j=0;j<len-i-1;j++)
            {
               if(a[j]>a[j+1]){
                   temp=a[j];
                   a[j]=a[j+1];
                   a[j+1]=temp;
               }
            }
        }
    }`
]
export default {
  option,
  title,
  levelList,
  display,
  codeDataList
}
