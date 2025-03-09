<template>
  <div class="information">
    <!-- 搜索和新增按钮 -->
    <div style="margin-bottom: 20px;">
      <el-input v-model="searchTitle" placeholder="请输入标题进行搜索" style="width: 300px; margin-right: 20px;" />
      <el-button type="primary" @click="showAddDialog = true">新增资讯</el-button>
    </div>

    <!-- 资讯表格 -->
    <el-table :data="paginatedInformations" style="width: 100%" border>
      <el-table-column align="center" prop="id" label="ID" width="50" />
      <el-table-column align="center" prop="title" label="标题" />
      <el-table-column align="center" prop="content" label="内容" width="400">
        <template slot-scope="scope">
          <div v-if="scope.row.content.length > 100">
            <div v-html="scope.row.content.slice(0, 100) + '...'" />
          </div>
          <div v-else>
            <div v-html="scope.row.content" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否展示">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_displayed"
            :active-value="1"
            :inactive-value="0"
            @change="updateDisplayStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" sortable />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="confirmDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="filteredInformations.length"
      style="margin-top: 20px; text-align: center;"
    />

    <!-- 新增资讯弹窗 -->
    <el-dialog title="新增资讯" :visible.sync="showAddDialog">
      <el-form ref="addForm" :model="newInformation" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="newInformation.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="newInformation.content" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddInformation">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'Information',
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      showAddDialog: false,
      searchTitle: '',
      newInformation: {
        title: '',
        content: '',
        is_displayed: 0
      }
    }
  },
  computed: {
    ...mapState('information', ['informations']),
    filteredInformations() {
      return this.informations.filter(info => {
        return info.title.includes(this.searchTitle)
      })
    },
    paginatedInformations() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredInformations.slice(start, end)
    }
  },
  mounted() {
    this.fetchInformations()
  },
  methods: {
    ...mapActions('information', ['getAllInformations', 'deleteInformation', 'addInformation', 'updateInformationDisplayStatus']),
    fetchInformations() {
      this.getAllInformations()
    },
    // handlePageChange(page) {
    //   this.currentPage = page
    // },
    confirmDelete(id) {
      MessageBox.confirm('确定删除这条资讯吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteInformation(id).then(() => {
          Message.success('删除成功')
          this.fetchInformations()
        })
      }).catch(() => {})
    },
    updateDisplayStatus(information) {
      this.updateInformationDisplayStatus(information).then(() => {
        Message.success('更新成功')
      })
    },
    handleAddInformation() {
      const { title, content, is_displayed } = this.newInformation
      if (!title.trim()) {
        this.$message.error('资讯标题不能为空')
        return
      }
      if (!content.trim()) {
        this.$message.error('资讯内容不能为空')
        return
      }
      const info = {
        title,
        content: content.replace(/\n/g, '<br>'),
        is_displayed
      }
      this.addInformation(info).then(() => {
        Message.success('新增成功')
        this.showAddDialog = false
        this.newInformation = {
          title: '',
          content: '',
          is_displayed: 0
        }
        this.fetchInformations()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
  padding: 20px;

  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
