<template>
    <div>
        <div id="up_div" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <a-upload accept=".java" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
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
        <div class="bd">
            <h2>代码行分析结果</h2>
            <h3>该java文件中, 注释代码行共{{CLOC}}行, 非注释代码行共{{NCLOC}}行, 物理代码行共{{PLOC}}行, 逻辑代码行共{{LLOC}}行</h3>
            <h3>代码注释密度为{{CLOC+NCLOC == 0?0:Math.ceil(CLOC/(CLOC+NCLOC)*100)/100.0}}</h3>
        </div>
        <div class="bd">
            <h2>抽象语法树分析结果</h2>
            <a-table :columns="columns" :data-source="dataList">
                <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
        </div> 
    </div>
</template>
<script>
import { mapActions} from 'vuex'
const dataList = []
const columns =[
    {
        title: '方法名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
    },
    {
        title: '调用的外部方法',
        dataIndex: 'call',
        key: 'call',
        scopedSlots: { customRender: 'call' },
    },
    {
        title: '使用的变量',
        dataIndex: 'reference',
        key: 'reference',
        scopedSlots: { customRender: 'reference' },
    },
]
export default {
    data(){
        return{
            fileList: [],
            uploading: false,
            CLOC: 0, 
            LCOM: 0, 
            LLOC: 0,
            NCLOC: 0, 
            PLOC: 0,
            className:'',
            RFC:0,
            dataList,
            columns
        }
    },
    methods:{
        ...mapActions({
            getLoc_:'AST/getLoc',
            getAST_:'AST/getAST'
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
            this.getLoc_(formData).then((res)=>{
                console.log('loc',res)
                this.LLOC = res.LLOC
                this.PLOC = res.PLOC
                this.CLOC = res.CLOC
                this.NCLOC = res.NCLOC
                this.getAST_(formData).then((res)=>{
                    this.dataList = []
                    this.LCOM = res.lcom
                    this.RFC = res.rfc
                    this.className = res.classname
                    for(let i = 0; i<res.raw.length;i++){
                        let temp = {'key': i, 'call':'', 'reference':'', 'name': res.raw[i].key}
                        let s = ''
                        if(res.raw[i].call != []){
                            console.log('aaxx', res.raw[i].call)
                            for(let j = 0;j<res.raw[i].call.length;j++) s += res.raw[i].call[j] + ', '
                            temp['call'] = s.substring(0, s.length-2)
                        }
                        s = ''
                        if(res.raw[i].reference != []){
                            for(let j = 0;j<res.raw[i].reference.length;j++) s += res.raw[i].reference[j] + ', '
                            temp['reference'] = s.substring(0, s.length-2)
                        }
                        this.dataList.push(temp)
                    }
                    console.log('ast',res)
                },(error)=>{
                    console.log('ast',error)
                })
                this.uploading = false
            },(error)=>{
                console.log('loc',error)
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