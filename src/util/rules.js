import util from '@/util/util'
function getVal (obj, str) {
	return str.split('.').reduce((a, b) => a[b], obj)
}
export default {
	// 账号规则
	id () {
		return function (rule, value, callback) {
			const reg = /\s+/;
			if (!value) {
				callback(new Error('请输入手机号码'));
			} else {
				if (reg.test(value)) {
					callback(new Error('请不要输入带空格的账号'));
				} else {
					callback();
				}
			}
		};
	},
	// 名称规则
	name () {
		return function (rule, value, callback) {
			const reg = /\s+/;
			if (!value) {
				callback(new Error('姓名长度在 2 到 8 个字符'));
			} else {
				if (reg.test(value)) {
					callback(new Error('请不要输入带空格的姓名'));
				} else {
					callback();
				}
			}
		};
	},
	// 表单手机号码验证规则
	phone () {
		return function (rule, value, callback) {
			if (value) {
				if (/^1[34578]\d{9}$/.test(value)) {
					callback();
				} else {
					callback(new Error('请输入正确的手机格式!'));
				}
				return;
			}
			callback();
		};
	},
	// 判断数组长度
	checkArrLen (msg, len = 1) {
		return function (rule, value = [], callback) {
            if (value.length < len) {
                return callback(new Error(msg));
            }
            callback()
		};
	},
	// 邮箱验证
	email () {
		return function (rule, value, callback) {
			if (value) {
				if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
					callback();
				} else {
					callback(new Error('请输入正确的邮箱格式!'));
				}
				return;
			}
			callback();
		};
	},
	// 判断文字长度
	checkLen (len, msg) {
		return function (rule, value, callback) {
			if (/^\s+$/.test(value)) {
				return callback(new Error(msg));
			} else if (value.length > len) {
				return callback(new Error(`长度应在${len}位以内`));
			} else {
				callback();
			}
		};
	},
	// 判断数字
	checkNum (msg, hasZero = true) {
		return function (rule, value, callback) {
			let reg = hasZero ? +value <= 0 : +value < 0;
			let regTxt = hasZero ? '请输入大于等于0的数' : '请输入大于0的数';
			if (/^\s+$/.test(value)) {
				return callback(new Error(msg));
			} else if (reg) {
				return callback(new Error(regTxt));
			} else if (!Number.isInteger(+value)) {
				return callback(new Error('请输入整数'));
			} else {
				callback();
			}
		};
	},
	// 判断文字长度区间
	checkLenInterval (minLen, maxLen) {
		return function (rule, value, callback) {
			let len = value.toString().length
			if (len < minLen || len > maxLen) {
				return callback(new Error(`长度应在${minLen}到${maxLen}之间`));
			} else if (/\s+/.test(value)) {
				return callback(new Error('不允许输入空格'));
			} else {
				callback();
			}
		};
	},
	// 判断数字区间
	checkNumInterval (min, max) {
		return function (rule, value, callback) {
			if (isNaN(value)) {
				return callback(new Error(`请输入${min}到${max}之间的数字`));
			} else if (value < min || value > max) {
				return callback(new Error(`请输入${min}到${max}之间的数字`));
			} else if (value.includes(' ')) {
				return callback(new Error('不允许输入空格'));
			} else {
				callback();
			}
		};
	},
	// 判断含空格的字符串
	checkSpace (msg) {
		return function (rule, value, callback) {
			if (/^\s+$/.test(value)) {
				return callback(new Error(msg));
			} else {
				callback();
			}
		};
	},
	// 判断数字长度
	checkNumLen (len) {
		return function (rule, value, callback) {
			if (value.toString().length > len) {
				return callback(new Error(`输入不能超过${len}位的数字`));
			} else {
				callback();
			}
		};
	},
	// 判断两个值是否相等
	checkEqual (self, attr, msg) {
		return function (rule, value, callback) {
			if (value !== getVal(self, attr)) {
				return callback(new Error(msg));
			} else {
				callback();
			}
		};
	},
	// 判断手机号码
	checkPhone () {
		return function (rule, value, callback) {
			if (!value || /^\s+$/.test(value)) {
				return callback(new Error('请输入手机号码'));
			} else if (value && !/^1(3|4|5|7|8)\d{9}$/.test(value)) {
				return callback(new Error('请输入11位数的手机号码'));
			} else {
				callback();
			}
		};
	},
	// 验证排序（非必填）
	sort () {
		return function (rule, value, callback) {
			if (value) {
				if (/^\s+$/.test(value)) {
					return callback(new Error('请输入排序'));
				} else if (+value <= 0) {
					return callback(new Error('请输入大于0的数'));
				} else if (!Number.isInteger(+value)) {
					return callback(new Error('请输入整数'));
				} else {
					return callback();
				}
			} else {
				return callback();
			}
		};
	},
	// 验证链接（非必填）
	url () {
		return function (rule, value, callback) {
			if (value) {
				if (!util.matchFn('url', value)) {
					return callback(new Error('请输入正确的链接'));
				} else {
					return callback();
				}
			} else {
				return callback();
			}
		};
	}
};
