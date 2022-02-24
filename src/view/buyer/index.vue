<template>
  <div class="buyer">
    <ElForm ref="buyerRef" :model="buyer" :rules="rules" :statusIcon="true">
      <ElFormItem prop="phone" style="margin:0;">
        <p>手机号</p>
        <ElInput v-model="buyer.phone" class="input" placeholder="请输入您的手机号,将用于接收短信" />
      </ElFormItem>
      <ElFormItem prop="mail" style="margin:0;">
        <p>电子邮箱</p>
        <ElInput v-model="buyer.mail" class="input" placeholder="请输入您的电子邮箱,将用于接收出票邮件" />
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput } from "element-plus"
import { reactive, watch,ref, onMounted} from "vue"
import { BaseCustomer } from "../../__type__"
import { useStore } from "../../store/index"
import { valPhone,valMail } from "../../utils/index"
const validatorPhone = (rule: object, value: string, callback: any) => {
  valPhone(value) ? callback() : callback(new Error('手机号格式错误'))
}
const validatorMail = (rule: object, value: string, callback: any) => {
  valMail(value) ? callback() : callback(new Error('邮箱格式错误'))
}
const rules = reactive({
  phone: [
    { required: true, trigger: 'change', message: "手机号是必须的" },
    { validator: validatorPhone, trigger: "blur" }
  ],
  mail: [
    { required: true, trigger: 'change', message: "邮箱是必须的" },
    { validator: validatorMail, trigger: "blur" }
  ]
})
const buyer = reactive<BaseCustomer>({ phone: '', mail: '' })
const store = useStore()
watch(buyer, n => {
  valMail(buyer.mail) && valPhone(buyer.phone) && store.setBuyer(n)
})

const buyerRef = ref()
function validate(){
  let result = false
  buyerRef.value.validate((v:boolean) => result = v )
  return result
}
defineExpose({
  validate
})
</script>