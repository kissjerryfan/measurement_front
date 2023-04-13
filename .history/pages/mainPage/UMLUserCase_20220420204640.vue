<template>
    <div>
        <div id="upload_div" class="bd" style="height:9.5vh">
            <a-upload :file-list="fileList" @change="handleChange" :remove="handleRemove" :before-upload="beforeUpload">
                <a-button> <a-icon type="upload" /> Select File </a-button>
            </a-upload>
            <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-top: 16px"
                @click="handleUpload">
                {{ uploading ? 'Uploading' : 'Start Upload' }}
            </a-button>
            <h3 style="margin-right:20px;margin-top:3px;float: right">该用例图所表示的UUC为{{uuc}}</h3>
        </div>
        <div id="uaw_div" class="bd">

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
      fileList: [],
      uploading: false,
      uuc:0,
      uaw:0,
      tcf:0,
      ef:0,
    };
  },
  methods: {
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