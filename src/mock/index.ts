import { Ticket,TicketType} from "../__type__";

export function apiTickets(): Promise<Ticket[]> {
  const tickets: Ticket[] = [
    {
      type: TicketType.Long,
      desc: "可获得PPT等资料",
      price: 9.99,
      quantity: 100
    },
    {
      type: TicketType.Sponsor,
      desc: "获得品牌漏出机会,详情联系123456789",
      price: 9.99,
      quantity: 5
    },
    {
      type: TicketType.Base,
      desc: "可获得活动现场参加活动的机会",
      price: 0.99,
      quantity: 100
    }
  ]
  return Promise.resolve(tickets)
}