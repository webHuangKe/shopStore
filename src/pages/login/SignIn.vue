<template>
    <Form ref="formValidate" :model="formValidate" :label-width="150">
        <FormItem label="账号：" prop="name">
            <Input v-model="formValidate.name"  :style="'width:' + width + 'px'" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="密码：" prop="mail">
            <Input v-model="formValidate.mail"  :style="'width:' + width + 'px'" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="确认密码：" prop="city">
            <Input v-model="formValidate.city"  :style="'width:' + width + 'px'" placeholder="Enter your e-city"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        props: ['width'],
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: ''
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
