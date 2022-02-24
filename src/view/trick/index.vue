<template>
  <div class="ticket">
    <div class="ticket-left">
      <p class="ticket-left-type">{{ ticket.type }}</p>
      <ElTooltip :content="ticket.desc"  placement="top">
      <p class="ticket-left-des">{{ ticket.desc }}</p>
      </ElTooltip>
      <p class="ticket-left-price">
        {{ ticket.price }} 元
        <span class="ticket-left-quantity" v-if="ticket.quantity < 10">仅剩 {{ ticket.quantity }} 张</span>
      </p>
    </div>
    <div class="ticket-right">
      <div>
        <ElInputNumber v-model="ticketCount" :step="1" :min="0" :max="ticket.quantity" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { ElInputNumber,ElTooltip } from "element-plus"
import { Ticket } from "../../__type__"
import { useStore } from "../../store/index"
const props = defineProps<{ ticket: Ticket }>()
const store = useStore()
const { ticket } = props
const ticketCount = ref(0)
watch(ticketCount, (count,preCount) => {
  // 添加
  if(count > preCount){
    store.addTicketOrder({type:ticket.type,price:ticket.price,count:count})
  }else{
    store.removeTicket(ticket.type)
  }
})
</script>
