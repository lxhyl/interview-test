<template>
  <div>
    <div v-for="(value) in ticketOrders" :key="value[0]">
      <div v-for="(item, index) in value[1].buyer" >
        <p class="title">参与者信息 (“{{ value[1].type }}”票第 {{ index + 1 }} 位)</p>
        <div class="participant">
          <ElForm :model="item" :ref="setItemRef" :rules="rules" :statusIcon="true" class="buyer">
            <ElFormItem prop="name" style="margin:0;">
              <p>真实姓名</p>
              <ElInput v-model="item.name" class="input" placeholder="请输入您的真实姓名" />
            </ElFormItem>
            <ElFormItem prop="code" style="margin:0;">
              <p>身份证号</p>
              <ElInput v-model="item.code" class="input" placeholder="由于现场安保,请输入您的身份证号" />
            </ElFormItem>
            <ElFormItem prop="gender">
              <p style="width: 100%;">性别</p>
              <ElRadioGroup v-model="item.gender">
                <ElRadio v-for="gender in Gender" :label="gender">
                  <span>{{ gender }}</span>
                </ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadio } from "element-plus"
import { Gender } from "../../__type__";
import { useStore } from "../../store/index"
import { valName, valCode } from "../../utils";
import { defineExpose } from "vue";
const store = useStore()
const { ticketOrders } = store


const validatorName = (rule: object, value: string, callback: any) => {

  valName(value) ? callback() : callback(new Error('请输入正确的姓名'))
}
const validatorCode = (rule: object, value: string, callback: any) => {
  valCode(value) ? callback() : callback(new Error('请输入正确的身份证号'))
}
const rules = {
  name: [{ required: true, trigger: 'change', message: "姓名是必须的" },
  { validator: validatorName, trigger: "blur" }
  ],
  code: [{ required: true, trigger: 'change', message: "身份证号是必须的" },
  { validator: validatorCode, trigger: "blur" }
  ],
  gender: [{ required: true, trigger: 'change', message: "请选择性别" }]
}

let refs:any[] = []
const setItemRef = (el:any) => {
   if(el) refs.push(el)
}
function validate(){
   let result = false
   for(let i =0;i < refs.length;i++){
     refs[i].validate((v:boolean) => result = v)
   }
   return result
}
defineExpose({
  validate
})
</script>