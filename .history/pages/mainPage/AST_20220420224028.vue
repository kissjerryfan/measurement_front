<template>
    <div>
        <div id="up_div" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <a-upload accept=".java" :file-list="fileList" @change="handleChange" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的代码文件(java格式) </a-button>
            </a-upload>
            <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-right: 16px;float:right"
                @click="handleUpload">
                {{ uploading ? '分析中' : '开始分析' }}
            </a-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            fileList: [],
            uploading: false,
        }
    },
    methods:{
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
    }
}
</script>
<style lang="scss" scoped>
.bd{
    margin: 2vh;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
}
</style>