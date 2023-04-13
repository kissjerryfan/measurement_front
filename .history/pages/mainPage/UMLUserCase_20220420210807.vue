<template>
    <div>
        <div id="uuc_div" class="bd" style="height:15vh">
            <h2>UUC计算</h2>
            <a-upload accept=".xml" :file-list="fileList" @change="handleChange" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的用例图(xml格式) </a-button>
            </a-upload>
            <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-right: 16px;float:right"
                @click="handleUpload">
                {{ uploading ? '分析中' : '开始分析' }}
            </a-button>
            <h3 style="margin-right:20px;margin-top:3px;float: right">该用例图所表示的UUC为{{uuc}}</h3>
        </div>
        <div id="uaw_div" class="bd" style="height:12vh">
            <h2>UAW计算</h2>
            <h3 style="float:left">简单角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="sp_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="float:left;margin-left:10px">普通角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="nm_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="float:left;margin-left:10px">复杂角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="cp_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="margin-right:20px;margin-top:3px;float: right">该用例图所表示的UAW为{{uaw}}</h3>
        </div>
        <div id="tcf_div" class="bd">

        </div>
        <div id="ef_div" class="bd">

        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      sp_value:0,
      nm_value:0,
      cp_value:0,
      fileList: [],
      uploading: false,
      uuc:0,
      uaw:0,
      tcf:0,
      ef:0,
    };
  },
  methods: {
    onChange(){
        this.uaw = this.sp_value * 1 + this.nm_value * 2 + this.cp_value * 3
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files[]', file);
      });
      this.uploading = true;
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      this.fileList = fileList;
    },
  },
};
</script>
<style lang="scss" scoped>
.bd{
    margin: 2vh;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
}
</style>