export function valPhone(phone:string|number){
  phone = phone.toString()
  const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
  return reg.test(phone)
}
export function valMail(mail:string){
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(mail)
}

export function valName(name:string){
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  return reg.test(name)
}
export function valCode(code:string|number){
  code = code.toString()
  const reg  =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return reg.test(code)
}