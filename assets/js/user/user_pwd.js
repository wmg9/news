$(function() {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
   samePwd:function(value) {
    if(value ===$('[name=oldPwd]').val()){
      return "新旧密码不能一样"
    }
   },
    Repwd:function(value) {
        let pwd = $('.layui-form [name=newPwd]').val()
        if(pwd !== value){
          return'两次密码不一致'
        }
      }    
  })  
  $('.layui-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function (res) {
        if(res.status !==0){
          return layer.msg('更新密码失败')
        }
        layer.msg('更新密码成功')
        $('layui-form')[0].reset()
      }
    })
  })
})
