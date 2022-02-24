import { defineAsyncComponent,computed,ref,Ref} from 'vue';
import { apiTickets } from "../../mock/index"
import Trick from "../trick/index.vue"
import Buyer from "../buyer/index.vue"
import Participant from "../participant/index.vue"
import {ElButton} from 'element-plus'
import { useStore } from '../../store/index';
const Main = defineAsyncComponent(async () => {
  const tickets = await apiTickets()
  const store = useStore()
  const countAndPrice = computed(() => {
    const ticketOrders = store.ticketOrders
    let count = 0
    let price = 0
    ticketOrders.forEach(item => {
      count += item.count
      price += (item.count * item.price)
    })
    return {
      count,
      price
    }
  })

  let buyerRef = ref<InstanceType<typeof Buyer>>()
  let participant =  ref<InstanceType<typeof Participant>>()
  function subimit(){
    let flag = false
    flag = buyerRef.value.validate()
    flag = participant.value.validate()
    if(flag){
       // 要提交的数据
       const {ticketOrders,buyer} = store
       console.log("提交的数据",ticketOrders,buyer)
       // fetch(api)
    }
  }
  return () => (
    <div>
      <p class="title">选择票种</p>
      {tickets.map(ticket => <Trick ticket={ticket}></Trick>)}
      <p class="title">购票人信息</p>
      <Buyer ref={buyerRef}/>
      <Participant ref={participant} style="margin-bottom:20px;" />
      <div class="footer">
        <div class="footer-left">
          <p>共张 <span class="number">{countAndPrice.value.count} </span> 张票</p>
          <p>合计 <span class="number">{countAndPrice.value.price.toFixed(2)}</span> 元</p>
        </div>
        <div class="footer-right">
          <ElButton onClick={e => subimit()} type="primary" size="large" style="flex:1;" disabled={countAndPrice.value.count === 0}>立即支付</ElButton>
        </div>
      </div>
    </div>
  )
})
export default Main
