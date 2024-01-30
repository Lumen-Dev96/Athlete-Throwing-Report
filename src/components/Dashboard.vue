<script setup>
import { ClockCircleFilled, EnvironmentFilled, EyeFilled, PlaySquareFilled } from '@ant-design/icons-vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import IconAngle from './icons/IconAngle.vue';
import util from '../util/utils';
import { inject } from 'vue';
// import {fs} from 'fs';


const axios = inject('axios');

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
const currentCompareBtnActive = ref(true);
const customCompareBtnActive = ref(false);

const threeDSenceVideosIsPlaying = ref(false);
const twoDSenceVideosIsPlaying = ref(false);
const seatVideoIsPlaying = ref(false);
const scatterVideoIsPlaying = ref(false);
const eyeVideoIsPlaying = ref(false);
const cushionVideoIsPlaying = ref(false);

const testTime = ref();
const isTargeted = ref();
const angle1 = ref();
const angle2 = ref();
const angle3 = ref();
const angle4 = ref();
const distance = ref();
const radian = ref();

const athletesData = ref();

let athletesCompareTable1 = ref([]);
let compareAthlete1 = ref();

let athletesCompareTable2 = ref([]);
let compareAthlete2 = ref();
let compareAthlete3 = ref();

let compareAthleteOptions = ref([]);

let twoDSenceVideo1;
let twoDSenceVideo2;
let threeDSenceVideo1;
let threeDSenceVideo2;
let threeDSenceVideo3;
let threeDSenceVideo4;
let seatVideo;
let scatterVideo;
let eyeVideo;
let cushionVideo;


const getData = (id) => {
  axios
    .get(`http://localhost:3000/data/${id}`)
    .then((response) => {
      console.log(response.data);
      testTime.value = response.data.testTime;
      isTargeted.value = response.data.isTargeted;
      angle1.value = response.data.angle1;
      angle2.value = response.data.angle2;
      angle3.value = response.data.angle3;
      angle4.value = response.data.angle4;
      distance.value = response.data.distance;

      athletesCompareTable1.value = [
        {
          'measure': '距離',
          'current': distance.value
        },
        {
          'measure': '球速',
          'current': distance.value
        },
        {
          'measure': '命中率',
          'current': isTargeted.value
        },
        {
          'measure': '角度1',
          'current': angle1.value
        },
        {
          'measure': '角度2',
          'current': angle2.value
        },
        {
          'measure': '角度3',
          'current': angle3.value
        },
        {
          'measure': '角度4',
          'current': angle4.value
        },
        {
          'measure': '弧度',
          'current': distance.value
        }
      ];

      athletesCompareTable2.value = [
      {
          'measure': '距離',
        },
        {
          'measure': '球速',
        },
        {
          'measure': '命中率',
        },
        {
          'measure': '角度1',
        },
        {
          'measure': '角度2',
        },
        {
          'measure': '角度3',
        },
        {
          'measure': '角度4',
        },
        {
          'measure': '弧度',
        }
      ];

    });
  // fs.readFile(`../assets/ExcelProcess/Excel 1/information.txt`, 'utf8', function(err, data){
  //   if(err){
  //       return console.log('读取失败',err)
  //   }
  //   //转换成数组
  //   const dataArray = data.split(/[(\r\n)\r\n]+/);
  //   //删除空项
  //   dataArray.forEach((item,index)=>{
  //     if(!item){
  //         snsArr.splice(index,1);
  //     }
  //   });
  //   const response = {
  //     testTime: dataArray[0],
  //     isTargeted: dataArray[1].toLowerCase() === 'true',
  //     angle1: dataArray[2],
  //     angle2: dataArray[3],
  //     angle3: dataArray[4],
  //     angle4: dataArray[5],
  //     distance: dataArray[6]
  //   };
  //   console.log(response);
  //   testTime.value = response.testTime;
  //   isTargeted.value = response.isTargeted;
  //   angle1.value = response.angle1;
  //   angle2.value = response.angle2;
  //   angle3.value = response.angle3;
  //   angle4.value = response.angle4;
  //   distance.value = response.distance;
  // });
};

const getAthletes = () => {
  axios
    .get(`http://localhost:3000/athletes`)
    .then((response) => {
      console.log(response.data);
      athletesData.value = response.data

      for (let akey in athletesData.value) {
        compareAthleteOptions.value.push(
          {
            value: akey,
            label: akey,
            children: athletesData.value[akey].filter((item) => item[0] !== undefined).map((item) => {
              return {
                value: item[0],
                label: item[0] + 'M'
              }
            })
          }
        );
      }



    });
};


onMounted(() => {
  timer = setInterval(() => {
    //设置定时器
    getTime(); //自定义事件
  }, 1000);

  twoDSenceVideo1 = document.getElementById('twoDSenceVideo1');

  threeDSenceVideo1 = document.getElementById('threeDSenceVideo1');
  threeDSenceVideo2 = document.getElementById('threeDSenceVideo2');
  threeDSenceVideo3 = document.getElementById('threeDSenceVideo3');
  threeDSenceVideo4 = document.getElementById('threeDSenceVideo4');

  seatVideo = document.getElementById('seatVideo');

  eyeVideo = document.getElementById('eyeVideo');

  cushionVideo = document.getElementById('cushionVideo');

  scatterVideo = document.getElementById('scatterVideo');

  getData(currentResultId.value);

  getAthletes();

});

onBeforeUnmount(() => {
  clearInterval(timer); //清除定时器
  timer = 0;
});

function handleLastResultQuery(event) {
  if (currentResultId.value <= 1) {
    // Has no last result
    lastResultBtnDisabled.value = true;
    return ;
  }
  currentResultId.value--;
  nextResultBtnActive.value = false;
  lastResultBtnActive.value = true;
  _stopPlayVideos();
  getData(currentResultId.value);
}

function _stopPlayVideos() {
  twoDSenceVideo1.pause();
  threeDSenceVideo1.pause();
  threeDSenceVideo2.pause();
  threeDSenceVideo3.pause();
  threeDSenceVideo4.pause();
  scatterVideo.pause();
  eyeVideo.pause();
  cushionVideo.pause();

  twoDSenceVideosIsPlaying.value = false;
  threeDSenceVideosIsPlaying.value = false;
  scatterVideoIsPlaying.value = false;
  eyeVideoIsPlaying.value = false;
  cushionVideoIsPlaying.value = false;
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
  _stopPlayVideos();
  getData(currentResultId.value);
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
    twoDSenceVideosIsPlaying.value = false;
    twoDSenceVideo1.pause();
  } else {
    twoDSenceVideosIsPlaying.value = true;
    twoDSenceVideo1.play();
  }
}

function handle3DSenceVideoPlay(event) {
  if (threeDSenceVideosIsPlaying.value) {
    threeDSenceVideosIsPlaying.value = false;
    threeDSenceVideo1.pause();
    threeDSenceVideo2.pause();
    threeDSenceVideo3.pause();
    threeDSenceVideo4.pause();
  } else {
    threeDSenceVideosIsPlaying.value = true;
    threeDSenceVideo1.play();
    threeDSenceVideo2.play();
    threeDSenceVideo3.play();
    threeDSenceVideo4.play();
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

function handleEyeVideoPlay(event) {
  if (eyeVideoIsPlaying.value) {
    eyeVideoIsPlaying.value = false;
    eyeVideo.pause();
  } else {
    eyeVideoIsPlaying.value = true;
    eyeVideo.play();
  }
}

function handleCushionVideoPlay(event) {
  if (cushionVideoIsPlaying.value) {
    cushionVideoIsPlaying.value = false;
    cushionVideo.pause();
  } else {
    cushionVideoIsPlaying.value = true;
    cushionVideo.play();
  }
}

function handleScatterVideoPlay(event) {
  if (scatterVideoIsPlaying.value) {
    scatterVideoIsPlaying.value = false;
    scatterVideo.pause();
  } else {
    scatterVideoIsPlaying.value = true;
    scatterVideo.play();
  }
}

function getIMU(direction, order) {
  const fileName = 'Accel_' + direction + '_of_Detector' + order + (currentResultId.value + 1) + '_vs_time.png';
  return util.getAssetsFile(currentResultId.value, fileName);
}

function previewImage(url) {
  let previewWindow = window.open()
  previewWindow.document.write("<img style='object-fit:cover;width:100vh;height:100vh' src="+url+" />")
}

function handleCompareAthlete1Change(value) {
  const athleteId = value[0]
  const keyDistance = value[1]

  if (athletesData.value[athleteId]) {
    const targetAthlete = athletesData.value[athleteId].find((data) => data[0] === keyDistance);
    if (targetAthlete) {
      targetAthlete.forEach((value, i) => {
        athletesCompareTable1.value[i]['athlete'] = value;
      })
    } else {
      console.log('No Athlete Data')
    }
  }
}

function handleCompareAthlete2Change(value) {
  const athleteId = value[0]
  const keyDistance = value[1]

  if (athletesData.value[athleteId]) {
    const targetAthlete = athletesData.value[athleteId].find((data) => data[0] === keyDistance);
    if (targetAthlete) {
      targetAthlete.forEach((value, i) => {
        athletesCompareTable2.value[i]['athlete1'] = value;
      })
    } else {
      console.log('No Athlete Data')
    }
  }
}

function handleCompareAthlete3Change(value) {
  const athleteId = value[0]
  const keyDistance = value[1]

  if (athletesData.value[athleteId]) {
    const targetAthlete = athletesData.value[athleteId].find((data) => data[0] === keyDistance);
    if (targetAthlete) {
      targetAthlete.forEach((value, i) => {
        athletesCompareTable2.value[i]['athlete2'] = value;
      })
    } else {
      console.log('No Athlete Data')
    }
  }
}

function handleSwitchCurrentCompare(event) {
  currentCompareBtnActive.value = true;
  customCompareBtnActive.value = false;
}

function handleSwitchCustomCompare(event) {
  currentCompareBtnActive.value = false;
  customCompareBtnActive.value = true;
}

</script>

<template>
  <div class="bg-[#f6f6f6] w-full h-[100%]">
    <div class="container mx-auto py-4">
      <div class="lg:grid grid-rows-10 grid-cols-8 grid-flow-row gap-3">
        <div class="p-3 bg-white row-span-1 col-span-2 shadow-sm">
          <div class="flex gap-2 items-center mb-1">
            <ClockCircleFilled />
            <span class="text-xs">測試時間</span>
          </div>
          <div class="bg-[#efefef] p-1 w-full text-center font-bold">
            {{ testTime }}
          </div>
        </div>
        <div class="p-3 bg-white row-span-1 col-span-2 shadow-sm">
          <div class="flex gap-2 items-center mb-1">
            <EnvironmentFilled />
            <span class="text-xs">是否命中目標</span>
          </div>
          <div class="bg-[#efefef] p-1 w-full text-center font-bold">
            {{ isTargeted ? 'R' : 'F' }}
          </div>
        </div>
        

        <div class="p-3 bg-white row-span-6 col-span-4 shadow-sm">
          <div class="font-bold text-center">場景展示</div>
          <div class="flex mx-auto justify-center gap-8 my-2">
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: threeDSenceBtnActive }"
              @click="handleSwitch3DSence"
            >
              • 角度的變換
            </div>
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: twoDSenceBtnActive }"
              @click="handleSwitch2DSence"
            >
              • 二維場景
            </div>
          </div>
          <div v-show="threeDSenceBtnActive" class="relative cursor-pointer" @click="handle3DSenceVideoPlay">
            <div class="flex justify-center flex-wrap">
              <video id="threeDSenceVideo1" class="max-h-[30vh] w-[50%]" muted :src="util.getAssetsFile(currentResultId, 'arm_body_1.mp4')"></video>
              <video id="threeDSenceVideo2" class="max-h-[30vh] w-[50%]" muted :src="util.getAssetsFile(currentResultId, 'arm_body_2.mp4')"></video>
              <video id="threeDSenceVideo3" class="max-h-[30vh] w-[50%]" muted :src="util.getAssetsFile(currentResultId, 'arm_body_3.mp4')"></video>
              <video id="threeDSenceVideo4" class="max-h-[30vh] w-[50%]" muted :src="util.getAssetsFile(currentResultId, 'arm_body_4.mp4')"></video>
            </div>
            <div class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
              <PlaySquareFilled />
            </div>
            <div v-show="!threeDSenceVideosIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
          </div>
          <div v-show="twoDSenceBtnActive" class="relative cursor-pointer" @click="handle2DSenceVideoPlay">
            <div class="flex justify-center">
              <video id="twoDSenceVideo1" class="" muted :src="util.getAssetsFile(currentResultId, 'far.mp4')"></video>
            </div>
            <div v-show="!twoDSenceVideosIsPlaying" class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
              <PlaySquareFilled />
            </div>
            <div v-show="!twoDSenceVideosIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-5 col-span-4 shadow-sm">
          
          <div class="mb-3 flex justify-center">
            <div class="relative cursor-pointer w-full" @click="handleScatterVideoPlay">
              <div class="flex justify-center w-full h-[40vh] relative">
                <video id="scatterVideo" class="w-full object-cover" muted :src="util.getAssetsFile(currentResultId, '3d_scatter4.mp4')"></video>
              </div>
              <div v-show="!scatterVideoIsPlaying" class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-3xl cursor-pointer flex text-white rounded-lg z-10">
                <PlaySquareFilled />
              </div>
              <div v-show="!scatterVideoIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
            </div>
          </div>
          <div class="flex justify-between">
            <!-- <img class="w-[48%] max-h-[10vh]" src="@/assets/2/cushion line.png" alt="LineGraph"> -->
            <div class="w-full flex justify-between gap-3">
              <div class="flex w-[33%] h-full flex-col justify-around items-center">
                <div class="w-full text-xs text-center">
                  <div class="whitespace-nowrap">大臂與小臂的角度</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">{{ angle1 }}°</span>
                  </div>
                </div>
                <div class="w-full text-xs text-center">
                  <div>大臂與軀幹冠狀面</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">{{ angle2 }}°</span>
                  </div>
                </div>
                <div class="w-full text-xs text-center">
                  <div>大臂與軀幹矢狀面</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">{{ angle3 }}°</span>
                  </div>
                </div>
              </div>
              <div class="flex w-[33%] h-full flex-col justify-around items-center">
                <div class="w-full text-xs text-center">
                  <div class="whitespace-nowrap">軀幹與大腿的角度</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <IconAngle />
                    <span class="text-center font-bold">{{ angle4 }}°</span>
                  </div>
                </div>
                <div class="w-full text-xs text-center">
                  <div>目標距離</div>
                  <div class="bg-[#efefef] p-1 w-full flex justify-center gap-1 items-center">
                    <div class="text-center font-bold w-full">{{ distance }} 米</div>
                  </div>
                </div>
              </div>
              <div class="flex w-[33%] h-full flex-col justify-around items-center">
                <div
                  class="rounded-full bg-[#f0f0f0] w-full text-center text-[#a0a0a0] py-0.5 cursor-not-allowed"
                >
                  第 {{ currentResultId }} 次
                </div>
                <div
                  class="rounded-full bg-[#f0f0f0] w-full text-center text-[#a0a0a0] py-0.5 cursor-pointer result-query-btn"
                  :class="{ active: lastResultBtnActive, disabled: lastResultBtnDisabled }"
                  @click="handleLastResultQuery"
                >
                  上一次
                </div>
                <div
                  class="rounded-full bg-[#f0f0f0] w-full text-center text-[#a0a0a0] py-0.5 cursor-pointer result-query-btn"
                  :class="{ active: nextResultBtnActive, disabled: nextResultBtnDisabled }"
                  @click="handleNextResultQuery"
                >
                  下一次
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-3 col-span-2 shadow-sm">
          <div class="font-bold text-center mb-2">眼動數據</div>
          <div class="flex justify-between">
            <div class="w-full flex justify-center flex-col">
              <img class="max-h-[22vh] cursor-pointer" @click="previewImage(util.getAssetsFile(currentResultId, 'EyetrackerHeatmap.jpg'))" :src="util.getAssetsFile(currentResultId, 'EyetrackerHeatmap.jpg')" alt="Eyes">
              <div class="bg-[#efefef] p-1">
                <div class="font-bold mt-1 mb-2">HEATMAP</div>
                <div class="text-xs">內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div>
            <!-- <div class="w-[40%]">
              <img src="@/assets/2/001.jpg" alt="San">
              <div class="bg-[#efefef] p-1">
                <div class="font-bold mt-1 mb-2">散點圖</div>
                <div>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
              </div>
            </div> -->
          </div>

        </div>
        <div class="p-3 bg-white row-span-3 col-span-2 shadow-sm">
          <div class="font-bold text-center mb-2">坐墊</div>
          <div class="flex justify-center flex-col">
            <!-- <div class="relative cursor-pointer" @click="handleSeatVideoPlay">
              <div class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-3xl flex text-white rounded-lg z-10">
                <PlaySquareFilled />
              </div>
              <div v-show="!seatVideoIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
              <video id="seatVideo" src="@/assets/2/arm_body_2.mp4"></video>
            </div> -->
            <img class="cursor-pointer" @click="previewImage(util.getAssetsFile(currentResultId, '1th_Line_graph.png'))" :src="util.getAssetsFile(currentResultId, '1th_Line_graph.png')" alt="San">
            <div class="bg-[#efefef] p-1">
              <div class="text-xs">內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</div>
            </div>
          </div>
        </div>
        <div class="p-3 bg-white row-span-3 col-span-4 shadow-sm">
          <div class="font-bold text-center mb-2">IMU</div>
          <div class="flex justify-center flex-wrap">
            <div class="w-full flex justify-center" @click="previewImage(util.getAssetsFile(currentResultId, 'IMU.jpg'))">
              <img class="h-[40vh] object-cover" :src="util.getAssetsFile(currentResultId, 'IMU.jpg')" alt="IMU">
            </div>
            <!-- <div class="w-[50%] flex justify-center">
              <img class="max-h-[10vh]" :src="getIMU('X', 2)" alt="IMU">
            </div>
            <div class="w-[50%] flex justify-center">
              <img class="max-h-[10vh]" :src="getIMU('Y', 1)" alt="IMU">
            </div>
            <div class="w-[50%] flex justify-center">
              <img class="max-h-[10vh]" :src="getIMU('Y', 2)" alt="IMU">
            </div>
            <div class="w-[50%] flex justify-center">
              <img class="max-h-[10vh]" :src="getIMU('Z', 1)" alt="IMU">
            </div>
            <div class="w-[50%] flex justify-center">
              <img class="max-h-[10vh]" :src="getIMU('Z', 2)" alt="IMU">
            </div> -->
          </div>
        </div>

        <div class="p-3 bg-white row-span-3 col-span-4 shadow-sm">
          <div class="font-bold text-center mb-2">Eye</div>
          <div class="flex justify-center flex-wrap">
            <div class="relative cursor-pointer w-full" @click="handleEyeVideoPlay">
              <div class="flex justify-center">
                <video id="eyeVideo" class="" muted :src="util.getAssetsFile(currentResultId, 'eye.mp4')"></video>
              </div>
              <div v-show="!eyeVideoIsPlaying" class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
                <PlaySquareFilled />
              </div>
              <div v-show="!eyeVideoIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-3 col-span-4 shadow-sm">
          <div class="font-bold text-center mb-2">Cushion</div>
          <div class="flex justify-center flex-wrap">
            <div class="relative cursor-pointer w-full" @click="handleCushionVideoPlay">
              <div class="flex justify-center">
                <video id="cushionVideo" class="" muted :src="util.getAssetsFile(currentResultId, 'Cushion.mp4')"></video>
              </div>
              <div v-show="!cushionVideoIsPlaying" class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-5xl cursor-pointer flex text-white rounded-lg z-10">
                <PlaySquareFilled />
              </div>
              <div v-show="!cushionVideoIsPlaying" class="absolute top-0 w-full h-full bg-black/[0.5]"></div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white row-span-3 col-span-8 shadow-sm">
          <div class="font-bold text-center mb-2">運動員數據對比</div>
          <div class="flex mx-auto justify-center gap-8 my-2">
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: currentCompareBtnActive }"
              @click="handleSwitchCurrentCompare"
            >
              • 本次投球對比
            </div>
            <div
              class="text-center text-[#a0a0a0] rounded-full px-2 py-0.5 cursor-pointer sence-btn"
              :class="{ active: customCompareBtnActive }"
              @click="handleSwitchCustomCompare"
            >
              • 自定義數據對比
            </div>
          </div>
          <div v-show="currentCompareBtnActive" class="flex justify-center flex-wrap mt-3">
            <el-table :data="athletesCompareTable1" border style="width: 100%">
              <el-table-column prop="current" label="本次投球數據" min-width="33%" />
              <el-table-column prop="measure" label="指標" min-width="33%" />
              <el-table-column prop="athlete" label="請選擇對比運動員" min-width="33%">
                <template #header>
                  <el-cascader placeholder="請選擇運動員數據" v-model="compareAthlete1" :options="compareAthleteOptions" @change="handleCompareAthlete1Change" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="customCompareBtnActive" class="flex justify-center flex-wrap mt-3">
            <el-table :data="athletesCompareTable2" border style="width: 100%">
              <el-table-column prop="athlete1" label="請選擇對比運動員" min-width="33%">
                <template #header>
                  <el-cascader placeholder="請選擇運動員數據" v-model="compareAthlete2" :options="compareAthleteOptions" @change="handleCompareAthlete2Change" />
                </template>
              </el-table-column>
              <el-table-column prop="measure" label="指標" min-width="33%" />
              <el-table-column prop="athlete2" label="請選擇對比運動員" min-width="33%">
                <template #header>
                  <el-cascader placeholder="請選擇運動員數據" v-model="compareAthlete3" :options="compareAthleteOptions" @change="handleCompareAthlete3Change" />
                </template>
              </el-table-column>
            </el-table>
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
}
</style>
