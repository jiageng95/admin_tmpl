/**
* 全局api
* 由lc/api.js自动生成
*/

// 账号管理
export const ADMIN_ADD = 'admin/add';// 新增账号
export const ADMIN_ADMINUSERLIST = 'admin/adminUserList';// 用户列表
export const ADMIN_DELETE = 'admin/delete';// 删除用户
export const ADMIN_DETAIL = 'admin/detail';// 用户详情
export const ADMIN_DOWNROLE = 'admin/downRole';// 角色下拉列表
export const ADMIN_PERSONALINFO = 'admin/personalInfo';// 个人信息
export const ADMIN_RESETPWD = 'admin/resetPwd';// 重置密码

// 角色权限
export const ADMIN_ROLE_ROLEDELETE = 'admin/role/RoleDelete';// 删除角色
export const ADMIN_ROLE_ADDROLE = 'admin/role/addRole';// 新增角色
export const ADMIN_ROLE_POWERLIST = 'admin/role/powerList';// 权限列表
export const ADMIN_ROLE_ROLELIST = 'admin/role/roleList';// 角色列表
export const ADMIN_ROLE_UPDATEPOWER = 'admin/role/updatePower';// 修改角色权限
export const ADMIN_ROLE_UPDATEROLE = 'admin/role/updateRole';// 修改角色

// 账号管理
export const ADMIN_STATUS = 'admin/status';// 冻结/正常账号
export const ADMIN_UPDATE = 'admin/update';// 编辑账号
export const ADMIN_UPDATEPWD = 'admin/updatePwd';// 个人修改密码

// 数据分析API
export const ANALYSIS_COUNTDATAHEAD = 'analysis/countDataHead';// 数据统计（头部）
export const ANALYSIS_COUNTDATATAIL = 'analysis/countDataTail';// 数据统计（尾部）
export const ANALYSIS_GETMECHANISMRATETYPE = 'analysis/getMechanismRateType';// 心率数据
export const ANALYSIS_GETMECHANISMSLEEPTYPE = 'analysis/getMechanismSleepType';// 睡眠数据
export const ANALYSIS_GETMECHANISMSPORTTYPE = 'analysis/getMechanismSportType';// 步数数据
export const ANALYSIS_GETMECHANISMTEMTYPE = 'analysis/getMechanismTemType';// 体温数据

// 合作商API
export const BUSINESS_ADDBUSINESS = 'business/addBusiness';// 添加合作商
export const BUSINESS_BUSINESSESDETAIL = 'business/businessesDetail';// 合作商详情
export const BUSINESS_BUSINESSESLIST = 'business/businessesList';// 合作商列表
export const BUSINESS_UPDATEBUSINESS = 'business/updateBusiness';// 修改合作商
export const BUSINESS_UPDATEPASSWORD = 'business/updatePassword';// 重置密码
export const BUSINESS_UPDATESTATE = 'business/updateState';// 更新状态
export const BUSINESS_USERLIST = 'business/userList';// 合作商详情用户设备列表

// 设备类型
export const EQUIPMENT_ADDEQUIPMENT = 'equipment/addEquipment';// 新增
export const EQUIPMENT_DELETE = 'equipment/delete';// 删除设备
export const EQUIPMENT_DETAILS = 'equipment/details';// 详情
export const EQUIPMENT_DEVICEEXPORT = 'equipment/deviceExport';// 下载导入模板
export const EQUIPMENT_IMPORT = 'equipment/import';// 批量导入
export const EQUIPMENT_LIST = 'equipment/list';// 设备列表
export const EQUIPMENT_LISTEXPORT = 'equipment/listExport';// 设备列表导出
export const EQUIPMENT_MECHANISMCONFIGLIST = 'equipment/mechanismConfigList';// 机构等级列表
export const EQUIPMENT_MECHANISMLIST = 'equipment/mechanismList';// 机构列表
export const EQUIPMENT_UPDATE = 'equipment/update';// 批量变更设备
export const EQUIPMENT_UPDATEEQUIPMENT = 'equipment/updateEquipment';// 修改

// 后台登录
export const HOME_IMAGEVERIFICATION = 'home/imageVerification';// 获取图片验证码
export const HOME_LOGIN = 'home/login';// 用户登录
export const HOME_LOGOUT = 'home/logout';// 退出登录
export const HOME_SESSION = 'home/session';// 获取登录信息
export const HOME_VALIDATE = 'home/validate';// 校验图片验证码

// 测量值预警
export const MEASURE_ADDMEASURE = 'measure/addMeasure';// 新增
export const MEASURE_DELETE = 'measure/delete';// 删除
export const MEASURE_DETAIL = 'measure/detail';// 详情
export const MEASURE_LIST = 'measure/list';// 测量值预警列表
export const MEASURE_UPDATEMEASURE = 'measure/updateMeasure';// 修改

// 机构API
export const MECHANISM_ADDMECHANISM = 'mechanism/addMechanism';// 添加机构
export const MECHANISM_ADDSUBSYSTEM = 'mechanism/addSubsystem';// 添加子机构
export const MECHANISM_COUNTDATATAIL = 'mechanism/countDataTail';// 数据统计
export const MECHANISM_COUNTDATATAILEXPORT = 'mechanism/countDataTailExport';// 数据统计导出
export const MECHANISM_EQUIPMENTMEASUREEXPORT = 'mechanism/equipmentMeasureExport';// 异常数据导出
export const MECHANISM_GETEQUIPMENTMEASURELEVE = 'mechanism/getEquipmentMeasureLeve';// 异常数据
export const MECHANISM_GETMECHANISMRATETYPE = 'mechanism/getMechanismRateType';// 心率数据
export const MECHANISM_GETMECHANISMSLEEPTYPE = 'mechanism/getMechanismSleepType';// 睡眠数据
export const MECHANISM_GETMECHANISMSPORTTYPE = 'mechanism/getMechanismSportType';// 步数数据
export const MECHANISM_GETMECHANISMTEMTYPE = 'mechanism/getMechanismTemType';// 体温数据
export const MECHANISM_LIST = 'mechanism/list';// 设备列表
export const MECHANISM_LISTEXPORT = 'mechanism/listExport';// 设备列表导出
export const MECHANISM_MECHANISMDETAIL = 'mechanism/mechanismDetail';// 机构详情
export const MECHANISM_MECHANISMLIST = 'mechanism/mechanismList';// 机构列表
export const MECHANISM_SUBSYSTEMDETAIL = 'mechanism/subsystemDetail';// 子机构详情
export const MECHANISM_SUBSYSTEMLIST = 'mechanism/subsystemList';// 子机构列表
export const MECHANISM_UPDATEMECHANISM = 'mechanism/updateMechanism';// 修改机构
export const MECHANISM_UPDATEPASSWORD = 'mechanism/updatePassword';// 重置密码
export const MECHANISM_UPDATESTATE = 'mechanism/updateState';// 更新状态
export const MECHANISM_UPDATESUBSYSTEM = 'mechanism/updateSubsystem';// 修改子机构

// 机构分类API
export const MECHANISMCONFIG_ADDMECHANISMCONFIG = 'mechanismConfig/addMechanismConfig';// 添加机构分类
export const MECHANISMCONFIG_DELMECHANISMCONFIG = 'mechanismConfig/delMechanismConfig';// 删除分类
export const MECHANISMCONFIG_MECHANISMCONFIGLIST = 'mechanismConfig/mechanismConfigList';// 机构分类列表
export const MECHANISMCONFIG_UPDMECHANISMCONFIG = 'mechanismConfig/updMechanismConfig';// 修改机构分类

// 操作日志相关接口
export const SYSTEMLOGIN_LOGDETAIL = 'systemLogin/logDetail';// 查看日志详情
export const SYSTEMLOGIN_LOGLIST = 'systemLogin/logList';// 获取操作日志列表

// 测试
export const TEST_TEST = 'test/test';// 测试

// 用户API
export const USER_USERDETAIL = 'user/userDetail';// 用户详情
export const USER_USEREXPORT = 'user/userExport';// 用户列表导出
export const USER_USERHEARTRATEDETAIL = 'user/userHeartRateDetail';// 会员心率详情
export const USER_USERLIST = 'user/userList';// 用户列表
export const USER_USEROUTLIERSEQUIPMENT = 'user/userOutliersEquipment';// 异常数据
export const USER_USEROUTLIERSEXPORT = 'user/userOutliersExport';// 异常数据导出
export const USER_USERSLEEPDETAIL = 'user/userSleepDetail';// 会员睡眠详情
export const USER_USERSTEPSDETAIL = 'user/userStepsDetail';// 会员步数详情
export const USER_USERTEMPERATUREDETAIL = 'user/userTemperatureDetail';// 会员体温详情
