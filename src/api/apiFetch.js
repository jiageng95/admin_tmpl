import { ADMIN_ADD, ADMIN_ADMINUSERLIST, ADMIN_DELETE, ADMIN_DETAIL, ADMIN_DOWNROLE, ADMIN_PERSONALINFO, ADMIN_RESETPWD, ADMIN_ROLE_ROLEDELETE, ADMIN_ROLE_ADDROLE, ADMIN_ROLE_POWERLIST, ADMIN_ROLE_ROLELIST, ADMIN_ROLE_UPDATEPOWER, ADMIN_ROLE_UPDATEROLE, ADMIN_STATUS, ADMIN_UPDATE, ADMIN_UPDATEPWD, ANALYSIS_COUNTDATAHEAD, ANALYSIS_COUNTDATATAIL, ANALYSIS_GETMECHANISMRATETYPE, ANALYSIS_GETMECHANISMSLEEPTYPE, ANALYSIS_GETMECHANISMSPORTTYPE, ANALYSIS_GETMECHANISMTEMTYPE, BUSINESS_ADDBUSINESS, BUSINESS_BUSINESSESDETAIL, BUSINESS_BUSINESSESLIST, BUSINESS_UPDATEBUSINESS, BUSINESS_UPDATEPASSWORD, BUSINESS_UPDATESTATE, BUSINESS_USERLIST, EQUIPMENT_ADDEQUIPMENT, EQUIPMENT_DELETE, EQUIPMENT_DETAILS, EQUIPMENT_DEVICEEXPORT, EQUIPMENT_IMPORT, EQUIPMENT_LIST, EQUIPMENT_LISTEXPORT, EQUIPMENT_MECHANISMCONFIGLIST, EQUIPMENT_MECHANISMLIST, EQUIPMENT_UPDATE, EQUIPMENT_UPDATEEQUIPMENT, HOME_IMAGEVERIFICATION, HOME_LOGIN, HOME_LOGOUT, HOME_SESSION, HOME_VALIDATE, MEASURE_ADDMEASURE, MEASURE_DELETE, MEASURE_DETAIL, MEASURE_LIST, MEASURE_UPDATEMEASURE, MECHANISM_ADDMECHANISM, MECHANISM_ADDSUBSYSTEM, MECHANISM_COUNTDATATAIL, MECHANISM_COUNTDATATAILEXPORT, MECHANISM_EQUIPMENTMEASUREEXPORT, MECHANISM_GETEQUIPMENTMEASURELEVE, MECHANISM_GETMECHANISMRATETYPE, MECHANISM_GETMECHANISMSLEEPTYPE, MECHANISM_GETMECHANISMSPORTTYPE, MECHANISM_GETMECHANISMTEMTYPE, MECHANISM_LIST, MECHANISM_LISTEXPORT, MECHANISM_MECHANISMDETAIL, MECHANISM_MECHANISMLIST, MECHANISM_SUBSYSTEMDETAIL, MECHANISM_SUBSYSTEMLIST, MECHANISM_UPDATEMECHANISM, MECHANISM_UPDATEPASSWORD, MECHANISM_UPDATESTATE, MECHANISM_UPDATESUBSYSTEM, MECHANISMCONFIG_ADDMECHANISMCONFIG, MECHANISMCONFIG_DELMECHANISMCONFIG, MECHANISMCONFIG_MECHANISMCONFIGLIST, MECHANISMCONFIG_UPDMECHANISMCONFIG, SYSTEMLOGIN_LOGDETAIL, SYSTEMLOGIN_LOGLIST, TEST_TEST, USER_USERDETAIL, USER_USEREXPORT, USER_USERHEARTRATEDETAIL, USER_USERLIST, USER_USEROUTLIERSEQUIPMENT, USER_USEROUTLIERSEXPORT, USER_USERSLEEPDETAIL, USER_USERSTEPSDETAIL, USER_USERTEMPERATUREDETAIL } from './global.js'
import { commonPromise } from '@/http'
export default {

    // 账号管理
    adminAddFetch: (data) => commonPromise({data, url: ADMIN_ADD, method: 'post'}), // 新增账号
    adminAdminUserListFetch: (params) => commonPromise({params, url: ADMIN_ADMINUSERLIST, method: 'get'}), // 用户列表
    adminDeleteFetch: (params) => commonPromise({params, url: ADMIN_DELETE, method: 'get'}), // 删除用户
    adminDetailFetch: (params) => commonPromise({params, url: ADMIN_DETAIL, method: 'get'}), // 用户详情
    adminDownRoleFetch: (params) => commonPromise({params, url: ADMIN_DOWNROLE, method: 'get'}), // 角色下拉列表
    adminPersonalInfoFetch: (params) => commonPromise({params, url: ADMIN_PERSONALINFO, method: 'get'}), // 个人信息
    adminResetPwdFetch: (data) => commonPromise({data, url: ADMIN_RESETPWD, method: 'post'}), // 重置密码

    // 角色权限
    adminRoleRoleDeleteFetch: (params) => commonPromise({params, url: ADMIN_ROLE_ROLEDELETE, method: 'get'}), // 删除角色
    adminRoleAddRoleFetch: (data) => commonPromise({data, url: ADMIN_ROLE_ADDROLE, method: 'post'}), // 新增角色
    adminRolePowerListFetch: (params) => commonPromise({params, url: ADMIN_ROLE_POWERLIST, method: 'get'}), // 权限列表
    adminRoleRoleListFetch: (params) => commonPromise({params, url: ADMIN_ROLE_ROLELIST, method: 'get'}), // 角色列表
    adminRoleUpdatePowerFetch: (data) => commonPromise({data, url: ADMIN_ROLE_UPDATEPOWER, method: 'post'}), // 修改角色权限
    adminRoleUpdateRoleFetch: (data) => commonPromise({data, url: ADMIN_ROLE_UPDATEROLE, method: 'post'}), // 修改角色

    // 账号管理
    adminStatusFetch: (data) => commonPromise({data, url: ADMIN_STATUS, method: 'post'}), // 冻结/正常账号
    adminUpdateFetch: (data) => commonPromise({data, url: ADMIN_UPDATE, method: 'post'}), // 编辑账号
    adminUpdatePwdFetch: (data) => commonPromise({data, url: ADMIN_UPDATEPWD, method: 'post'}), // 个人修改密码

    // 数据分析API
    analysisCountDataHeadFetch: (params) => commonPromise({params, url: ANALYSIS_COUNTDATAHEAD, method: 'get'}), // 数据统计（头部）
    analysisCountDataTailFetch: (params) => commonPromise({params, url: ANALYSIS_COUNTDATATAIL, method: 'get'}), // 数据统计（尾部）
    analysisGetMechanismRateTypeFetch: (params) => commonPromise({params, url: ANALYSIS_GETMECHANISMRATETYPE, method: 'get'}), // 心率数据
    analysisGetMechanismSleepTypeFetch: (params) => commonPromise({params, url: ANALYSIS_GETMECHANISMSLEEPTYPE, method: 'get'}), // 睡眠数据
    analysisGetMechanismSportTypeFetch: (params) => commonPromise({params, url: ANALYSIS_GETMECHANISMSPORTTYPE, method: 'get'}), // 步数数据
    analysisGetMechanismTemTypeFetch: (params) => commonPromise({params, url: ANALYSIS_GETMECHANISMTEMTYPE, method: 'get'}), // 体温数据

    // 合作商API
    businessAddBusinessFetch: (data) => commonPromise({data, url: BUSINESS_ADDBUSINESS, method: 'post'}), // 添加合作商
    businessBusinessesDetailFetch: (params) => commonPromise({params, url: BUSINESS_BUSINESSESDETAIL, method: 'get'}), // 合作商详情
    businessBusinessesListFetch: (data) => commonPromise({data, url: BUSINESS_BUSINESSESLIST, method: 'post'}), // 合作商列表
    businessUpdateBusinessFetch: (data) => commonPromise({data, url: BUSINESS_UPDATEBUSINESS, method: 'post'}), // 修改合作商
    businessUpdatePasswordFetch: (data) => commonPromise({data, url: BUSINESS_UPDATEPASSWORD, method: 'post'}), // 重置密码
    businessUpdateStateFetch: (params) => commonPromise({params, url: BUSINESS_UPDATESTATE, method: 'get'}), // 更新状态
    businessUserListFetch: (data) => commonPromise({data, url: BUSINESS_USERLIST, method: 'post'}), // 合作商详情用户设备列表

    // 设备类型
    equipmentAddEquipmentFetch: (data) => commonPromise({data, url: EQUIPMENT_ADDEQUIPMENT, method: 'post'}), // 新增
    equipmentDeleteFetch: (params) => commonPromise({params, url: EQUIPMENT_DELETE, method: 'get'}), // 删除设备
    equipmentDetailsFetch: (params) => commonPromise({params, url: EQUIPMENT_DETAILS, method: 'get'}), // 详情
    equipmentDeviceExportFetch: (params) => commonPromise({params, url: EQUIPMENT_DEVICEEXPORT, method: 'get'}), // 下载导入模板
    equipmentImportFetch: (data) => commonPromise({data, url: EQUIPMENT_IMPORT, method: 'post'}), // 批量导入
    equipmentListFetch: (params) => commonPromise({params, url: EQUIPMENT_LIST, method: 'get'}), // 设备列表
    equipmentListExportFetch: (params) => commonPromise({params, url: EQUIPMENT_LISTEXPORT, method: 'get'}), // 设备列表导出
    equipmentMechanismConfigListFetch: (params) => commonPromise({params, url: EQUIPMENT_MECHANISMCONFIGLIST, method: 'get'}), // 机构等级列表
    equipmentMechanismListFetch: (params) => commonPromise({params, url: EQUIPMENT_MECHANISMLIST, method: 'get'}), // 机构列表
    equipmentUpdateFetch: (data) => commonPromise({data, url: EQUIPMENT_UPDATE, method: 'post'}), // 批量变更设备
    equipmentUpdateEquipmentFetch: (data) => commonPromise({data, url: EQUIPMENT_UPDATEEQUIPMENT, method: 'post'}), // 修改

    // 后台登录
    homeImageVerificationFetch: (params) => commonPromise({params, url: HOME_IMAGEVERIFICATION, method: 'get'}), // 获取图片验证码
    homeLoginFetch: (data) => commonPromise({data, url: HOME_LOGIN, method: 'post'}), // 用户登录
    homeLogoutFetch: (data) => commonPromise({data, url: HOME_LOGOUT, method: 'post'}), // 退出登录
    homeSessionFetch: (params) => commonPromise({params, url: HOME_SESSION, method: 'get'}), // 获取登录信息
    homeValidateFetch: (params) => commonPromise({params, url: HOME_VALIDATE, method: 'get'}), // 校验图片验证码

    // 测量值预警
    measureAddMeasureFetch: (data) => commonPromise({data, url: MEASURE_ADDMEASURE, method: 'post'}), // 新增
    measureDeleteFetch: (params) => commonPromise({params, url: MEASURE_DELETE, method: 'get'}), // 删除
    measureDetailFetch: (params) => commonPromise({params, url: MEASURE_DETAIL, method: 'get'}), // 详情
    measureListFetch: (params) => commonPromise({params, url: MEASURE_LIST, method: 'get'}), // 测量值预警列表
    measureUpdateMeasureFetch: (data) => commonPromise({data, url: MEASURE_UPDATEMEASURE, method: 'post'}), // 修改

    // 机构API
    mechanismAddMechanismFetch: (data) => commonPromise({data, url: MECHANISM_ADDMECHANISM, method: 'post'}), // 添加机构
    mechanismAddSubsystemFetch: (data) => commonPromise({data, url: MECHANISM_ADDSUBSYSTEM, method: 'post'}), // 添加子机构
    mechanismCountDataTailFetch: (params) => commonPromise({params, url: MECHANISM_COUNTDATATAIL, method: 'get'}), // 数据统计
    mechanismCountDataTailExportFetch: (params) => commonPromise({params, url: MECHANISM_COUNTDATATAILEXPORT, method: 'get'}), // 数据统计导出
    mechanismEquipmentMeasureExportFetch: (params) => commonPromise({params, url: MECHANISM_EQUIPMENTMEASUREEXPORT, method: 'get'}), // 异常数据导出
    mechanismGetEquipmentMeasureLeveFetch: (params) => commonPromise({params, url: MECHANISM_GETEQUIPMENTMEASURELEVE, method: 'get'}), // 异常数据
    mechanismGetMechanismRateTypeFetch: (params) => commonPromise({params, url: MECHANISM_GETMECHANISMRATETYPE, method: 'get'}), // 心率数据
    mechanismGetMechanismSleepTypeFetch: (params) => commonPromise({params, url: MECHANISM_GETMECHANISMSLEEPTYPE, method: 'get'}), // 睡眠数据
    mechanismGetMechanismSportTypeFetch: (params) => commonPromise({params, url: MECHANISM_GETMECHANISMSPORTTYPE, method: 'get'}), // 步数数据
    mechanismGetMechanismTemTypeFetch: (params) => commonPromise({params, url: MECHANISM_GETMECHANISMTEMTYPE, method: 'get'}), // 体温数据
    mechanismListFetch: (params) => commonPromise({params, url: MECHANISM_LIST, method: 'get'}), // 设备列表
    mechanismListExportFetch: (params) => commonPromise({params, url: MECHANISM_LISTEXPORT, method: 'get'}), // 设备列表导出
    mechanismMechanismDetailFetch: (params) => commonPromise({params, url: MECHANISM_MECHANISMDETAIL, method: 'get'}), // 机构详情
    mechanismMechanismListFetch: (data) => commonPromise({data, url: MECHANISM_MECHANISMLIST, method: 'post'}), // 机构列表
    mechanismSubsystemDetailFetch: (params) => commonPromise({params, url: MECHANISM_SUBSYSTEMDETAIL, method: 'get'}), // 子机构详情
    mechanismSubsystemListFetch: (data) => commonPromise({data, url: MECHANISM_SUBSYSTEMLIST, method: 'post'}), // 子机构列表
    mechanismUpdateMechanismFetch: (data) => commonPromise({data, url: MECHANISM_UPDATEMECHANISM, method: 'post'}), // 修改机构
    mechanismUpdatePasswordFetch: (data) => commonPromise({data, url: MECHANISM_UPDATEPASSWORD, method: 'post'}), // 重置密码
    mechanismUpdateStateFetch: (params) => commonPromise({params, url: MECHANISM_UPDATESTATE, method: 'get'}), // 更新状态
    mechanismUpdateSubsystemFetch: (data) => commonPromise({data, url: MECHANISM_UPDATESUBSYSTEM, method: 'post'}), // 修改子机构

    // 机构分类API
    mechanismConfigAddMechanismConfigFetch: (data) => commonPromise({data, url: MECHANISMCONFIG_ADDMECHANISMCONFIG, method: 'post'}), // 添加机构分类
    mechanismConfigDelMechanismConfigFetch: (params) => commonPromise({params, url: MECHANISMCONFIG_DELMECHANISMCONFIG, method: 'get'}), // 删除分类
    mechanismConfigMechanismConfigListFetch: (params) => commonPromise({params, url: MECHANISMCONFIG_MECHANISMCONFIGLIST, method: 'get'}), // 机构分类列表
    mechanismConfigUpdMechanismConfigFetch: (data) => commonPromise({data, url: MECHANISMCONFIG_UPDMECHANISMCONFIG, method: 'post'}), // 修改机构分类

    // 操作日志相关接口
    systemLoginLogDetailFetch: (params) => commonPromise({params, url: SYSTEMLOGIN_LOGDETAIL, method: 'get'}), // 查看日志详情
    systemLoginLogListFetch: (params) => commonPromise({params, url: SYSTEMLOGIN_LOGLIST, method: 'get'}), // 获取操作日志列表

    // 测试
    testTestFetch: (params) => commonPromise({params, url: TEST_TEST, method: 'get'}), // 测试

    // 用户API
    userUserDetailFetch: (params) => commonPromise({params, url: USER_USERDETAIL, method: 'get'}), // 用户详情
    userUserExportFetch: (params) => commonPromise({params, url: USER_USEREXPORT, method: 'get'}), // 用户列表导出
    userUserHeartRateDetailFetch: (params) => commonPromise({params, url: USER_USERHEARTRATEDETAIL, method: 'get'}), // 会员心率详情
    userUserListFetch: (data) => commonPromise({data, url: USER_USERLIST, method: 'post'}), // 用户列表
    userUserOutliersEquipmentFetch: (params) => commonPromise({params, url: USER_USEROUTLIERSEQUIPMENT, method: 'get'}), // 异常数据
    userUserOutliersExportFetch: (params) => commonPromise({params, url: USER_USEROUTLIERSEXPORT, method: 'get'}), // 异常数据导出
    userUserSleepDetailFetch: (params) => commonPromise({params, url: USER_USERSLEEPDETAIL, method: 'get'}), // 会员睡眠详情
    userUserStepsDetailFetch: (params) => commonPromise({params, url: USER_USERSTEPSDETAIL, method: 'get'}), // 会员步数详情
    userUserTemperatureDetailFetch: (params) => commonPromise({params, url: USER_USERTEMPERATUREDETAIL, method: 'get'}) // 会员体温详情

}
