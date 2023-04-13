<template>
    <div>
        <div id="up_div" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <a-upload accept=".xml" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的类图(xml格式) </a-button>
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
        <div class="bd">
            <h2>分析结果展示</h2>
            <a-table :columns="columns" :data-source="dataList">
                <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
        </div>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
const dataList = []
const columns=[
    {
        title: '类名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
    },
    {
        title: '类规模度量CS',
        dataIndex: 'CS',
        key: 'CS',
        scopedSlots: { customRender: 'CS' },
    },
    {
        title: '方法重写数NOO',
        dataIndex: 'NOC',
        key: 'NOO',
        scopedSlots: { customRender: 'NOO' },
    },
    {
        title: '增加方法数目NOA',
        dataIndex: 'NOA',
        key: 'NOA',
        scopedSlots: { customRender: 'NOA' },
    },
    {
        title: '子类数目NOC',
        dataIndex: 'NOC',
        key: 'NOC',
        scopedSlots: { customRender: 'NOC' },
    },
    {
        title: '继承树深度DIT',
        dataIndex: 'DIT',
        key: 'DIT',
        scopedSlots: { customRender: 'DIT' },
    },
]
export default {
    data(){
        return{
            fileList: [],
            uploading: false,
            dataList:[],
            columns
        }
    },
    methods:{
        ...mapActions({
            getClassDiag_:'UMLClass/getClassDiag'
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
            this.getClassDiag_(formData).then((res)=>{
                this.dataList = []
                for(let i = 0; i< res.length;i++){
                    this.dataList.push(res[i])
                }
                console.log('xuanxuan', this.dataList)
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