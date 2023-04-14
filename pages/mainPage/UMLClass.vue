<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15">
        <ElCard shadow="hover" style="margin-top: 32px;width: 100%">
          <div slot="header" class="clearfix">
            <span>类图分析结果概览</span>
          </div>
          <div id="radarChart" style="height: 500px"></div>
        </ElCard>
      </el-col>

      <el-col :span="9">
        <ElCard shadow="hover" style="margin: 32px 32px 0 0;height: 260px">
          <div slot="header" class="clearfix">
            <span>用例图上传处</span>
          </div>
          <div style="height: 120px">
            <el-upload
              action=""
              class="upload-demo"
              accept=".xml"
              :limit="1"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传XML文件</div>
            </el-upload>
          </div>

          <div>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-data-analysis"
              :disabled="fileList.length === 0"
              :loading="uploading"
              @click="handleUpload">
              {{ uploading ? '分析中' : '开始分析' }}
            </el-button>
          </div>
        </ElCard>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <ElCard shadow="hover" style="margin: 32px 32px 32px 0;">
          <div slot="header" class="clearfix">
            <span>详细结果展示</span>
          </div>
          <div class="bd">
            <a-table
              :columns="columns"
              :row-key="record => record.name"
              :data-source="dataList">
              <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
        </ElCard>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import { mapActions} from 'vuex'

import * as echarts from 'echarts';

const dataList = []
const columns=[
    {
        title: '类名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
    },
    {
      title: '对象间的耦合度CBO',
      dataIndex: 'CBO',
      key: 'CBO',
      scopedSlots: { customRender: 'CBO' },
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
      radarLoading: true,
      fileList: [],
      uploading: false,
      dataList:[],
      columns,
      radarData: {
        legend: {
          data: [],
        },
        tooltip: {},
        series: [],
        radar: {
          indicator: [],
        }
      },
      radarChart: {}
    }
  },
  mounted() {
    this.radarChart = echarts.init(document.getElementById('radarChart'))
  },
  methods:{
    ...mapActions({
      getClassDiag_:'UMLClass/getClassDiag'
    }),

    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      this.uploading = true;
      fileList.forEach(file => {
          formData.append('file', file);
      });

      console.log('gege', formData.get('file'), formData)

      this.getClassDiag_(formData).then((res)=>{
        //首先获取所有的类
        this.radarData.legend.data = res.map(cls => cls.name);
        //接着获取所有度量的最大值
        let cboMax = this.getMax(res, "CBO");
        let csMax = this.getMax(res, "CS");
        let ditMax = this.getMax(res, "DIT");
        let noaMax = this.getMax(res, "NOA");
        let nocMax = this.getMax(res, "NOC");
        let nooMax = this.getMax(res, "NOO");

        //设置每项指标的最大值
        this.radarData.radar.indicator = [
          {name: 'CBO', max: cboMax},
          {name: 'CS', max: csMax},
          {name: 'DIT', max: ditMax},
          {name: 'NOA', max: noaMax},
          {name: 'NOC', max: nocMax},
          {name: 'NOO', max: nooMax},
        ]

        this.radarData.series = [{
          type: 'radar',
          data: res.map(cls => {
            return {
              value: [cls.CBO, cls.CS, cls.DIT, cls.NOA, cls.NOC, cls.NOO],
              name: cls.name
            }
          })
        }]

        this.radarChart.setOption(this.radarData);

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

    getMax(res, key){
      let ans = 0;
      for(let i = 0;i < res.length;i++){
        if(res[i][key] > ans){
          ans = res[i][key];
        }
      }
      return ans;
    },

    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleRemove(file) {
      if (file && file.status==="success") {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      }
    },
    beforeRemove(file, fileList) {
      if (file && file.status==="success") {
        console.log(fileList);
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
