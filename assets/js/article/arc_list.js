$(function() {
   let layer = layui.layer
   let form = layui.form
    var laypage = layui.laypage;
   let q = {
    pagenum:1,//默认显示第一页
    pagesize:5,//默认每页显示5条
    cate_id:'',
    state:''
    }
    
   function pushzero(n) {
     return n > 9?n:'0'+n;
   }
    template.defaults.imports.dataFormat=function(data) {
      const dt = new Date(data)
      let y  =dt.getFullYear()
      let m = pushzero(dt.getMonth()+1)
      let d = pushzero(dt.getDate())
      let hh = pushzero(dt.getHours())
      let mm= pushzero(dt.getMinutes())
      let ss =pushzero( dt.getSeconds())
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
   }
    gettable()
    getarcListCase()
    //获取文章数据
    function gettable() {
    $.ajax({
    method:"GET",
    url:'/my/article/list',
    data:q,
    success:function(res){
      if(res.status !== 0){
        return layer.msg('获取文章列表失败')
      }
      let Htmlstr = template('tpl-table',res)
      $('tbody').html( Htmlstr)
      //调用渲染分页
       renderPage(res.total)
      }
    })
   }
    
  function getarcListCase() {
    $.ajax({
      method:'GET',
      url:'/my/article/cates',
      success:function(res) {
        // console.log(res);
        if(res.status !==0){
          return layer.msg('获取分类失败')
        }
        let Str =template('tpl-cate',res)
        $('[name=cate_id]').html(Str)
        //通知layui重新渲染表单区
        form.render()
      }
    })
  }
  $('#form-search').on('submit',function(e) {
    e.preventDefault()
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()
    //为查询参数q中对象复制
    q.cate_id = cate_id
    q.state = state
    gettable()
  })
  //渲染分页方法
 
   function renderPage(total) {  
    //  console.log(total);
      //执行一个laypage，渲染分页
      laypage.render({
        elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit:q.pagesize,//每页显示几条
        curr:q.pagenum,//默认选择分页数
        layout:['count','limit','prev','page','next','skip'],
         limits:[3,5,10],
        //点击页码jump会回调
        //调用laypage.render就会触发jump回调
        jump:function(obj,first) {
          // console.log(obj.curr);
          q.pagenum = obj.curr
          // console.log(obj.limit)
           q.pagesize=obj.limit
          if(!first){
            //do something
            gettable()
          }
        }
      })
    }
    $('body').on('click','.btn-delect',function(){
      let leng = $('.btn-delect').length
      let id = $(this).attr('data-id')
      // console.log(leng);
      layer.confirm('是否确认删除文章?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
        method:'GET',
        url:"/my/article/delete/"+id,
        success:function(res) {
          if(res.status !== 0){
            return layer.msg('删除失败！')
          }
          layer.msg('删除成功！')
          // console.log(leng);
          if(leng === 1){
            q.pagenum =q.pagenum === 1 ? 1 : q.pagenum - 1
          }
           gettable()
        }
      })
        
        layer.close(index);
      });
    })

})
