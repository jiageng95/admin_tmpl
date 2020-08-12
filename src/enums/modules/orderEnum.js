var orderStatus = {
    'DZF': '待支付',
    'DHX': '待提货',
    'YWC': '已签收',
    'YQX': '已取消'
}

var platOrderStatus = {
    'DZF': '待支付',
    'DFH': '待发货',
    'YFH': '已发货',
    'YSH': '已收货',
    'YWC': '已完成',
    'YQX': '已取消'
}

var returnStatus = {
    'DSH': '待审核',
    'YSH': '已审核',
    'TKZ': '退款中',
    'TKCG': '退款成功',
    'HHZ': '换货中',
    'HHCG': '换货成功'
}
var feedStatus = {
    '0': '未处理',
    '1': '已处理'
}
var feedType = {
    'PRODUCT': '产品问题',
    'FUNCTION': '功能问题',
    'EXPERIENCE': '体验问题',
    'OTHER': '其他问题'
}
var returnType = {
    'RETURN': '退货退款',
    'CHANGE': '换货'
}

export default { orderStatus, returnStatus, returnType, platOrderStatus, feedStatus, feedType }
