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
  `//单链表创建
  void Create(int* nums){
  
      Node* temp = head;
      int b = sizeof(arr) / sizeof(arr[0]) - 1;
      for (int i = 0; i < b; i++) {
          Node newNode=(Node*)malloc(sizeof(Node));//创建新的结点
          newNode->data=i;//设置数据域
          newNode->next=null;
          temp->next=newNode;
      }
  
  }`,
  `//单链表创建
  void Create(int* nums){
  
      Node* temp = head;
      int b = sizeof(arr) / sizeof(arr[0]) - 1;
      for (int i = 0; i < b; i++) {
          Node newNode=(Node*)malloc(sizeof(Node));//创建新的结点
          newNode->data=i;//设置数据域
          newNode->next=null;
          temp->next=newNode;
      }
  
  }`,
  `//单链表创建
  void Create(int* nums){
  
      Node* temp = head;
      int b = sizeof(arr) / sizeof(arr[0]) - 1;
      for (int i = 0; i < b; i++) {
          Node newNode=(Node*)malloc(sizeof(Node));//创建新的结点
          newNode->data=i;//设置数据域
          newNode->next=null;
          temp->next=newNode;
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
