<template>
  <div class="finishFix" v-if="order.formstate==4&&this.$store.state.user.role==='supplier'">
      <div class="title">订单维修情况</div>
      <van-uploader
        accept="image/*"
        v-model="img"
        :after-read="photoUpload"
        :before-delete="delPhoto"
        multiple
        :max-count="6"
        >
        <van-image :src="require('@/assets/pic/addphoto.svg')" />
      </van-uploader>
        <br>
      <van-form @submit="onSubmit">
      <div class="title">填写备注内容</div>
      <van-field
          class="supplierRemark"
          name="supplierremark"
          v-model="supplierRemark"
          placeholder="备注内容"
          type="textarea"
          maxlength="100"
          autosize
          show-word-limit
        />
        <div style="margin: 16px;">
          <van-button  block type="info" native-type="submit">完成订单</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { supplierConfirmOrder } from '@/api/order-check'
import { upload } from '@/api/order-CRUD'
export default {
  name: 'finishFix',
  components: {},
  props: ['order'],
  data () {
    return {
      supplierRemark: '',
      img: [], // vant组件使用的图片数组
      backImg: [] // 服务器返回的图片地址数组
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
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
    onSubmit (values) {
      if (this.backImg.length === 0) {
        this.$toast('请确认信息填写完整!')
        return false
      }
      this.$dialog
        .confirm({
          title: '确认完成订单吗?'
        })
        .then(async () => {
          values.supplierimg1 = this.backImg.toString()
          values.id = `${this.$store.state.order.id}`
          try {
            supplierConfirmOrder(values)
            this.$router.go(-1)
            this.$toast.success('提交维修情况成功')
          } catch (err) {
            this.$toast('网络异常，请稍后再试!')
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.finishFix{
  margin-top: 16px;
  padding-left: 20px;
  padding-top: 1px;
  width: 375px;
  background: #FFFFFF;
  .title{
    margin-top: 20px;
    margin-bottom: 8px;
    font-family: PingFang Bold;
    color: #000000;
    font-size: 13px;
    line-height: 18px;
  }
  .van-cell::after {
    display: none;
  }
  /deep/.van-field__control{
    margin-left: -5px;
    font-size: 15px;
    font-family: PingFang regular;
  }
  .van-cell{
    border:1px solid #DDDDDD;
    border-radius: 4px;
  }
  .name{
    display: inline-block;
    width: 109px;
  }
  .phone{
    margin-left: 8px;
    display: inline-block;
    width: 218px;
  }
  .time{
    width: 335px;
  }
  .supplierRemark{
    width: 335px;
  }
  .van-button{
    border: none;
    width: 335px;
    height: 40px;
    margin-left: -17px;
    padding-left: 0;
    background: #000000;
    opacity: 1;
    border-radius: 6px;
    text-align: center;
    padding-top: 13px;
    font-size: 13px;
    font-family: PingFang Bold;
    color: #FFFFFF;
  }
  .van-button::before{
    display: none;
  }
  //添加图片的样式
/deep/.van-uploader__wrapper{
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
}
</style>
