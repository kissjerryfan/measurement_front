<template>
    <div>
        <div class="FP">
            <h2>UFC计算</h2>
            <a-table :columns="fp_ufc_columns" :data-source="fp_ufc_data" :pagination="false" bordered>
                <template v-for="col in ['type']" :slot="col" slot-scope="text">
                    <div :key="col">
                        <template>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-for="col in ['simple', 'average', 'complex']" :slot="col" slot-scope="text, record">
                    <div :key="col">
                        <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                        @change="e => ufc_handleChange(e.target.value, record.key, col)" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                        <a @click="() => ufc_save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => ufc_cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                        </span>
                        <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => ufc_edit(record.key)">Edit</a>
                        </span>
                    </div>
                </template>
            </a-table>
            <h3 style="margin-top:8px">计算得到UFC为{{fp_ufc}}</h3>
        </div>
        <div class="FP">
          <h2>VAF计算</h2>
            <a-table :columns="fp_vaf_columns" :data-source="fp_vaf_data" :pagination="false" bordered>
                <template v-for="col in ['id', 'feature', 'description']" :slot="col" slot-scope="text">
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
          <h3 style="margin-top:8px">计算得到VAF为{{fp_vaf}}</h3>
        </div>
        <div class="FP">
          <h3 style="margin-top:8px">该项目功能点度量结果FP为{{Math.ceil(fp_vaf * fp_ufc * 100) / 100.0}}</h3>
        </div>
    </div>
</template>
<script>
const fp_ufc_columns = [
  {
    title: '请在表格中填入对应的个数',
    dataIndex: 'type',
    width: '30%',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: 'Simple',
    dataIndex: 'simple',
    width: '20%',
    scopedSlots: { customRender: 'simple' },
  },
  {
    title: 'Average',
    dataIndex: 'average',
    width: '20%',
    scopedSlots: { customRender: 'average' },
  },
  {
    title: 'Complex',
    dataIndex: 'complex',
    width: '20%',
    scopedSlots: { customRender: 'complex' },
  },
  {
    title: '编辑',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const fp_ufc_data = [
    {
        'key': 0,
        'type': 'External Inputs',
        'simple': 0,
        'average': 0,
        'complex': 0
    },
    {
        'key': 1,
        'type': 'External Outputs',
        'simple': 0,
        'average': 0,
        'complex': 0
    },
    {
        'key': 2,
        'type': 'External Queries',
        'simple': 0,
        'average': 0,
        'complex': 0
    },
    {
        'key': 3,
        'type': 'External Interfaces Files',
        'simple': 0,
        'average': 0,
        'complex': 0
    },
    {
        'key': 4,
        'type': 'Internal Logic Files',
        'simple': 0,
        'average': 0,
        'complex': 0
    }
];

const fp_vaf_columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '5%',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '系统特征',
    dataIndex: 'feature',
    width: '10%',
    scopedSlots: { customRender: 'feature' },
  },
  {
    title: '简单描述',
    dataIndex: 'description',
    width: '70%',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '等级',
    dataIndex: 'level',
    width: '8%',
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
        'id': 1,
        'feature': '数据通讯',
        'description': '软件系统的信息交互情况',
        'level': 0
    },
    {
        'key': 1,
        'id': 2,
        'feature': '数据分布处理',
        'description': '软件系统如何处理分布数据',
        'level': 0
    },
    {
        'key': 2,
        'id': 3,
        'feature': '系统性能',
        'description': '用户对软件系统的响应时间和吞吐量的要求',
        'level': 0
    },
    {
        'key': 3,
        'id': 4,
        'feature': '使用配置',
        'description': '当前硬件平台的使用度',
        'level': 0
    },
    {
        'key': 4,
        'id': 5,
        'feature': '事务处理频率',
        'description': '每日、每周以及每月等的事务处理情况',
        'level': 0
    },
    {
        'key': 5,
        'id': 6,
        'feature': '在线数据输入',
        'description': '在线信息输入的百分比',
        'level': 0
    },
    {
        'key': 6,
        'id': 7,
        'feature': '操作便利',
        'description': '软件系统是否为用户操作提供便利',
        'level': 0
    },
    {
        'key': 7,
        'id': 8,
        'feature': '在线更新',
        'description': '多少ILF通过在线事务更新',
        'level': 0
    },
    {
        'key': 8,
        'id': 9,
        'feature': '处理复杂度',
        'description': '软件系统是否广泛使用逻辑和数学运算',
        'level': 0
    },
    {
        'key': 9,
        'id': 10,
        'feature': '复用性',
        'description': '本软件系统是否为多个应用系统复用',
        'level': 0
    },
    {
        'key': 10,
        'id': 11,
        'feature': '安装难易',
        'description': '版本维护和安装的难易程度',
        'level': 0
    },
    {
        'key': 11,
        'id': 12,
        'feature': '运行维护',
        'description': '软件系统的启动、备份以及恢复的难易程度',
        'level': 0
    },
    {
        'key': 12,
        'id': 13,
        'feature': '多站点支持',
        'description': '软件系统是否用于多组织和多站点',
        'level': 0
    },
    {
        'key': 13,
        'id': 14,
        'feature': '变更支持',
        'description': '软件系统对查询、统计以及变更维护的支持',
        'level': 0
    },
    
];
export default {
  data() {
    this.cacheData = fp_ufc_data.map(item => ({ ...item }));
    this.cacheData_ = fp_vaf_data.map(item => ({ ...item }));
    return {
      fp_ufc_data,
      fp_ufc_columns,
      fp_vaf_data,
      fp_vaf_columns,
      editingKey: '',
      fp_ufc: 0,
      fp_vaf: 0.65
    };
  },
  methods: {
    calculate_fp_ufc(){
        this.fp_ufc = fp_ufc_data[0].simple * 3 + fp_ufc_data[0].average * 4 + fp_ufc_data[0].complex * 6 +
                    fp_ufc_data[1].simple * 4 + fp_ufc_data[1].average * 5 + fp_ufc_data[1].complex * 7 +
                    fp_ufc_data[2].simple * 3 + fp_ufc_data[2].average * 4 + fp_ufc_data[2].complex * 6 +
                    fp_ufc_data[3].simple * 5 + fp_ufc_data[3].average * 7 + fp_ufc_data[3].complex * 10 +
                    fp_ufc_data[4].simple * 7 + fp_ufc_data[4].average * 10 + fp_ufc_data[4].complex * 15
    },
    calculate_fp_vaf(){
        this.fp_vaf = 0
        for(let i = 0;i<14;i++){
          this.fp_vaf += fp_vaf_data[i].level * 1
        }
        this.fp_vaf = this.fp_vaf * 0.01 + 0.65
    },
    ufc_handleChange(value, key, column) {
      const newData = [...this.fp_ufc_data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.fp_ufc_data = newData;
      }
    },
    ufc_edit(key) {
      const newData = [...this.fp_ufc_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.fp_ufc_data = newData;
      }
    },
    ufc_save(key) {
      const newData = [...this.fp_ufc_data];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.fp_ufc_data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
      this.calculate_fp_ufc()
    },
    ufc_cancel(key) {
      const newData = [...this.fp_ufc_data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.fp_ufc_data = newData;
      }
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
  },
};
</script>
<style lang="scss" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.FP{
    margin: 2vh;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
}
</style>