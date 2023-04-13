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
            <a-table :columns="columns" :data-source="dataList" class="components-table-demo-nested">
                <template #expandedRowRender='dataList'>
                <a-table 
                    slot="expandedRowRender"
                    :columns="innerColumns"
                    :data-source="dataList.innerData"
                    :pagination="false">
                </a-table>
                </template>
            </a-table>
        </div> 
    </div>
</template>
<script>
import { mapActions} from 'vuex'
const dataList = []
const innerData = []
const columns =[
    {
        title: '类名',
        dataIndex: 'classname',
        key: 'classname',
        scopedSlots: { customRender: 'classname' },
    },
    {
        title: '类响应数量RFC',
        dataIndex: 'rfc',
        key: 'rfc',
        scopedSlots: { customRender: 'rfc' },
    },
    {
        title: '类缺乏内聚性LCOM',
        dataIndex: 'lcom',
        key: 'lcom',
        scopedSlots: { customRender: 'lcom' },
    },
]
const innerColumns = [
    {
        title: '方法名',
        dataIndex: 'method',
        key: 'method',
        scopedSlots: { customRender: 'method' },
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
            LLOC: 0,
            NCLOC: 0, 
            PLOC: 0,
            dataList,
            columns,
            innerColumns,
            innerData
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
            this.getLoc_(formData).then((res)=>{
                this.LLOC = res.LLOC
                this.PLOC = res.PLOC
                this.CLOC = res.CLOC
                this.NCLOC = res.NCLOC
                this.uploading = false
            },(error)=>{
            })
            this.getAST_(formData).then((res)=>{
                this.dataList = []
                this.innerData = []
                for(let i = 0;i<res.length;i++){
                    let temp = {'key':i, 'classname':res[i].classname, 'lcom': res[i].lcom, 'rfc':res[i].rfc, 'innerData': []}
                    let k = 0
                    let ms = []
                    for(let mtd in res[i].raw){
                        let s = ''
                        for(let j = 0;j<res[i].raw[mtd].call.length;j++){
                            s += res[i].raw[mtd].call[j] + ', '
                        }
                        if(s!='') s = s.substr(0, s.length-2)
                        let s1 = ''
                        for(let j = 0;j<res[i].raw[mtd].reference.length;j++){
                            s1 += res[i].raw[mtd].reference[j] + ', '
                        }
                        if(s1!='') s1 = s1.substr(0, s1.length-2)
                        let md = {'key': k, 'method': mtd, 'call': s, 'reference': s1}
                        ms.push(md)
                        this.innerData.push(md)
                    }
                    temp['innerData'] = ms
                    
                    this.dataList.push(temp)
                }
            },(error)=>{
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