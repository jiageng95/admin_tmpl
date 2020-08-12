<template>
  <div>
    <script :id="editorId" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
        ready: false
      }
    },
    props: {
      editorId: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted () {
      const _this = this;
      this.$nextTick(() => {
        this.editor = UE.getEditor(this.editorId, this.config); // 初始化UE
        this.editor.addListener('ready', function () {
          _this.ready = true;
          _this.$emit('ready', this.editor);
          _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
          if (_this.disabled) {
            this.setDisabled();
          }
        });
    })
    },
    watch: {
      defaultMsg (newvalue, oldvalue) {
        if (newvalue && this.ready) {
          this.editor.setContent(newvalue);
        }
      }
    },
    methods: {
      getUEContent () { // 获取内容方法
        return this.editor.getContent();
      }
    },
    destroyed () {
      this.editor.destroy();
    }
  }
</script>
