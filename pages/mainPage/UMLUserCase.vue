<template>
    <div>
        <div id="upld" class="bd" style="height:15vh">
            <h2>文件上传处</h2>
            <a-upload accept=".oom" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" style="float:left">
                <a-button> <a-icon type="upload" /> 选择要上传的用例图(oom格式) </a-button>
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
         <div id="uuc_div" class="bd" style="height:12vh">
            <h2>UUC计算</h2>
            <h3 style="float:left">简单用例个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="sp_value_uc" :min="0" :max="1000" @change="onChange_uc" />
            <h3 style="float:left;margin-left:10px">普通用例个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="nm_value_uc" :min="0" :max="1000" @change="onChange_uc" />
            <h3 style="float:left;margin-left:10px">复杂用例个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="cp_value_uc" :min="0" :max="1000" @change="onChange_uc" />
            <h3 style="margin-right:20px;margin-top:3px;float: right">该用例图所表示的UUC为{{uuc}}</h3>
            <h3 style="float:left;margin-left:10px;color:red">{{warning_uc}}</h3>
        </div>
        <div id="uaw_div" class="bd" style="height:12vh">
            <h2>UAW计算</h2>
            <h3 style="float:left">简单角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="sp_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="float:left;margin-left:10px">普通角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="nm_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="float:left;margin-left:10px">复杂角色个数</h3> <a-input-number style="float:left;margin-left:10px" id="inputNumber" v-model="cp_value" :min="0" :max="1000" @change="onChange" />
            <h3 style="margin-right:20px;margin-top:3px;float: right">该用例图所表示的UAW为{{uaw}}</h3>
            <h3 style="float:left;margin-left:10px;color:red">{{warning}}</h3>
        </div>
        <div id="tcf_div" class="bd">
            <h2>TCF计算</h2>
            <a-table :columns="fp_vaf_columns" :data-source="fp_vaf_data" :pagination="false" bordered>
                <template v-for="col in ['id', 'feature', 'weight']" :slot="col" slot-scope="text">
                    <div :key="col">
                        <template>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-for="col in ['level']" :slot="col" slot-scope="text, record">
                    <div :key="col">
                        <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                        @change="e => vaf_handleChange(e.target.value, record.key, col)" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                        <a @click="() => vaf_save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => vaf_cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                        </span>
                        <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => vaf_edit(record.key)">Edit</a>
                        </span>
                    </div>
                </template>
            </a-table>
          <h3 style="margin-top:8px">计算得到TCF为{{tcf}}</h3>
        </div>
        <div id="ef_div" class="bd">
            <h2>EF计算</h2>
            <a-table :columns="ef_columns" :data-source="ef_data" :pagination="false" bordered>
                <template v-for="col in ['id', 'description', 'weight']" :slot="col" slot-scope="text">
                    <div :key="col">
                        <template>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-for="col in ['f']" :slot="col" slot-scope="text, record">
                    <div :key="col">
                        <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                        @change="e => ef_handleChange(e.target.value, record.key, col)" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                        <a @click="() => ef_save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => ef_cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                        </span>
                        <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => ef_edit(record.key)">Edit</a>
                        </span>
                    </div>
                </template>
            </a-table>
            <h3 style="margin-top:8px">计算得到EF为{{Math.ceil(ef * 100) / 100.0}}</h3>
        </div>
        <div class="bd">
            <h3 style="margin-top:8px">计算得到UCP为{{Math.ceil((uaw+uuc) * tcf * ef * 100) / 100.0}}</h3>
        </div>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
const ef_columns = [
  {
    title: '环境复杂性Fi',
    dataIndex: 'id',
    width: '20%',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '说明',
    dataIndex: 'description',
    width: '30%',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '权重',
    dataIndex: 'weight',
    width: '20%',
    scopedSlots: { customRender: 'weight' },
  },
  {
    title: '等级',
    dataIndex: 'f',
    width: '20%',
    scopedSlots: { customRender: 'f' },
  },
  {
    title: '编辑',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const ef_data = [
    {
        'key': 0,
        'id': 'F1',
        'description': '熟悉UML的程度',
        'weight': 1.5,
        'f': 0
    },
    {
        'key': 1,
        'id': 'F2',
        'description': '开发应用程序的经验',
        'weight': 0.5,
        'f': 0
    },
    {
        'key': 2,
        'id': 'F3',
        'description': '面向对象的经验',
        'weight': 1,
        'f': 0
    },
    {
        'key': 3,
        'id': 'F4',
        'description': '主分析师的能力',
        'weight': 0.5,
        'f': 0
    },
    {
        'key': 4,
        'id': 'F5',
        'description': '激励机制',
        'weight': 1,
        'f': 0
    },
    {
        'key': 5,
        'id': 'F6',
        'description': '需求稳定度',
        'weight': 2,
        'f': 0
    },
    {
        'key': 6,
        'id': 'F7',
        'description': '具有兼职人员',
        'weight': -1,
        'f': 0
    },
    {
        'key': 7,
        'id': 'F8',
        'description': '具有复杂编程',
        'weight': -1,
        'f': 0
    },
];
const fp_vaf_columns = [
  {
    title: '技术复杂性Ti',
    dataIndex: 'id',
    width: '20%',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '说明',
    dataIndex: 'feature',
    width: '30%',
    scopedSlots: { customRender: 'feature' },
  },
  {
    title: '权重WF',
    dataIndex: 'weight',
    width: '20%',
    scopedSlots: { customRender: 'weight' },
  },
  {
    title: '等级',
    dataIndex: 'level',
    width: '20%',
    scopedSlots: { customRender: 'level' },
  },
  {
    title: '编辑',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const fp_vaf_data = [
    {
        'key': 0,
        'id': 'T1',
        'feature': '分布式系统',
        'weight': 2,
        'level': 0
    },
    {
        'key': 1,
        'id': 'T2',
        'feature': '响应或吞吐量性能',
        'weight': 1,
        'level': 0
    },
    {
        'key': 2,
        'id': 'T3',
        'feature': '终端用户效率',
        'weight': 1,
        'level': 0
    },
    {
        'key': 3,
        'id': 'T4',
        'feature': '复杂的内部结构',
        'weight': 1,
        'level': 0
    },
    {
        'key': 4,
        'id': 'T5',
        'feature': '代码必须重用',
        'weight': 1,
        'level': 0
    },
    {
        'key': 5,
        'id': 'T6',
        'feature': '易安装性',
        'weight': 0.5,
        'level': 0
    },
    {
        'key': 6,
        'id': 'T7',
        'feature': '易用性',
        'weight': 0.5,
        'level': 0
    },
    {
        'key': 7,
        'id': 'T8',
        'feature': '可移植性',
        'weight': 2,
        'level': 0
    },
    {
        'key': 8,
        'id': 'T9',
        'feature': '易更改性',
        'weight': 1,
        'level': 0
    },
    {
        'key': 9,
        'id': 'T10',
        'feature': '并发性',
        'weight': 1,
        'level': 0
    },
    {
        'key': 10,
        'id': 'T11',
        'feature': '特殊的安全性',
        'weight': 1,
        'level': 0
    },
    {
        'key': 11,
        'id': 'T12',
        'feature': '提供第三方接口',
        'weight': 1,
        'level': 0
    },
    {
        'key': 12,
        'id': 'T13',
        'feature': '需要特别的用户培训',
        'weight': 1,
        'level': 0
    }
];
export default {
  data() {
    this.cacheData = ef_data.map(item => ({ ...item }));
    this.cacheData_ = fp_vaf_data.map(item => ({ ...item }));
    return {
      ef_columns,
      ef_data,
      fp_vaf_data,
      fp_vaf_columns,
      editingKey: '',
      sp_value:0,
      nm_value:0,
      cp_value:0,
      sp_value_uc:0,
      nm_value_uc:0,
      cp_value_uc:0,
      fileList: [],
      uploading: false,
      uuc_count:0,
      uaw_count:0,
      uuc:0,
      uaw:0,
      tcf:0.6,
      ef:1.4,
      ucp:0,
      warning_uc:'',
      warning:''
    };
  },
  methods: {
    ...mapActions({
            getUUCandUAW:'UMLUserCase/getUUCandUAW'
        }),
    calculate_ef(){
        this.ef = 0
        for(let i = 0; i < 8; i++){
            this.ef += (ef_data[i].weight * 1) * (ef_data[i].f * 1)
        }
        this.ef = this.ef * -0.03 + 1.4
    },
    calculate_fp_vaf(){
        this.tcf = 0
        for(let i = 0;i<13;i++){
          this.tcf += (fp_vaf_data[i].level * 1) * (fp_vaf_data[i].weight * 1)
        }
        this.tcf = this.tcf * 0.01 + 0.6
    },
    vaf_handleChange(value, key, column) {
      const newData = [...this.fp_vaf_data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.fp_vaf_data = newData;
      }
    },
    vaf_edit(key) {
      const newData = [...this.fp_vaf_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.fp_vaf_data = newData;
      }
    },
    vaf_save(key) {
      const newData = [...this.fp_vaf_data];
      const newCacheData = [...this.cacheData_];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.fp_vaf_data = newData;
        Object.assign(targetCache, target);
        this.cacheData_ = newCacheData;
      }
      this.editingKey = '';
      this.calculate_fp_vaf()
    },
    vaf_cancel(key) {
      const newData = [...this.fp_vaf_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData_.find(item => key === item.key));
        delete target.editable;
        this.fp_vaf_data = newData;
      }
    },
    ef_handleChange(value, key, column) {
      const newData = [...this.ef_data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.ef_data = newData;
      }
    },
    ef_edit(key) {
      const newData = [...this.ef_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.ef_data = newData;
      }
    },
    ef_save(key) {
      const newData = [...this.ef_data];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.ef_data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
      this.calculate_ef()
    },
    ef_cancel(key) {
      const newData = [...this.ef_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.ef_data = newData;
      }
    },
    onChange_uc(){
      if(this.uuc_count == this.sp_value_uc+this.nm_value_uc+this.cp_value_uc){
        this.uuc = this.sp_value_uc * 5 + this.nm_value_uc * 10 + this.cp_value_uc * 15
        this.warning_uc = ''
      }
      else
        this.warning_uc = '请检查用例个数是否填写错误,图中用例为'+this.uuc_count+'个'
    },
    onChange(){
      if(this.uaw_count == this.sp_value+this.nm_value+this.cp_value)
      {
        this.uaw = this.sp_value * 1 + this.nm_value * 2 + this.cp_value * 3
        this.warning = ''
      }
      else
        this.warning = '请检查角色个数是否填写错误,图中角色为'+this.uaw_count+'个'
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
            formData.append('file', file);
        });
        console.log('gege', formData.get('file'), formData)
        this.getUUCandUAW(formData).then((res)=>{
            console.log('uc',res)
            this.uaw_count = res.actor_count
            this.uuc_count = res.use_case_count
            this.uploading = false
        },(error)=>{
            console.log('uc',error)
        })
        this.uploading = true;
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