<template>
    <div i="drag-table">
        <div class="drag-table-container">
            <div class="table-head">
                <div class="head-item">序号</div>
                <div class="head-item full" v-for="(row, i) in rowData" :key="i">{{row.label}}</div>
                <div class="head-item" v-permission:or="[editDis, delDis]">操作</div>
            </div>
            <ul class="table-body">
                <li class="table-row text-center" v-if="!tableData.length">
                    <div class="row-item">暂无数据</div>
                </li>
                <li :class="['table-row', {'cur': index === curIndex}]" v-for="(item, index) in tableData" :key="index"
                :draggable="!disabled"
                @dragstart="dragstartEvent($event, index)"
                @dragend="dragendEvent($event, index)"
                @dragenter="dragenterEvent"
                @dragleave="dragleaveEvent"
                @dragover="dragoverEvent"
                @click="changeRow(index)">
                    <div class="row-item" v-if="!disabled && !canUpdate">{{tableData.length - index}}</div>
                    <div class="row-item" v-if="!disabled && canUpdate"><input type="text" v-model="item.sort" class="update-input" @change="changeSort(item)"></div>
                    <!-- <div class="row-item" v-else>{{index + 1}}</div> -->
                    <div class="row-item" v-if="disabled">{{index + 1}}</div>
                    <div class="row-item full" v-for="(row, i) in rowData" :key="i">{{item[row.value]}}</div>
                    <div class="row-item" v-permission:or="[editDis, delDis]">
                        <a v-permission="editDis" href="javascript:;" class="icon-btn el-icon-edit-outline" @click="editRow(item)"></a>
                        <a v-permission="delDis" href="javascript:;" class="icon-btn el-icon-delete" @click="delRow(item)"></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    /**
    * tableData 表格数据
    * rowData 表头数据, 必须与表格数据的每一项对应
    * tableKey 表格以什么字段组成排序后的数组
    * keyId 组件唯一的key, 同一页面出现多个该组件,需指定key,用来区分是第几个组件
    */
    props: ['tableData', 'rowData', 'tablekey', 'keyId', 'disabled', 'editDis', 'delDis', 'canUpdate'],
    data () {
        return {
            dragElement: null,
            lock: true,
            curIndex: 0,
            sortArr: [] // 排序后的数组
        }
    },
    mounted () {

    },
    methods: {
        dragstartEvent (ev, index) {
            if (this.disabled) return;
            const self = this;
            let target = ev.currentTarget;
            self.dragElement = target;
            target.style.backgroundColor = '#c0e5e2';
        },
        dragendEvent (ev, index) {
            if (this.disabled) return;
            const self = this;
            let target = ev.currentTarget;
            target.style.backgroundColor = '#fff';
            let list = document.getElementsByClassName('table-row');
            list = [].slice.call(list, 0);
            this.sortArr = [];
            list.forEach(item => {
                this.tableData.forEach(i => {
                    if (item.children[1] && +item.children[1].innerText === +i[this.tablekey]) this.sortArr.push(i[this.tablekey]);
                })
            })
            this.sortHandle(index);
            ev.preventDefault();
        },
        dragenterEvent (ev) {
            if (this.disabled) return;
            const self = this;
            let target = ev.currentTarget;
            if (self.dragElement !== target) {
                target.parentNode.insertBefore(self.dragElement, target);
            }
        },
        dragleaveEvent (ev) {
            if (this.disabled) return;
            const self = this;
            let target = ev.currentTarget;
            if (self.dragElement !== target) {
                if (self.lock) {
                    target.parentNode.appendChild(self.dragElement);
                    self.lock = false;
                } else {
                    self.lock = true;
                }
            }
        },
        dragoverEvent (ev) {
            if (this.disabled) return;
            ev.preventDefault();
        },
        // 排序
        sortHandle (index) {
            if (this.disabled) return;
            this.curIndex = this.sortArr.findIndex(item => item === this.tableData[index].type_id)
            this.$emit('sortHandle', this.sortArr, this.curIndex, this.keyId);
        },
        // 编辑
        editRow (row) {
            this.$emit('editHandle', row, this.keyId)
        },
        // 删除
        delRow (row) {
            this.$emit('delRow', row, this.keyId)
        },
        // 修改排序
        changeSort (row) {
            this.$emit('changeSort', row)
        },
        // 选中当前行
        changeRow (index) {
            this.curIndex = index
            this.$emit('changeRow', index, this.keyId)
        }
    }
}
</script>

<style lang="scss">
[i="drag-table"] {
    .drag-table-container {
        border: 1px solid #e7e6eb;
        width: 100%;
        .table-head {
            width: 100%;
            overflow: hidden;
            border-bottom: 1px solid #e7e6eb;
            background: #f9f9f9;
            color: #63676b;
            display: flex;
            padding: 10px;
            .head-item.full {
                flex: 2;
            }
            div {
                flex: 1;
                display: flex;
                justify-content: center;
                word-wrap: normal;
                text-overflow: ellipsis;
                vertical-align: middle;
                box-sizing: border-box;
                position: relative;
                width: 100%;
                font-weight: 800;
            }
        }
        .table-body {
            width: 100%;
            overflow: hidden;
            background: #fff;
            color: #63676b;
            .table-row {
                display: flex;
                border-bottom: 1px solid #e7e6eb;
                padding: 10px;
                word-wrap: normal;
                text-overflow: ellipsis;
                vertical-align: middle;
                box-sizing: border-box;
                position: relative;
                width: 100%;
                cursor: pointer;
                .row-item.full {
                    flex: 2;
                }
                div {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    a{
                        font-size: 18px;
                        color: #009688;
                    }
                }
            }
            .cur {
                background: #e7e6eb;
            }
            .table-row:last-child{
                border-bottom: 0;
            }
        }
    }
    .update-input{
        border: 1px solid #cccccc;
        width: 45px;
        text-align: center;
    }
}
</style>
