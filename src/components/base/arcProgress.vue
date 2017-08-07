<template>
    <div class="arcPregress">
      <canvas ref="can"></canvas>
    </div>
</template>

<script>

    export default{
        props:{
          R:{
              type:Number,
              default:30
          },
          PI:{
              type:Number,
              default:0
          }
        },
        mounted(){
          this.init();
        },
        methods: {
            init(){
              let r=this.R;
              let pi=this.PI-Math.PI/2
              this.$refs.can.width=r;
              this.$refs.can.height=r;
              let ctx=this.$refs.can.getContext('2d');
              ctx.strokeStyle="#d93f30";
              this.move();
              this.cir();
            },
          cir(){
            let ctx=this.$refs.can.getContext('2d');
            let r=this.R;
            ctx.beginPath();
            ctx.lineWidth=1;
            ctx.arc(r/2,r/2,(r-6)/2,0,Math.PI*2);
            ctx.stroke();
          },
          move(){
            let ctx=this.$refs.can.getContext('2d');
            let r=this.R;
            let pi=this.PI-Math.PI/2
            ctx.clearRect(0,0,r,r);
            this.cir()
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(r/2,r/2,(r-4)/2,-Math.PI/2,pi);
            ctx.stroke();
          }
        },
      watch:{
        PI(nval){
           this.move()
        }
      }
    }
</script>

<style scoped lang = 'scss' rel = 'stylesheet/scss'>
  canvas{
    vertical-align: middle;
  }
</style>
