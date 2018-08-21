import Home from '../views/home/Home.vue'
import Login from '../views/login/login.vue'
import Registered from '../views/login/registered.vue'
import LoginIdentity from '../views/login/loginIdentity.vue'
import LoginInformation from '../views/login/information'
import LoginUserInfo from '../views/login/userInfo'
import LoginCompanyInfo from '../views/login/companyInfo'
import IsCooperation from '../views/login/isCooperation'
import MySet from '../views/login/mySet'
import ModifyPassword from '../views/login/modifyPassword'
import ResetPassword from '../views/login/resetPassword'
import ModifyMobile from '../views/login/modifyMobile'
import Custom from '../views/login/custom'
import CustomList from '../views/login/customList'
import NewDetails from '../views/login/newDetails'
import logOut from '../views/login/logOut'
import Agreement from '../views/login/agreement'

//机构
import Enterprise from '../views/enterprise/index'
import EnterpriseExperts from '../views/enterprise/experts'
import EnterpriseExpertsDetails from '../views/enterprise/expertsDetails'
import SelectProject from '../views/enterprise/selectProject'
import NewProject from '../views/enterprise/newProject'
import NewPosition from '../views/enterprise/newPosition'
import ConfirmInvitation from '../views/enterprise/confirmInvitation'
import Organizations from '../views/enterprise/organizations'
import OrganizationDetails from '../views/enterprise/organizationDetails'
import EnterpriseAlternative from '../views/enterprise/alternative'
import EnterpriseMy from '../views/enterprise/my'
import EnterpriseCustom from '../views/enterprise/custom'
import EnterpriseMyInvitation from '../views/enterprise/myInvitation'
import EnterpriseCollection from '../views/enterprise/collection'
import EnterpriseMyAlternative from '../views/enterprise/myAlternative'
import EnterpriseMyProject from '../views/enterprise/myProject'
import EnterpriseMyProjectDetails from '../views/enterprise/myProjectDetails'
import EnterpriseCertification from '../views/enterprise/certification'
import CollectionExperts from '../views/enterprise/collectionExperts'
import YaoInvitation from '../views/enterprise/yaoInvitation'
// import Yqh from '../views/enterprise/yqh'
import EnterprisePerfectInfo from '../views/enterprise/info'

//学生
import Students from '../views/students/index'
import Invitation from '../views/students/invitation'
// import InvitationDetails from '../views/students/invitationDetails'
import My from '../views/students/my'
import MyUndertake from '../views/students/myUndertake'
import Certification from '../views/students/certification'
import PerfectInfo from '../views/students/Info'

//邀请
import expertInvitationDetail from '../views/invitation/expertInvitationDetail'
import enterpriseInvitationDetail from '../views/invitation/enterpriseInvitationDetail'


const routes = [
    // {path: '/', redirect: '/loginIdentity'}
];

const routes_C = [
    {path: '/login', name: 'login', component: Login, meta: {title: '登录'}},
    {path: '/registered', name: 'registered', component:Registered, meta: {title: '注册'}},
    {path: '/loginIdentity', name: 'loginIdentity', component: LoginIdentity, meta: {title: '注册'}},
    {path: '/loginInformation', name: 'loginInformation', component: LoginInformation, meta: {title: '完善资料'}},
    {path: '/loginUserInfo', name: 'loginUserInfo', component: LoginUserInfo, meta: {title: '完善资料'}},
    {path: '/loginCompanyInfo', name: 'loginCompanyInfo', component: LoginCompanyInfo, meta: {title: '完善资料'}},
    {path: '/isCooperation', name: 'isCooperation', component: IsCooperation, meta: {title: '完善资料'}},
    {path: '/mySet', name: 'mySet', component: MySet, meta: {title: '账号设置'}},
    {path: '/modifyPassword', name: 'modifyPassword', component: ModifyPassword, meta: {title: '修改密码'}},
    {path: '/resetPassword', name: 'resetPassword', component: ResetPassword, meta: {title: '找回密码'}},
    {path: '/modifyMobile', name: 'modifyMobile', component: ModifyMobile, meta: {title: '修改手机号码'}},
    {path: '/custom', name: 'custom', component: Custom, meta: {title: '我的定制'}},
    {path: '/customList', name: 'customList', component: CustomList, meta: {title: '我的定制服务'}},
    {path: '/newDetails', name: 'newDetails', component: NewDetails, meta: {title: '发现'}},
    {path: '/logOut', name: 'logOut', component: logOut, meta: {title: '退出'}},
    {path: '/agreement', name: 'agreement', component: Agreement, meta: {title: '服务协议'}},
];
const routes_students = [
    {path: '/students', name: 'students', component: Students, meta: {title: '三师汇'}},
    {path: '/invitation', name: 'invitation', component: Invitation, meta: {title: '三师汇'}},
    // {path: '/invitationDetails', name: 'invitationDetails', component: InvitationDetails, meta: {title: '邀请详情'}},
    {path: '/my', name: 'my', component: My, meta: {title: '我的'}},
    {path: '/myUndertake', name: 'myUndertake', component: MyUndertake, meta: {title: '我的承接'}},
    {path: '/certification', name: 'certification', component: Certification, meta: {title: '认证'}},
    {path: '/perfectInfo', name: 'perfectInfo', component: PerfectInfo, meta: {title: '完善资料'}},
];
const routes_enterprise = [
    {path: '/enterprise', name: 'enterprise', component: Enterprise, meta: {title: '三师汇'}},
    {path: '/enterpriseExperts', name: 'enterpriseExperts', component: EnterpriseExperts, meta: {title: '专家&实习生'}},
    {path: '/enterpriseExpertsDetails', name: 'enterpriseExpertsDetails', component: EnterpriseExpertsDetails, meta: {title: '专家详情'}},
    {path: '/enterpriseStudentsDetails', name: 'enterpriseStudentsDetails', component: EnterpriseExpertsDetails, meta: {title: '学生详情'}},
    {path: '/selectProject', name: 'selectProject', component: SelectProject, meta: {title: '选择已有项目'}},
    {path: '/newPosition', name: 'newPosition', component: NewPosition, meta: {title: '新建职位'}},
    {path: '/newProject', name: 'newProject', component: NewProject, meta: {title: '新建项目'}},
    {path: '/confirmInvitation', name: 'confirmInvitation', component: ConfirmInvitation, meta: {title: '发送邀请'}},
    {path: '/Organizations', name: 'Organizations', component: Organizations, meta: {title: '合作机构'}},
    {path: '/OrganizationDetails', name: 'OrganizationDetails', component: OrganizationDetails, meta: {title: '合作机构详情'}},
    {path: '/enterpriseAlternative', name: 'enterpriseAlternative', component: EnterpriseAlternative, meta: {title: '备选'}},
    {path: '/enterpriseMy', name: 'enterpriseMy', component: EnterpriseMy, meta: {title: '我的'}},
    {path: '/enterpriseCustom', name: 'enterpriseCustom', component: EnterpriseCustom, meta: {title: '我的定制服务'}},
    {path: '/enterpriseMyInvitation', name: 'enterpriseMyInvitation', component: EnterpriseMyInvitation, meta: {title: '我的邀请'}},
    {path: '/enterpriseCollection', name: 'enterpriseCollection', component: EnterpriseCollection, meta: {title: '我的收藏'}},
    {path: '/enterpriseMyAlternative', name: 'enterpriseMyAlternative', component: EnterpriseMyAlternative, meta: {title: '我的备选'}},
    {path: '/enterpriseMyProject', name: 'enterpriseMyProject', component: EnterpriseMyProject, meta: {title: '我的项目'}},
    {path: '/enterpriseMyProjectDetails', name: 'enterpriseMyProjectDetails', component: EnterpriseMyProjectDetails, meta: {title: '项目详情'}},
    {path: '/enterpriseCertification', name: 'enterpriseCertification', component: EnterpriseCertification, meta: {title: '我的资料'}},
    {path: '/collectionExperts', name: 'collectionExperts', component: CollectionExperts, meta: {title: '我的收藏'}},
    {path: '/yaoInvitation', name: 'yaoInvitation', component: YaoInvitation},
    // {path: '/yaoQingHan', name: 'yaoQingHan', component: Yqh},
    {path: '/enterprisePerfectInfo', name: 'enterprisePerfectInfo', component: EnterprisePerfectInfo, meta: {title: '我的资料'}},
];

const routes_invitation = [
    {path: '/expertInvitationDetail', name: 'expertInvitationDetail', component: expertInvitationDetail, meta: {title: '邀请详情'}},
    {path: '/enterpriseInvitationDetail', name: 'enterpriseInvitationDetail', component: enterpriseInvitationDetail, meta: {title: '邀请详情'}},
];

var out = routes.concat(routes_C, routes_students, routes_enterprise, routes_invitation);

export default out
