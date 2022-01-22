$(function() {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    username:function (value){
      if(value.length>6){
        return'用户名最长1-6字符'
      }
    }
  })
  initUserinfo() 

  function initUserinfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res) {
        if(res.status !==0){
          return layer.msg('获取用户信息失败')
        }
        // console.log(res);
        form.val('formuserinfo',res.data)
      }
    })
  }
  $('#btnReset').on('click',function(e) {
    e.preventDefault()
    initUserinfo() 
  })
  $('.layui-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success:function (res) {
        if(res.status !==0){
          return layer.msg('更新用户信息失败')
        }
        layer.msg('获取用户信息成功!')
        window.parent.getuserinfo()
      }
    })
  })
})
