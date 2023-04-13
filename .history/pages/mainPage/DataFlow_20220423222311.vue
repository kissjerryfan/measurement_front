<template>
    <div>
        <div id="up_div" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <!-- <a-upload accept=".oom" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的数据流图(oom格式) </a-button>
            </a-upload> -->
            <form action="upload">
                <input type="file" name="dataflow" id="uploder"/>
                <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-right: 16px;float:right"
                @click="handleUpload">
                {{ uploading ? '分析中' : '开始分析' }}
            </a-button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
    data(){
        return{
            file: null,
            uploading: false,
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
            
            fileList.forEach(file => {
                console.log('aaa',file)
                formData.append('file', file);
            });
            console.log(formData)
            this.getMcCabe_(formData).then((res)=>{
                console.log('df',res)
            },(error)=>{
                console.log('df',error)
            })
            this.uploading = true;
        },
        upload(){

        }
    },
    mounted(){
        const fu = document.getElementById('uploader')
        fu.addEventListener('change', (event)=>{
            console.log('aaa', event.target.files)
        })
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