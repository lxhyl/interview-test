export enum Gender{
  Male = '男',
  Female = '女',
  Other = '其他',
  Unknow = '不愿透露',
}

export enum TicketType{
  Long = '远程支持', 
  Sponsor = '赞助商', 
  Base = '标准'
}

// 返回的票据信息
export interface Ticket{
  type:TicketType,
  desc:string,
  price:number
  quantity:number,
}


export interface BaseCustomer{
  phone:string,
  mail:string
}

export interface Participant{
  name:string,
  code:number | string,
  gender?:Gender
}


export interface TicketOrder{
  type:TicketType,
  price:number,
  count:number,
  buyer?:Participant[]
}


export interface Order{
  buyer:BaseCustomer,
  tricks:{
    type:TicketOrder,
    price:number,
  } & Participant,
  totalPrice:number
} 