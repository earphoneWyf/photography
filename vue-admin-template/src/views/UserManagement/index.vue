<template>
  <div class="user-management">
    <el-input v-model="searchQuery" placeholder="搜索用户名" style="margin-bottom: 20px; width: 300px;" />
    <el-table :data="paginatedUsers" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="50" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="role" label="角色" />
      <el-table-column align="center" prop="contact" label="联系方式" />
      <el-table-column align="center" prop="avatar" label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%;">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_verified" label="是否验证" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_verified"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" sortable />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="filteredUsers.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      style="margin-top: 20px; text-align: center;"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserManagement',
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapState('user', ['users']),
    filteredUsers() {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredUsers.slice(start, end)
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    ...mapActions('user', ['getAllUsers', 'updateUserStatus']),
    handleStatusChange(user) {
      this.updateUserStatus(user)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-management {
  padding: 20px;
}
</style>
