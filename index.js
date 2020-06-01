$(function(){
    //上传文件
    $("#upload").change(function(e) {
        imgBox = e.target;
        uploadImg($('.img_info'), imgBox)
    });

    //创建图片
    function uploadImg(element, tag) {
        file = tag.files[0];
        ext = file.name.substr(file.name.lastIndexOf('.') + 1)
        if (!/image\/\w+/.test(file.type)) {
            alert("看清楚，这个需要图片！");
            return false;
        }

        //以本地路径的形式展示图片
        let imgs = document.createElement("img");
        imgSrc = getObjectURL(file)
        console.log(imgSrc);

        objectURLToBlob(imgSrc, function (blob) {  
            file = new window.File([blob], 'img.jpg', {type: 'image/jpeg'})
            console.log(file);
        })
        $(imgs).attr("src", imgSrc);
        element.html(imgs);
    }

    //建立一个可以存取file的路径
    function getObjectURL(file) {  
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic  
            url = window.createObjectURL(file) ;  
        } else if (window.URL!=undefined) { // mozilla(firefox)  
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome  
            url = window.webkitURL.createObjectURL(file) ;  
        }  
        return url ;  
    } 

    //BlobUrl转blob数据   bolb用于发送给后端
    function objectURLToBlob(url, callback) {  
        var http = new XMLHttpRequest();  
        http.open("GET", url, true);  
        http.responseType = "blob";  
        http.onload = function (e) {  
            if (this.status == 200 || this.status === 0) {  
                callback(this.response)  
            }  
        };  
        http.send()  
    };  


   //向后端传递   以文件格数传递
   $('.submit').on('click', function() {
        let imgData = new FormData();
        imgData.append('name', file)
        imgData.append('flag', 'question')
        imgData.append('ext', ext)
        $.ajax({
            // url: ajaxUrl,
            //type: 'POST',
            // contentType: false,
            // processData: false,  // 增加这一行，不处理参数
            // data: imgData,
            // success(res) {},
        })
   })

})