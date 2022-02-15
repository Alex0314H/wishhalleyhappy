<template>
  <div class="createOrderBar-container">
    <!-- 头部选择维修项目 -->
    <!-- 增补单 -->
    <span class="orderspan">上传增补单照片</span>
    <van-uploader
      accept="image/*"
      v-model="img"
      :after-read="photoUpload"
      :before-delete="delPhoto"
      multiple
      :max-count="1"
    >
      <van-image :src="require('@/assets/pic/addphoto.svg')" />
    </van-uploader>
    <!-- 增补物品内容 -->
    <span class="orderspan">填写增补内容</span>
     <supplementaryItems ref="items"/>
    <!-- 确认按钮 -->
    <van-button block type="primary" @click="onSubmit" color="#000000">提交订单</van-button>
  </div>
</template>

<script>
import supplementaryItems from './supplementaryItems.vue'
import { upload, createSupplement } from '@/api/order-CRUD'
export default {
  name: 'createOrderBar',
  components: { supplementaryItems },
  props: { reset: { type: Boolean, default: false } },
  data () {
    return {
      show: false,
      img: [], // vant组件使用的图片数组
      backImg: [], // 服务器返回的图片地址数组
      submitItems: { // 提交的项目
        supplementstorename: this.$store.state.store.storename,
        supplementstoresite: this.$store.state.store.storesite,
        supplementimg: '' // 上传的图片
      },
      backmsg: false // 判断填写完毕
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.$store.state.store)
  },
  mounted () {},
  methods: {
    // 初始化导入图片
    importImg (value) {
      this.img.push({ url: value, isImage: true })
    },
    // 图片上传
    photoUpload (file) {
      if (file instanceof Array) {
        file.map((v) => {
          v.status = 'uploading'
          v.message = '上传中...'
          this.uploadPhoto(v)
        })
      } else {
        file.status = 'uploading'
        file.message = '上传中...'
        this.uploadPhoto(file)
      }
    },
    async uploadPhoto (file) {
      // 上传图片到服务器
      const formData = new FormData()
      formData.append('file', file.file)
      // 上传结果返回data.data保存下来
      const { data } = await upload(formData)
      if (data.code === 200) {
        file.status = 'success'
        file.message = ''
        this.backImg.push(data.data)
      }
    },
    // 图片删除
    delPhoto (item) {
      const isItem = (img) => img === item
      const a = this.img.findIndex(isItem)
      this.backImg.splice(a, 1)
      return true
    },

    // 判断所有项目填写完毕，并将图片和视频信息同步提交，本订单状态更改为true
    async onSubmit () {
      try {
        this.$refs.items.onSubmit()
      } catch {
        return false
      }

      if (this.backImg.length === 0) {
        this.backmsg = false
        this.$toast.fail('请上传增补单照片')
        return false
      }

      this.submitItems.supplementimg = this.backImg.toString()
      this.submitItems.supplementgoods = this.$refs.items.submitItems.supplementgoods
      this.submitItems.supplementcount = this.$refs.items.submitItems.supplementcount

      const { data } = await createSupplement(this.submitItems)
      if (data.code === 200) {
        this.$toast.success(data.message)
        this.$router.push('supplementList')
      } else {
        this.$toast.fail('网络异常，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.createOrderBar-container{
  padding: 20px 20px 0 20px;
  // 维修项目选择栏
  .fixItemPicker {
    width: 335px;
    height: 40px;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #dddddd;
    border-radius: 4px;
    font-family: PingFang Bold;
    font-size: 15px;
    color: #333333;
    div {
      padding-left: 12px;
      margin-top: 11px;
    }
  }
  //填写维修内容
  .orderspan {
    margin-top: 20px;
    height: 18px;
    line-height: 18px;
    color: #333333;
    font-size: 13px;
  }
  //添加图片的样式
  /deep/.van-uploader__wrapper {
    width: 345px;
  }
  /deep/.van-uploader__preview {
    margin: 0 10px 20px 0;
    width: 105px;
    height: 105px;
  }
  /deep/.van-uploader__preview-image {
    width: 105px;
    height: 105px;
  }
  .van-button {
    margin-top: 28px;
  }
}
</style>
