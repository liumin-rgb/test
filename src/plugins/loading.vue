<template>
      <div class="pop-spinner">
      <div class="lds-spinner" >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      </div>
</template>

<script>
    export default {
        name: "loading",
        data(){
            return{

            }
        },
    }
</script>

<style scoped>
.pop-spinner{
  background:rgb(0,0,0,0.1);
  position:fixed;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index:998
}
.plul{ position:fixed;z-index: 999;}
.lds-spinner {
  color: official;
  display:block;
  position: relative;
  width: 80px;
  height: 80px;
  margin:0 auto;
  left:50%;
  top:50%;
  margin:-40px 0 0 -40px
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 24px;
  left: 37px;
  width: 4px;
  height: 8px;
  border-radius: 30%;
  background: #1f80e2;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(36deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(72deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(108deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(144deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(180deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(216deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(252deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(288deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(324deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(360deg);
  animation-delay: -0.2s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
