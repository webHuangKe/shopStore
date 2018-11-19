<template>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="账号：" prop="name">
            <Input v-model="formValidate.name" :style="'width:' + width + 'px'"  placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
            <Input type="password" :style="'width:' + width + 'px'" v-model="formValidate.password" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
export default {
  props: ['width'],
  data () {
    return {
      formValidate: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
