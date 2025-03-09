<template>
  <div class="home-container">
    <!-- 标题 -->
    <h1 class="home-title">欢迎进入摄影约拍后台管理系统</h1>
    <div class="content">
      <!-- 饼图容器 -->
      <div ref="pieChart" style="width: 600px; height: 400px" />
      <!-- 柱状图容器 -->
      <div ref="barChart" style="width: 600px; height: 400px" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: 'Home',
  computed: {
    ...mapState('user', ['users'])
  },
  mounted() {
    this.getAllUsers().then(() => {
      console.log('this.users', this.users)
      this.initPieChart()
      this.initBarChart()
    })
  },
  methods: {
    ...mapActions('user', ['getAllUsers']),
    initPieChart() {
      // 统计模特和摄影师的数量
      const modelCount = this.users.filter(
        (user) => user.role === '模特'
      ).length
      const photographerCount = this.users.filter(
        (user) => user.role === '摄影师'
      ).length

      // 初始化 ECharts 实例
      const chartDom = this.$refs.pieChart
      const myChart = echarts.init(chartDom)

      // 配置项
      const option = {
        title: {
          text: '模特和摄影师数量比例',
          left: 'center',
          bottom: 0
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '用户角色',
            type: 'pie',
            radius: '50%',
            data: [
              { value: modelCount, name: '模特' },
              { value: photographerCount, name: '摄影师' }
            ]
          }
        ]
      }

      // 使用配置项显示图表
      option && myChart.setOption(option)
    },
    initBarChart() {
      const now = dayjs()
      // 计算不同时间段的注册用户数量
      const todayCount = this.users.filter((user) =>
        dayjs(user.created_at).isSame(now, 'day')
      ).length
      const sevenDaysCount = this.users.filter((user) =>
        dayjs(user.created_at).isAfter(now.subtract(7, 'day'))
      ).length
      const fifteenDaysCount = this.users.filter((user) =>
        dayjs(user.created_at).isAfter(now.subtract(15, 'day'))
      ).length
      const thirtyDaysCount = this.users.filter((user) =>
        dayjs(user.created_at).isAfter(now.subtract(30, 'day'))
      ).length

      // 初始化 ECharts 实例
      const chartDom = this.$refs.barChart
      const myChart = echarts.init(chartDom)

      // 配置项
      const option = {
        title: {
          text: '不同时间段注册用户数量',
          left: 'center',
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['今天', '近 7 天', '近 15 天', '近 30 天']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '注册用户数量',
            type: 'bar',
            data: [
              todayCount,
              sevenDaysCount,
              fifteenDaysCount,
              thirtyDaysCount
            ]
          }
        ]
      }

      // 使用配置项显示图表
      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 400px;
    }
  }
  &-title {
    font-size: 36px;
    color: #333;
    margin-bottom: 40px;
  }
}
</style>
