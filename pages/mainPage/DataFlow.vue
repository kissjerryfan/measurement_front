<template>
    <div>
        <div id="up_div" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <a-upload accept=".oom" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的控制流图(oom格式) </a-button>
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
        <div class="bd" style="padding-top:20px">
            <h2>经过分析,该控制流图的McCabe圈复杂度为{{mccabe}}</h2>
        </div>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
    data(){
        return{
            fileList: [],
            uploading: false,
            mccabe: 0
        }
    },
    methods:{
        ...mapActions({
            getMcCabe_:'DataFlow/getMcCabe'
        }),
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
            this.uploading = true;
            fileList.forEach(file => {
                formData.append('file', file);
            });
            console.log('gege', formData.get('file'), formData)
            this.getMcCabe_(formData).then((res)=>{
                console.log('df',res)
                this.mccabe = res
                this.uploading = false
            },(error)=>{
                console.log('df',error)
            })
            
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