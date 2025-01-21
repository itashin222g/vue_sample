<script lang="ts" setup>
//import TheWelcome from '../components/TheWelcome.vue'
import { XMarkIcon } from '@heroicons/vue/24/solid' // Heroicons の X アイコンをインポート

const today = new Date().toISOString().slice(0, 10)
import { ref, onMounted } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
const loadingStore = useLoadingStore()

const imageFiles = ref<File[]>([])
const imageUrls = ref<string[]>([])

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (files) {
    console.log('Selected files:', files) // デバッグ用ログ
    imageFiles.value = imageFiles.value.concat(Array.from(files)) // 既存のリストに追加
    updateImageUrls()

    // 入力値をリセットして同じファイルを再選択可能にする
    input.value = ''
  } else {
    console.error('No files selected') // デバッグ用ログ
  }
}

function updateImageUrls() {
  imageUrls.value = imageFiles.value.map((file) => {
    return URL.createObjectURL(file)
  })
}

function removeImage(index: number) {
  imageFiles.value.splice(index, 1) // ファイルリストから削除
  imageUrls.value.splice(index, 1) // URLリストから削除
}

onMounted(async () => {
  loadingStore.showLoading()
  await fetchData()
  loadingStore.hideLoading()
})
async function fetchData() {}
</script>

<template>
  <div class="container mx-auto mb-4">
    <p class="mb-2 text-lg font-semibold">お問い合わせフォーム</p>
  </div>

  <div class="container mx-auto px-4 bg-white rounded-md p-4 mb-4">
    <div class="flex">
      <div class="flex-1 pr-4 mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >お名前（姓）<span class="label-required"></span
        ></label>
        <input
          type="text"
          id="name"
          name="name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="姓"
        />
      </div>
      <div class="flex-1">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >（名）<span class="label-required"></span
        ></label>
        <input
          type="text"
          id="name"
          name="name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="名"
        />
      </div>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >メールアドレス（半角英字）<span class="label-required"></span
      ></label>
      <input
        type="text"
        id="name"
        name="name"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="メールアドレス"
      />
    </div>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >お問い合わせ内容<span class="label-required ml-2"></span
      ></label>
      <select
        id="inquiry-type"
        name="inquiry-type"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">選択してください</option>
        <option value="product">商品について</option>
        <option value="other">その他</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="reply-date" class="block text-sm font-medium text-gray-700"
        >希望返信日<span class="label-optional ml-2"></span
      ></label>
      <input
        type="date"
        id="reply-date"
        name="reply-date"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        :min="today"
      />
    </div>
    <div class="mb-4">
      <label for="inquiry" class="block text-sm font-medium text-gray-700"
        >詳細<span class="label-optional ml-2"></span
      ></label>
      <textarea
        id="inquiry"
        name="inquiry"
        rows="4"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="入力してください"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="inquiry" class="block text-sm font-medium text-gray-700 mb-2"
        >画像<span class="label-optional ml-2"></span
      ></label>
      <label
        for="file-upload"
        class="inline-block mb-2 bg-main-color text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        画像選択
      </label>
      <input
        type="file"
        id="file-upload"
        @change="handleFiles"
        name="file-upload"
        class="hidden"
        multiple
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div v-for="(url, index) in imageUrls" :key="index" class="relative group border p-2">
          <img :src="url" alt="Uploaded Image" class="w-full object-contain h-32 rounded-md" />
          <button
            class="absolute top-0 right-0 bg-red-500 transition-colors hover:bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center"
            @click="removeImage(index)"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <p class="font-semibold">個人情報の取扱いについて</p>
    <p class="mb-4"><a href="#">こちら</a>をご確認の上、同意をお願いいたします。</p>

    <label class="inline-flex items-center">
      <input
        type="checkbox"
        class="form-checkbox h-5 w-5 text-main-color border-gray-300 focus:ring-main-color rounded"
        name="agree"
      />
      <span class="ml-2 text-sm text-gray-700">個人情報の取扱いについて同意する</span>
    </label>
  </div>
  <div class="container mx-auto mb-4">
    <button
      class="bg-main-color rounded-full text-white px-4 py-2 rounded transition-colors hover:bg-sky-300"
    >
      送信する
    </button>
  </div>
  <div class="container mx-auto px-4 bg-white rounded-md p-4 mb-4">
    <p class="">
      送信完了しました。<br />
      ありがとうございます。
    </p>
  </div>
</template>
