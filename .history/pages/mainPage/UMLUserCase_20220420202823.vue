<template>
    <div>
        <div id="upload_div" class="bd">
            <a-upload
                name="file"
                :multiple="true"
                :headers="headers"
                @change="handleChange"
                accept=".xml"
            >
                <a-button> <a-icon type="upload" /> 点击此处上传用例图的xml文件 </a-button>
            </a-upload>
            <a-button>开始分析</a-button>
            <h3>该用例图所表示的UUC为{{}}</h3>
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
      headers: {
        authorization: 'authorization-text',
      },
      uuc:0,
      uaw:0,
      tcf:0,
      ef:0,
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
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