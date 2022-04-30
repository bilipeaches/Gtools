// MDUI JS
var $ = mdui.$;
// 上传数据
UPLOADDATA = {}
UPLOADINDEX = ["res-name",
"author-name",
"godot-version",
"img-url",
"res-url",
"res-type",
"res-text"]
window.onload = function(){
    // 初始化
    const { Query, User } = AV;
    AV.init({
        appId: "7dvIuDRBs0VcegR4cJABBj4Q-gzGzoHsz",
        appKey: "EwY4kmwsOyf26yuQpm50AOgy"
    });
    // 关于
    $("#About-btn").on("click", function(){
        mdui.alert("Gtools - Godot工具箱 by bilipeaches", "关于");
    });
    // 搜索
    $("#Search-btn").on("click", function(){
        mdui.prompt('请输入搜索内容:', '搜索',
        function(value) {
            mdui.alert('你输入了：' + value + '，点击了确认按钮');
        },
        function() {
            var bar = mdui.snackbar({
                message: '您已取消搜索',
                position: 'right-bottom',
            });
            setTimeout(function(){
                bar.close();
            }, 800);
        }
    );
    });
    // 上传资源
    var inst = new mdui.Drawer('#left-drawer');
    inst.open();
    $("#Upload-btn").on("click", function(){
        inst.close();
        $(".all").css({
            "visibility":"visible",
            "opacity":1
        });
    });
    $(".up-close").on("click", function(){
        inst.open();
        $(".all").css({
            "visibility":"hidden",
            "opacity":0
        });
    });
    // 提交资源
    vaptcha({
        vid: '625bc542a36b69b0b7226ac4',
        mode: 'invisible',
        scene: 0,
        area: 'auto',
    }).then(function (VAPTCHAObj) {
        // 将VAPTCHA验证实例保存到局部变量中
        obj = VAPTCHAObj;
        
        // 验证成功进行后续操作
        VAPTCHAObj.listen('pass', function () {
            serverToken = VAPTCHAObj.getServerToken();
            var data = {
                server: serverToken.server,
                token: serverToken.token,
            }
            mdui.alert(data.token, data.server);
            // 存储数据
            const TestObject = AV.Object.extend('TestObject');
            const testObject = new TestObject();
            testObject.set('words', 'Hello world!');
            testObject.save().then((testObject) => {
                console.log('保存成功。')
            })
            // 关闭
            $(".all").css({
                "visibility":"hidden",
                "opacity":0
            });
        })

        // VAPTCHA实例初始化完成后，用户点击登录按钮时执行人机验证
        $('#enter_res').on('click', function() {
            // 检查数据
            UPLOADDATA = {
                "res-name":$(".res-name").val(),
                "author-name":$(".author-name").val(),
                "godot-version":$(".godot-version").val(),
                "img-url":$(".img-url").val(),
                "res-url":$(".res-url").val(),
                "res-type":$(".res-type").val(),
                "res-text":$(".res-text").val()
            }
            for(i=0; i<UPLOADINDEX.length; i++) { 
                if(UPLOADDATA[UPLOADINDEX[i]].replace(/\s*/g,"") == ""){
                    mdui.alert("有内容未填写!", "错误");
                    return;
                }
             }
            // 人机验证
            obj.validate();
        })
    })
}