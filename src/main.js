// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './permission'
import './less/index.less'
import vConsole from 'vconsole'

Vue.config.productionTip = false

//第三方组件
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css';
import {
    Input,
    Icon,
    Row,
    Col,
    Card,
    Button,
    Form,
    FormItem,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Message,
    Collapse,
    CollapseItem,
    Popover,
    Switch,
} from 'element-ui';
import { Picker, Popup, Loadmore, CellSwipe, Toast, Indicator, DatetimePicker,MessageBox} from 'mint-ui';
import { Tab, TabItem } from 'vux'

//自定义组件
import Layout from './components/Layout.vue'
import LayPage from './components/LayPage'
import HH_chechbox from './components/HH_checkbox'
import './icons'

//注册组件
Vue.use(YDUI);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Popover);
Vue.use(Collapse);
Vue.use(Card);
Vue.use(Button);
Vue.use(Switch);
Vue.use(CollapseItem);
Vue.component('layout', Layout)
Vue.component('laypage', LayPage)
Vue.component('HH_chechbox', HH_chechbox)


//mint-ui 按需引入
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.prototype.Toast=Toast;
Vue.prototype.Indicator=Indicator;
Vue.prototype.MessageBox=MessageBox;

//vux 按需引入
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)


Vue.prototype.$message = Message;



import filters from './filter/filters.js'
Vue.use(filters);

import validations from './directive/validations.js'
Vue.use(validations);

window.addEventListener('resize', () => {
    let ch = document.documentElement.clientHeight;
    let sh = screen.height;
    if((sh-ch)>150){
        store.commit('SET_JP_FOCUS', true)
    }else{
        store.commit('SET_JP_FOCUS', false)
    }
});

/* eslint-disable no-new */
// new vConsole();
new Vue({
    el: '#app',
    router,store,
    template: '<App/>',
    components: { App }
});
