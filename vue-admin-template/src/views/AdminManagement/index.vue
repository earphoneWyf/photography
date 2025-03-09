<template>
  <div class="admin-management">
    <div class="admin-info">
      <el-table :data="[{ id, name, avatar }]" border style="width: 100%;">
        <el-table-column prop="id" label="ID" align="center" :min-width="100" />
        <el-table-column prop="name" label="用户名" align="center" :min-width="150" />
        <el-table-column prop="avatar" label="头像URL" align="center" :min-width="500" />
        <el-table-column label="操作" align="center" :min-width="150">
          <el-button type="primary" @click="editAdminInfo">编辑信息</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="编辑管理员信息">
      <el-form :model="adminForm">
        <el-form-item label="姓名">
          <el-input v-model="adminForm.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="adminForm.password" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="adminForm.avatar" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateAdmin">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdminManagement',
  data() {
    return {
      dialogVisible: false,
      adminForm: {
        id: 1,
        username: '',
        avatar: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('admin', ['id', 'name', 'avatar', 'password'])
  },
  methods: {
    ...mapActions('admin', ['updateAdminInfo']),
    editAdminInfo() {
      this.adminForm.id = this.id
      this.adminForm.username = this.name
      this.adminForm.avatar = this.avatar
      this.adminForm.password = this.password
      this.dialogVisible = true
    },
    updateAdmin() {
      if (!this.adminForm.username) {
        this.$message.error('用户名不能为空')
        return
      }
      if (this.adminForm.password.length < 6) {
        this.$message.error('密码不能少于6位')
        return
      }
      if (!this.adminForm.avatar) {
        this.$message.error('头像链接不能为空')
        return
      }
      this.updateAdminInfo(this.adminForm).then(() => {
        this.dialogVisible = false
        this.$message.success('管理员信息更新成功')
      }).catch(() => {
        this.$message.error('管理员信息更新失败')
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.admin-management {
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .admin-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .admin-name {
      margin-left: 10px;
      font-size: 20px;
    }
  }
}
</style>
