$(function () {
  let layer = layui.layer 
  let form = layui.form
  getArccate()

  function getArccate(){
 $.ajax({
   method:'GET',
   url:"/my/article/cates",
   success:function(res){ 
     if(res.status !==0){
       return layer.msg('获取失败')
     }  
    let htmlStr = template('tpl-table',res)
    $('tbody').html(htmlStr)
    }
  })  
 }
 let indexAdd =null
 $('#addCate').on('click',function(){
  indexAdd = layer.open({
    type:1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#tpl-dialogAdd').html()
  });   
 })
  $('body').on('submit','#form-add',function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:"/my/article/addcates",
      data:$(this).serialize(),
      success:function(res) {
        // console.log(res);
        if(res.status !==0){
          return layer.msg('添加失败')
        }
        getArccate()
        layer.msg('添加成功')
        layer.close(indexAdd)
      }
    })
  })
let indexEdit = null
   $('tbody').on('click','#btn-edit',function(){
    indexEdit = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#tpl-dialogEdit').html(),
    });
    let id = $(this).attr("data-id")
    // console.log(id);
    $.ajax({
      method:"GET",
      url:'/my/article/cates/'+id,
      success:function(res) {
        form.val('form-edit',res.data)
      }
   })
   })
   $('body').on('submit','#form-edit',function(e) {
     e.preventDefault()
     $.ajax({
       method:'POST',
       url:'/my/article/updatecate',
       data:$(this).serialize(),
       success:function (res) {
        //  console.log(res);
         if(res.status !== 0){
           return layer.msg('更新分类数据失败')
         }
       
         layer.msg('更新分类数据成功')
         layer.close(indexEdit)
         getArccate()
       }
     })
   })
   $('tbody').on('click','#btn-rem',function() {
     let Id = $(this).attr('data-id')
       layer.confirm('是否要删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method:'GET',
        url:'/my/article/deletecate/'+Id,
        success:function(res) {
          if(res.status !==0){
            return layer.msg('删除失败')
          }
          layer.msg('删除成功')
          getArccate()
        }
      })
      layer.close(index);
    });
   })
})
