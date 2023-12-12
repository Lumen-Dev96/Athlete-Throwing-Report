<script setup>
import { ClockCircleFilled, EnvironmentFilled, EyeFilled } from '@ant-design/icons-vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'


const time = ref();
// 获取当前时间
const getTime = () => {
  time.value = new Date();
};
var timer = 0;

onMounted(() => {
  timer = setInterval(() => {
    //设置定时器
    getTime(); //自定义事件
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer); //清除定时器
  timer = 0;
});

</script>

<template>
  <div class="bg-[#f6f6f6] w-full ">
    <div class="container mx-auto py-4">
      <div class="grid grid-rows-10 grid-cols-7 grid-flow-row gap-4">
        <div class="p-3 bg-white row-span-1 col-span-1 shadow-sm">
          <div class="flex gap-2 items-center mb-1">
            <ClockCircleFilled />
            <span class="text-xs">測試時間</span>
          </div>
          <div class="bg-[#efefef] p-1 w-full text-center font-bold">
            {{ moment().format('HH:mm:SS') }}
          </div>
        </div>
        <div class="p-3 bg-white row-span-1 col-span-1 shadow-sm">
          <div class="flex gap-2 items-center mb-1">
            <EnvironmentFilled />
            <span class="text-xs">是否命中目標</span>
          </div>
          <div class="bg-[#efefef] p-1 w-full text-center font-bold">
            F/R
          </div>
        </div>
        <div class="p-3 bg-white row-span-1 col-span-1 shadow-sm">
          <div class="flex gap-2 items-center mb-1">
            <EyeFilled />
            <span class="text-xs">眼睛瞄準時間</span>
          </div>
          <div class="bg-[#efefef] p-1 w-full text-center font-bold">
            {{ moment().format('HH:mm:SS') }}
          </div>
        </div>

        <div class="p-3 bg-white row-span-6 col-span-4 shadow-sm">
          <div class="font-bold text-center">場景展示</div>
          <div class="flex mx-auto justify-center gap-8 mt-2">
            <div class="text-center">二維場景</div>
            <div class="text-center">三維場景</div>
          </div>
          <div class="">
            <div class="flex justify-center">
              <video class="max-h-60 w-[50%]" controls muted src="@/assets/2/arm_body_2.mp4"></video>
              <video class="max-h-60 w-[50%]" controls muted src="@/assets/2/arm_body_2.mp4"></video>
            </div>
            <div>
              <video class="max-h-60 w-full" controls muted src="@/assets/2/arm_body_2.mp4"></video>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-5 col-span-3 shadow-sm">
          <div class="mb-3">
            <img src="@/assets/2/001.jpg" alt="Scene">
          </div>
          <div class="flex justify-between">
            <img class="w-[48%]" src="@/assets/2/001.jpg" alt="LineGraph">
            <div class="w-[48%] flex justify-between">
              <div class="flex w-[50%] h-full flex-col justify-around items-center">
                <span>本次</span>
                <span>上一次</span>
                <span>下一次</span>
              </div>
              <div class="flex w-[50%] h-full flex-col justify-around items-center">
                <div>
                  <div>上臂與大臂的角度</div>
                  <div class="bg-[#efefef] p-1 w-full text-center font-bold">90</div>
                </div>
                <div>
                  <div>大臂與軀幹的角度</div>
                  <div class="bg-[#efefef] p-1 w-full text-center font-bold">90</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-3 col-span-3 shadow-sm">
          <div class="font-bold text-center mb-2">眼動數據</div>
          <div class="flex justify-between">
            <div class="w-[50%]">
              <img src="@/assets/2/001.jpg" alt="Eyes">
              <div class="bg-[#efefef] p-1">
                <div class="font-bold">HEATMAP</div>
                <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div>
            <div class="w-[40%]">
              <img src="@/assets/2/001.jpg" alt="San">
              <div class="bg-[#efefef] p-1">
                <div class="font-bold">散點圖</div>
                <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div>
          </div>

        </div>
        <div class="p-3 bg-white row-span-3 col-span-1 shadow-sm">
          <div class="font-bold text-center mb-2">坐墊</div>
          <div>
            <video src="@/assets/2/arm_body_2.mp4"></video>
            <div class="bg-[#efefef] p-1">
              <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
            </div>
          </div>
        </div>
        <div class="p-3 bg-white row-span-3 col-span-3 shadow-sm">
          <div class="font-bold text-center mb-2">IMU</div>
          <img src="@/assets/2/001.jpg" alt="San">
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
