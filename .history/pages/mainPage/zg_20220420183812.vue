<template>
    <div>
        <div class="FP">
            <h2>UFC计算</h2>
            <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
                <template
                v-for="col in ['type', 'simple', 'average', 'complex']"
                :slot="col"
                slot-scope="text, record, index"
                >
                <div :key="col">
                    <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                    {{ text }}
                    </template>
                </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                <div class="editable-row-operations">
                    <span v-if="record.editable">
                    <a @click="() => save(record.key)">Save</a>
                    <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                        <a>Cancel</a>
                    </a-popconfirm>
                    </span>
                    <span v-else>
                    <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
                    </span>
                </div>
                </template>
            </a-table>
        </div>
    </div>
</template>
<script>
const columns = [
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

const data = [
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
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.data = newData;
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
    border: 2px solid;
    border-color: rgba(0,0,0,0.1);
    padding: 2px;
}
</style>