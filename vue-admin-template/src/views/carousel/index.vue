<template>
  <div class="carousel">
    <el-button type="primary" style="margin-bottom: 20px;" @click="showAddDialog = true">新增轮播图</el-button>
    <el-table :data="paginatedCarousels" style="width: 100%" border>
      <el-table-column align="center" prop="id" label="ID" width="50" />
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" alt="carousel image" style="width: 180px; height: 100px;">
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
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="carousels.length"
      style="margin-top: 20px; text-align: center;"
      @current-change="handlePageChange"
    />

    <el-dialog title="新增轮播图" :visible.sync="showAddDialog" @close="clearFileList">
      <el-upload
        ref="uploadRef"
        action="http://localhost:3000/upload/image/carousel"
        list-type="picture-card"
        name="image"
        :limit="1"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false; clearFileList()">取消</el-button>
        <el-button type="primary" @click="handleAddCarousel">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'Carousel',
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      showAddDialog: false,
      imageUrl: ''
    }
  },
  computed: {
    ...mapState('carousel', ['carousels']),
    paginatedCarousels() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.carousels.slice(start, end)
    }
  },
  mounted() {
    this.fetchCarousels()
    console.log('this.calousels', this.carousels)
  },
  methods: {
    ...mapActions('carousel', ['getAllCarousels', 'deleteCarousel', 'addCarousel', 'updateCarouselDisplayStatus']),
    fetchCarousels() {
      this.getAllCarousels()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchCarousels()
    },
    confirmDelete(id) {
      MessageBox.confirm('确定删除这条轮播图吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCarousel(id).then(() => {
          Message.success('删除成功')
          this.fetchCarousels()
        })
      }).catch(() => {})
    },
    updateDisplayStatus(carousel) {
      this.updateCarouselDisplayStatus(carousel).then(() => {
        Message.success('更新成功')
      })
    },
    handleSuccess(response) {
      if (response.code === 20000) {
        this.imageUrl = response.imageUrl
        console.log('轮播图上传成功:', this.imageUrl)
      } else {
        console.error('轮播图上传失败:', response.message)
      }
    },
    handleAddCarousel() {
      if (!this.imageUrl) {
        this.$message.error('图片不能为空')
        return
      }
      const data = {
        image_url: this.imageUrl,
        is_displayed: 0
      }
      this.addCarousel(data).then(() => {
        Message.success('新增成功')
        this.showAddDialog = false
        this.fetchCarousels()
      })
    },
    clearFileList() {
      this.$refs.uploadRef.clearFiles()
      this.imageUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  padding: 20px;

  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
