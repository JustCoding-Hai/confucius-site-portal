<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <form action="register">
        <div class="input-prepend restyle">
          <input
            v-model="member.nickname"
            type="text"
            placeholder="你的昵称">
          <i class="iconfont icon-user"/>
        </div>
        <div class="input-prepend restyle no-radius">
          <input
            v-model="member.mobile"
            type="text"
            placeholder="手机号">
          <i class="iconfont icon-phone"/>
        </div>
        <div class="input-prepend restyle no-radius" style="position:relative">
          <input
            v-model="member.code"
            type="text"
            placeholder="验证码">
          <i class="iconfont icon-yanzhengma"/>
          <a
            href="javascript:"
            type="button"
            style="position:absolute;right: 10px;top: 15px;"
            @click="getCodeFun()">{{ codeText }}</a>
        </div>
        <div class="input-prepend">
          <input
            v-model="member.password"
            type="password"
            placeholder="设置密码">
          <i class="iconfont icon-password"/>
        </div>
        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:9110/api/uc/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import registerApi from '~/api/register'


export default {
  layout: 'sign',
  data() {
    return {
      member: {
        mobile: '',
        code: '',
        nickname: '',
        password: ''
      },
      sending: false, // 是否发送验证码
      second: 60, // 倒计时间
      codeText: '获取验证码'
    }
  },
  methods: {
    // 获取验证码
    getCodeFun() {
      if (this.sending) { return }
      //如果没有填手机号
      if(!this.member.mobile){
        this.$message.warning('请填写手机号！')
        return
      }
      this.sending = true
      registerApi.sendMessage(this.member.mobile).then(response => {
        if(response.success){
          this.timeDown()
        }
      })
    },
    // 倒计时
    timeDown() {
      //result为倒计时请求对象
      const result = setInterval(() => {
        this.codeText = this.second+"s"
        this.second--
        if (this.second < 0) {
          //停止倒计时
          clearInterval(result)
          this.sending = false
          this.second = 60
          this.codeText = '获取验证码'
        }
      }, 1000)
    },

    // 注册
    submitRegister() {
      registerApi.register(this.member).then(response => {
        //跳转到登陆页
        this.$router.push({path:"/login"})
      })

    }
  }
}
</script>
