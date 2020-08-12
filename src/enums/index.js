/**
 * 枚举
 */
import financeEnum from './modules/financeEnum';
import salesEnum from './modules/salesEnum';
import storeEnum from './modules/storeEnum';
import orderEnum from './modules/orderEnum';

var getEnumOptions = function (_enum) {
    var options = [];
    Object.keys(_enum).forEach(key => {
        options.push({ label: _enum[key], value: ['true', 'false'].includes(key) ? JSON.parse(key) : key });
    });
    return options;
}

var _enumOptionsList = { financeEnum, salesEnum, storeEnum };
Object.keys(_enumOptionsList).forEach(i => {
    var _modules = _enumOptionsList[i];
    Object.keys(_modules).forEach(m => {
        _modules[`${m}Options`] = getEnumOptions(_modules[m]);
    });
});

export { financeEnum, salesEnum, storeEnum, orderEnum };
