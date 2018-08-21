import router from './router'
import store from './store'
import device from './utils/device'
//1,实习生；2,专家）或（3机构，4企业）
const whiteList = ['login','registered', 'logOut', 'resetPassword', 'agreement', 'newDetails'];
const whiteRoutList = ['loginIdentity', 'loginInformation', 'loginUserInfo', 'loginCompanyInfo', 'isCooperation','logOut', 'login'];

let p = new Promise(function(resolve, reject){
    if(store.state.login.token){
        store.dispatch('getUserInfo').finally(data => {
            resolve();
        }).catch(data => {
            reject();
        });
    }else{
        resolve();
    }
});


router.beforeEach((to, from, next) => {
    console.log("beforeEach:" + to.name);
    p.then(function(){
        onRouter(to, next);
    }).catch(data => {
        onRouter(to, next);
    });
});

function onRouter(to, next) {
    document.title = to.meta.title || '三师汇';
    // console.log(store.state.login.token);
    if(!store.state.login.token){
        if(whiteList.indexOf(to.name) < 0){
            // if (device.isWeixin){
            //     weiXingLogin();
            // }else{
                next('/login');
            // }
        }else{
            next();
        }
    }else{
        //判断是否完善资料
        // console.log(to.path);
        if(store.state.login.user.infoStatus == 1 || whiteRoutList.indexOf(to.name) >= 0){
            if(to.path == '/'){
                if(store.getters.type == 3 || store.getters.type == 4){
                    next('/enterprise')
                }else if(store.getters.type == 1 || store.getters.type == 2){
                    next('/students')
                }
            }else{
                next();
            }
        }else{
            next('/loginIdentity');
        }
    }
}

router.afterEach(() => {
    // console.log('afterEach');
})

function weiXingLogin() {
    if(store.state.login.openid){
        openidLogin()
    }else {
        if(location.href.indexOf('code=') > -1){
            store.dispatch('getOpenId',location.href.split('code=')[1].split('&')[0]).then((data)=>{
                store.commit('SET_OPENID',data.openId)
                openidLogin()
            })
        }else {
            window.location.href = 'http://api.zhzc.bjhqzl.com/api/wechat/oauth?scope=snsapi_base&redirect_uri=' + encodeURIComponent(location.href);
        }
    }
}

function openidLogin() {
    store.dispatch('loginWithOpenid',{openid:store.state.login.openid}).then((data)=>{
        router.push('/');
    }).catch((err)=>{
        router.push({name:'login'});
    })
}
