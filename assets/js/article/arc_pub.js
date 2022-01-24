$(function(){
  let layer = layui.layer
  let form =layui.form
  getCate()
  initEditor()
   function getCate() {
     $.ajax({
       method:'GET',
       url:'/my/article/cates',
       success: function(res) {
         if(res.status !==0){
          return layer.msg('初始化文章分类失败')   
        }
        let Str = template('tpl-case',res)
        $('[name=cate_id]').html(Str)
        form.render()
       }
     })

   }
   var $image = $('#image')
     
   // 2. 裁剪选项
   var options = {
     aspectRatio: 400 / 280,
     preview: '.img-preview'
   }
   
   // 3. 初始化裁剪区域
   $image.cropper(options)
   $('#coverFile').on('click',function (){
      $('#files').click()
   })
   $('#files').on('change',function (e) {
     let files = e.target.files
     if(files.length === 0){
          return layer.msg('请选择图片')
        }
        //拿到用户选择文件转换为路径
        let file = e.target.files[0]
        let  newImgURL = URL.createObjectURL(file)
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)  
                  // 重新初始化裁剪区域
     })
     //定义文章发布状态
  let art_state ='已发布'
  $('#btn-save').on('click',function() {
    art_state ="草稿"
  })
  $('#form-pub').on('submit',function (e) {
    e.preventDefault();
    let fd = new FormData($(this)[0])
    fd.append('state',art_state)
    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       
    // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    publishArticle(fd)
    })
  })
  function publishArticle(fd) {
    $.ajax({
      method:'POST',
      url:'/my/article/add',
      data:fd,
      contentType:false,
      processData:false,
      success:function(res) {
        if(res.status !== 0){
          return layer.msg('发布失败')
        }
           layer.msg('发布成功')
           location.href='/article/arc_list.html'
      }
    })
  }
})
