<script setup>
import { ClockCircleFilled, EnvironmentFilled, EyeFilled, PlaySquareFilled } from '@ant-design/icons-vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
import IconAngle from './icons/IconAngle.vue';


const time = ref();
// 获取当前时间
const getTime = () => {
  time.value = new Date();
};
var timer = 0;

const currentResultId = ref(1);

const lastResultBtnActive = ref(false);
const nextResultBtnActive = ref(false);
const lastResultBtnDisabled = ref(true);
const nextResultBtnDisabled = ref(false);

const threeDSenceBtnActive = ref(true);
const twoDSenceBtnActive = ref(false);

const threeDSenceVideosIsPlaying = ref(false);
const twoDSenceVideosIsPlaying = ref(false);
const seatVideoIsPlaying = ref(false);

let twoDSenceVideo1;
let twoDSenceVideo2;
let twoDSenceVideo3;
let threeDSenceVideo1;
let threeDSenceVideo2;
let threeDSenceVideo3;
let seatVideo;


onMounted(() => {
  timer = setInterval(() => {
    //设置定时器
    getTime(); //自定义事件
  }, 1000);

  twoDSenceVideo1 = document.getElementById('twoDSenceVideo1');
  twoDSenceVideo2 = document.getElementById('twoDSenceVideo2');
  twoDSenceVideo3 = document.getElementById('twoDSenceVideo3');

  threeDSenceVideo1 = document.getElementById('threeDSenceVideo1');
  threeDSenceVideo2 = document.getElementById('threeDSenceVideo2');
  threeDSenceVideo3 = document.getElementById('threeDSenceVideo3');

  seatVideo = document.getElementById('seatVideo');


});

onBeforeUnmount(() => {
  clearInterval(timer); //清除定时器
  timer = 0;
});

function handleLastResultQuery(event) {
  currentResultId.value--;
  if (currentResultId <= 1) {
    // Has no last result
    lastResultBtnDisabled.value = true;
  }
  nextResultBtnActive.value = false;
  lastResultBtnActive.value = true;
}

function handleNextResultQuery(event) {
  if (false) {
    // Has no next result
    nextResultBtnDisabled.value = true;
  } else {
    currentResultId.value++;
  }
  nextResultBtnActive.value = true;
  lastResultBtnActive.value = false;
  lastResultBtnDisabled.value = false;
}

function handleSwitch3DSence(event) {
  threeDSenceBtnActive.value = true;
  twoDSenceBtnActive.value = false;
}

function handleSwitch2DSence(event) {
  threeDSenceBtnActive.value = false;
  twoDSenceBtnActive.value = true;
}

function handle2DSenceVideoPlay(event) {
  if (twoDSenceVideosIsPlaying.value) {
    console.log('pause');
    twoDSenceVideosIsPlaying.value = false;
    twoDSenceVideo1.pause();
    twoDSenceVideo2.pause();
    twoDSenceVideo3.pause();
  } else {
    console.log('play');
    twoDSenceVideosIsPlaying.value = true;
    twoDSenceVideo1.play();
    twoDSenceVideo2.play();
    twoDSenceVideo3.play();
  }
}

function handle3DSenceVideoPlay(event) {
  if (threeDSenceVideosIsPlaying.value) {
    console.log('pause');
    threeDSenceVideosIsPlaying.value = false;
    threeDSenceVideo1.pause();
    threeDSenceVideo2.pause();
    threeDSenceVideo3.pause();
  } else {
    console.log('play');
    threeDSenceVideosIsPlaying.value = true;
    threeDSenceVideo1.play();
    threeDSenceVideo2.play();
    threeDSenceVideo3.play();
  }
}

function handleSeatVideoPlay(event) {
  if (seatVideoIsPlaying.value) {
    seatVideoIsPlaying.value = false;
    seatVideo.pause();
  } else {
    seatVideoIsPlaying.value = true;
    seatVideo.play();
  }
}

</script>

<template>
  <div class="bg-[#f6f6f6] w-full lg:h-[90vh]">
    <div class="container mx-auto py-4">
      <div class="lg:grid grid-rows-10 grid-cols-7 grid-flow-row gap-4">
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
          <div class="flex mx-auto justify-center gap-8 my-2">
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: twoDSenceBtnActive }"
              @click="handleSwitch2DSence"
            >
              • 二維場景
            </div>
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: threeDSenceBtnActive }"
              @click="handleSwitch3DSence"
            >
              • 三維場景
            </div>
          </div>
          <div v-show="threeDSenceBtnActive" class="relative cursor-pointer" @click="handle3DSenceVideoPlay">
            <div class="flex justify-center">
              <video id="threeDSenceVideo1" class="max-h-[20vh] w-[50%]" muted src="@/assets/2/arm_body_2.mp4"></video>
              <video id="threeDSenceVideo2" class="max-h-[20vh] w-[50%]" muted src="@/assets/2/arm_body_2.mp4"></video>
            </div>
            <div>
              <video id="threeDSenceVideo3" class="max-h-[20vh] w-full" muted src="@/assets/2/arm_body_2.mp4"></video>
            </div>
            <div class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
              <PlaySquareFilled />
            </div>
            <div v-show="!threeDSenceVideosIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
          </div>
          <div v-show="twoDSenceBtnActive" class="relative cursor-pointer" @click="handle2DSenceVideoPlay">
            <div class="flex justify-center">
              <video id="twoDSenceVideo1" class="max-h-[20vh] w-[50%]" muted src="@/assets/2/arm_body_3.mp4"></video>
              <video id="twoDSenceVideo2" class="max-h-[20vh] w-[50%]" muted src="@/assets/2/arm_body_3.mp4"></video>
            </div>
            <div>
              <video id="twoDSenceVideo3" class="max-h-[20vh] w-full" muted src="@/assets/2/arm_body_3.mp4"></video>
            </div>
            <div class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
              <PlaySquareFilled />
            </div>
            <div v-show="!twoDSenceVideosIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-5 col-span-3 shadow-sm">
          <div class="mb-3 flex justify-center">
            <img class="max-h-[25vh]" src="@/assets/2/001.jpg" alt="Scene">
          </div>
          <div class="flex justify-between">
            <img class="w-[48%] max-h-[10vh]" src="@/assets/2/cushion line.png" alt="LineGraph">
            <div class="w-[48%] flex justify-between">
              <div class="flex w-[50%] h-full flex-col justify-between items-center">
                <div
                  class="rounded-full bg-[#f0f0f0] min-w-[70%] text-center text-[#a0a0a0] py-0.5 cursor-not-allowed"
                >
                  第 {{ currentResultId }} 次
                </div>
                <div
                  class="rounded-full bg-[#f0f0f0] min-w-[70%] text-center text-[#a0a0a0] py-0.5 cursor-pointer result-query-btn"
                  :class="{ active: lastResultBtnActive, disabled: lastResultBtnDisabled }"
                  @click="handleLastResultQuery"
                >
                  上一次
                </div>
                <div
                  class="rounded-full bg-[#f0f0f0] min-w-[70%] text-center text-[#a0a0a0] py-0.5 cursor-pointer result-query-btn"
                  :class="{ active: nextResultBtnActive, disabled: nextResultBtnDisabled }"
                  @click="handleNextResultQuery"
                >
                  下一次
                </div>
              </div>
              <div class="flex w-[50%] h-full flex-col justify-around items-center">
                <div>
                  <div>上臂與大臂的角度</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">90°</span>
                  </div>
                </div>
                <div>
                  <div>大臂與軀幹的角度</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">90°</span>
                  </div>
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
                <div class="font-bold mt-1 mb-2">HEATMAP</div>
                <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div>
            <div class="w-[40%]">
              <img src="@/assets/2/001.jpg" alt="San">
              <div class="bg-[#efefef] p-1">
                <div class="font-bold mt-1 mb-2">散點圖</div>
                <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div>
          </div>

        </div>
        <div class="p-3 bg-white row-span-3 col-span-1 shadow-sm">
          <div class="font-bold text-center mb-2">坐墊</div>
          <div class="">
            <div class="relative cursor-pointer" @click="handleSeatVideoPlay">
              <div class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-3xl flex text-white rounded-lg z-10">
                <PlaySquareFilled />
              </div>
              <div v-show="!seatVideoIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
              <video id="seatVideo" src="@/assets/2/arm_body_2.mp4"></video>
            </div>
            <div class="bg-[#efefef] p-1">
              <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
            </div>
          </div>
        </div>
        <div class="p-3 bg-white row-span-3 col-span-3 shadow-sm">
          <div class="font-bold text-center mb-2">IMU</div>
          <div class="flex justify-center">
            <img class="max-h-[27vh]" src="@/assets/2/001.jpg" alt="San">
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
.result-query-btn.active, .sence-btn.active {
  color: white;
  background-color: #f88a33;
}

.result-query-btn.disabled, .sence-btn.disabled {
  cursor: not-allowed;
  pointer-events: none;
}
</style>
