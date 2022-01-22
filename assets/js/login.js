$(function(){
  $('#link_res').on('click',function(){
    // e.preventDefault();
    $(".login-box").hide()
    $(".res-box").show()
  })
  $('#link_login').on('click',function(){
    // e.preventDefault();
    $(".res-box").hide()
    $(".login-box").show()
  })
  let form = layui.form 
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
      repwd:function(value) {
        let pwd = $('.res-box [name=pasword]').val()
        if(pwd !== value){
          return'两次密码不一致'
        }
      }    
  })  
  //监听注册表单的注册
  $('#form-res').on('submit',function (e){
      e.preventDefault();
      let data={username:$('#form-res [name=username]').val(),password:$('#form-res [name=password]').val()}
      $.post('/api/reguser',data,function(res){
      if(res.status!==0){
      return layer.msg(res.message);
      }
      layer.msg('注册成功请登录');
      //模拟人点击行为
      $('#link_login').click()
    })
    //监听登陆表单
    
  })
  $('#form-login').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function (res) {
      if(res.status!== 0 ){
        return layer.msg(res.message);
       }
       layer.msg('登陆成功')
       localStorage.setItem('token',res.token)
       setInterval(() => {
        location.href='/index.html'     
       }, 200);
       
      }
    })
  })
})
