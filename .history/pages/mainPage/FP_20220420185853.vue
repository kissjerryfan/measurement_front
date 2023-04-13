<template>
    <div>
        <div class="FP">
            <h2>UFC计算</h2>
            <a-table :columns="fp_ufc_columns" :data-source="fp_ufc_data" :pagination="false" bordered>
                <template v-for="col in ['type']" :slot="col" slot-scope="text, record, index">
                    <div :key="col">
                        <template>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-for="col in ['simple', 'average', 'complex']" :slot="col" slot-scope="text, record, index">
                    <div :key="col">
                        <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                        @change="e => ufc_handleChange(e.target.value, record.key, col)" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
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
          <h3 style="margin-top:8px">计算得到VAF为{{fp_ufc}}</h3>
        </div>
        <h3 style="margin-top:8px">该项目功能点度量结果FP为{{fp_ufc}}</h3>
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
export default {
  data() {
    this.cacheData = fp_ufc_data.map(item => ({ ...item }));
    return {
      fp_ufc_data,
      fp_ufc_columns,
      editingKey: '',
      fp_ufc: 0,
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