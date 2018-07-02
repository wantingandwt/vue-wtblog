export default {
    //日期处理
       goodTime (str) {
        let oldTime = new Date(str).getTime();//转化成时间戳
        let date = new Date(oldTime);//new Date(oldTime * 1000);时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        let s = date.getSeconds();
        return Y+M+D+h+m;
      },

      //是否推荐处理
      goodrecommend(str){
           if(str==1){
              return '是'
           }else{
            return '否'
           }
      },
}