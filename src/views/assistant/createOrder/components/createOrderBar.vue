<template>
  <div class="createOrderBar-container">
    <!-- 头部选择维修项目 -->
    <div class="fixItemPicker" @click="show = true">
      <div v-show="bufferName === ''">请选择维修项目</div>
      <div>{{ bufferName }}</div>
    </div>
    <van-popup
      @click-overlay="onConfirm"
      v-model="show"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        title="请选择维修项目"
        ref="picker"
        show-toolbar
        :columns="fixItem"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
        :default-index="this.fixItem.indexOf(bufferName)"
      />
    </van-popup>
    <span class="orderspan">填写维修内容</span>
    <van-field
      v-model="a.formcontent"
      rows="1"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请填写维修内容"
      show-word-limit
    />
    <span class="orderspan">上传图片文件</span>
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
    <br />

    <!-- <span class="orderspan">上传视频文件</span> -->
    <!-- <van-uploader
    accept="video/*"
    v-model="video"
    :after-read="videoUpload"
    :before-delete="delVideo"
    multiple
    :max-count="6"
    >
    <van-image :src="require('@/assets/pic/addphoto.svg')" />
    </van-uploader>
    <br> -->

    <span class="orderspan">填写备注内容</span>
    <van-field
      v-model="a.remark"
      rows="1"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请填写备注内容"
      show-word-limit
    />
  </div>
</template>

<script>
import { upload, warrantyCheck } from '@/api/order-CRUD'
export default {
  name: 'assistant-repair-createOrder-order',
  components: {},
  props: { reset: { type: Boolean, default: false } },
  data () {
    return {
      show: false,
      fixItem: [
        'Fixture',
        'Acc',
        'Window Wall',
        'Flooring',
        'Lighting',
        'LED',
        'Logo New',
        'Mannequin New',
        'Hanger',
        'Special',
        'Logo',
        'Mannequin'
      ],
      submitItem: [
        'Fixture',
        'Acc',
        'WindowWall',
        'Flooring',
        'Lighting',
        'LED',
        'LogoNew',
        'MannequinNew',
        'Hanger',
        'Special',
        'Logo',
        'Mannequin'
      ],
      bufferName: '', // 缓存的将要上传的维修项目
      bufferIndex: 0, // 缓存的将要上传的维修项目
      bufferFixItem: { v: 'Fixture', index: 0 }, // 在选择器更改选项时缓存的维修项目
      img: [], // vant组件使用的图片数组
      video: [], // vant组件使用的视频数组
      backImg: [], // 服务器返回的图片地址数组
      backVideo: [], // 服务器返回的图片地址数组
      a: { // 提交的项目
        id: this.$store.state.store.id,
        formcontent: '', // 订单内容
        formremark: '', // 订单备注
        formimg: '', // 上传的图片
        formvideo: '', // 上传的视频
        formname: '' // 订单标题
      },
      backmsg: false // 判断填写完毕
    }
  },
  computed: {},
  watch: {},
  created () {
    this.check()
  },
  mounted () {},
  methods: {
    // 查看保修期
    async check () {
      const postdata = this.$qs.stringify({
        id: this.reset ? this.$store.state.order.storeid : this.$store.state.store.id
      })
      const { data } = await warrantyCheck(postdata)
      this.warrantyStatus = data
      this.fixItem.forEach((element, index) => {
        this.fixItem[index] = element.concat(this.warrantyStatus[index] === '1' ? ('(保修中)') : ('(已过期)'))
      })
      if (this.reset) { this.importOrder() } else { this.bufferFixItem.v = this.bufferFixItem.v.concat(this.warrantyStatus[0] === '1' ? ('(保修中)') : ('(已过期)')) }
    },
    // 初始化导入
    importOrder () {
      this.order = this.$store.state.order
      this.a.formname = this.order.formname
      this.bufferIndex = this.submitItem.indexOf(this.order.formname)
      this.bufferFixItem.index = this.bufferIndex
      this.bufferName = this.fixItem[this.bufferIndex]
      this.bufferFixItem.v = this.order.formname.concat(this.warrantyStatus[this.bufferIndex] === '1' ? ('(保修中)') : ('(已过期)'))
      this.a.formcontent = this.order.formcontent
      this.a.remark = this.order.formremark
      this.a.id = this.order.id
      this.order.formimgs.forEach(this.importImg)
      this.backImg = this.order.formimgs
    },
    // 选择维修项目
    onConfirm () {
      this.bufferName = this.bufferFixItem.v
      this.bufferIndex = this.bufferFixItem.index
      this.show = false
    },
    onChange (picker, v, index) {
      this.bufferFixItem = { v, index }
    },
    onCancel () {
      this.show = false
      this.bufferIndex = this.fixItem.indexOf(this.bufferName)
      this.$refs.picker.setIndexes([this.bufferIndex])
    },
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
    // 视频上传
    videoUpload (file) {
      // 此时可以自行将文件上传至服务器
      if (file instanceof Array) {
        file.map((v) => {
          v.status = 'uploading'
          v.message = '上传中...'
          this.uploadVideo(v)
        })
      } else {
        file.status = 'uploading'
        file.message = '上传中...'
        this.uploadVideo(file)
      }
    },
    async uploadVideo (file) {
      // 上传视频到服务器
      const formData = new FormData()
      formData.append('file', file.file)
      // 上传结果返回data.data保存下来
      const { data } = await upload(formData)
      if (data.code === 200) {
        if (file instanceof Array) {
          // 判断是否是数组
          file.map((v, i) => {
            v.status = 'success'
            v.message = ''
          })
        } else {
          file.status = 'success'
          file.message = ''
          this.backVideo.push(data.data)
        }
      }
    },
    // 视频删除
    delVideo (item) {
      const isItem = (video) => video === item
      const a = this.video.findIndex(isItem)
      this.backVideo.splice(a, 1)
      return true
    },
    // 判断所有项目填写完毕，并将图片和视频信息同步提交，本订单状态更改为true
    confirm () {
      if (
        this.bufferName === '' ||
        this.a.formcontent === '' ||
        this.backImg.length === 0
      ) {
        this.backmsg = false
        return false
      }
      this.a.formname = this.submitItem[this.bufferIndex]
      this.a.formimg = this.backImg.toString()
      this.a.expire = this.warrantyStatus[this.submitItem.indexOf(`${this.a.formname}`)]
      this.backmsg = true
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
  //所有按钮
  .van-cell {
    margin-top: 8px;
  }
}
</style>
