<template>
  <van-cell-group
    class="supplementaryItems"
    inset
    >
    <van-cell
    v-for="(item,id) in Items"
    :key="id">
      <template #title>
        <van-field v-model="item.name" placeholder="" />
      </template>
      <template #extra>
        <van-stepper class="itemStepper" integer  v-model="item.value" />
        <van-icon name="close" @click="deleteItem(id)"/>
      </template>
    </van-cell>
    <van-button type="default" block @click="addItem()">
      增加物品
    </van-button>
  </van-cell-group>
</template>
<script>

export default {
  name: 'supplementaryItems',
  components: {},
  props: [],
  data () {
    return {
      Items: [{ name: '', value: '1' }],
      submitItems: { supplementgoods: '', supplementcount: '' }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    deleteItem (id) {
      this.Items.splice(id, 1)
    },
    addItem () {
      this.Items.push({ name: '', value: '1' })
    },
    onSubmit () {
      try {
        this.Items.forEach((item, index) => {
          if (item.name === '') {
            throw index
          }
        })
      } catch (err) {
        this.$toast.fail(`请检查第${err + 1}个物品名字为空`)
        throw err
      }
      this.submitItems.supplementgoods = this.Items.map((item) => { return `${item.name}` }).join(',')
      this.submitItems.supplementcount = this.Items.map((item) => { return `${item.value}` }).join(',')
    }
  }
}
</script>

<style scoped lang="less">
.supplementaryItems{
    /deep/ .van-field__control{
    background-color: rgb(241, 241, 241);
  }
  .itemStepper{
    padding-top: 10px;
    margin-right: 20px;
  }
}
</style>
