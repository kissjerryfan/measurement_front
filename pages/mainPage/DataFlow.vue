<template>
    <div>
        <div id="up_div" class="bd" style="height:auto;display: inline-block;width: 97.5%;text-align: center;">
            <h2 style="margin-top:8px">控制流图圈复杂度度量</h2>
            <!-- <a-upload accept=".oom" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的控制流图(oom格式) </a-button>
            </a-upload> -->
            <el-upload
                class="upload-demo"
                drag
                accept=".oom"
                :file-list="fileList"
                :remove="handleRemove"
                :before-upload="beforeUpload"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将控制流图(oom格式)拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <!-- <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-right: 16px;float:right"
                @click="handleUpload">
                {{ uploading ? '分析中' : '开始分析' }}
            </a-button> -->
            <el-button type="primary" style="margin-top: 5px" :disabled="fileList.length === 0"
                     :loading="uploading" @click="handleUpload" round>{{ uploading ? '分析中' : '开始分析' }}
            </el-button>
            <div >
                <h2 style="margin-top:8px">该控制流图的圈复杂度为:{{mccabe}}</h2>
            </div>
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