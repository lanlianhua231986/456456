<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>人物资料列表</span>
    </div>
    <!-- 新增 -->
    <el-button
      style="float: right"
      type="primary"
      icon="el-icon-plus"
      width="20px"
      @click="addHandle"
    ></el-button>
    <el-table border stripe :data="list" row-key="id">
      <!-- ：data表示绑定list数组，prop表示绑定数组中的哪个属性 -->
      <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
      <el-table-column label="名字" prop="name" width="100" align="center"></el-table-column>
      <el-table-column label="头像" width="150">
        <template scope="scope">
          <img :src="scope.row.img" :alt="scope.row.name" style="max-width: 100%" />
        </template>
      </el-table-column>
      <el-table-column label="简介" prop="desc" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="mini"
            plain
            round
            @click="editOne(scope.row)"
            >修改</el-button
          >
          <el-popconfirm title="确定删除此项吗？" @confirm="delOne(scope.row)">
            <el-button slot="reference" icon="el-icon-delete" type="danger" size="mini" plain round
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="isShow">
      <!-- rules 表示验证规则 model 表示数据 ref 用来获取组件dom元素-->
      <!-- el-form-item 每一项需要一个prop属性在表单验证的时候使用 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="img">
          <el-input v-model="ruleForm.img"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :plain="true" @click="submitForm('ruleForm', ruleForm)">{{
            current ? btnName : '保存'
          }}</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
export default {
  // import { vue} from "";
  name: 'HomeView',
  data() {
    return {
      isShow: false,
      btnName: '创建',
      current: true /* 1表示创建 */,
      list: [
        {
          id: 1,
          name: '卡卡西',
          desc: '复制忍者旗木卡卡西',
          img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.ZfD4h3n_zxSG6kvKR-52YwHaFj?w=279&h=209&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        },
        {
          id: 2,
          name: '那撸多',
          desc: '猪脚',
          img: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.BIctWxuBvVgMXsn-BWqSmAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        },
        {
          id: 3,
          name: '张娜英',
          desc: '老婆',
          img: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.2r5X9_u_LKAHLzsNJWUi9wHaEo&w=176&h=170&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2',
        },
        {
          id: 4,
          name: '唔西迪西',
          desc: '花园宝宝第一战将',
          img: 'https://ts3.cn.mm.bing.net/th?id=OIP-C.bf-AB31GSdARQ0M2b_d5nAAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2',
        },
      ],
      ruleForm: {
        name: '',
        img: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        desc: { required: true, message: '简介不能为空', trigger: 'blur' },
      },
    };
  },
  methods: {
    editOne(item) {
      console.log('修改', item.name);
      this.isShow = true;
      this.current = false;
      this.ruleForm.name = item.name;
      this.ruleForm.desc = item.desc;
      this.ruleForm.img = item.img;
    },
    delOne(item) {
      this.list.splice(
        this.list.findIndex((a) => a.id === item.id),
        1
      );
      console.log('删除', item);
    },
    addHandle() {
      this.ruleForm.img = '';
      this.ruleForm.name = '';
      this.ruleForm.desc = '';
      this.isShow = true;
      this.current = true;
    },
    submitForm(formName, ruleForm) {
      /* 点击提交的时候会触发表单内置的验证方法 */
      if (this.current) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            this.list.push({ ...this.ruleForm, id: Date.now() });
            this.$message({
              showClose: true,
              message: '创建成功',
              type: 'success',
            });
            this.isShow = false;
            this.ruleForm.img = '';
            this.ruleForm.name = '';
            this.ruleForm.desc = '';
          } else {
            console.log('error submit!!');
            this.$message({
              showClose: true,
              message: '提交出错了',
              type: 'error',
            });
            return false;
          }
        });
      } else {
        this.list.splice(
          this.list.findIndex((p) => p.id === this.ruleForm.id),
          1,
          this.ruleForm
        );
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        });
        console.log('这是保存');
      }
    },
    /* 重置表单数据 */
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.ruleForm.img = '';
      this.ruleForm.name = '';
      this.ruleForm.desc = '';
    },
  },
  components: {},
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
