<script lang="ts" setup>
//import TheWelcome from '../components/TheWelcome.vue'
const today = new Date().toISOString().slice(0, 10)
import { ref, onMounted } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
const loadingStore = useLoadingStore()

const imageFiles = ref<File[]>([])
const imageUrls = ref<string[]>([])

function handleFiles(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    imageFiles.value = Array.from(files)
    updateImageUrls()
  }
}

function updateImageUrls() {
  imageUrls.value = imageFiles.value.map((file) => {
    return URL.createObjectURL(file)
  })
}

onMounted(async () => {
  loadingStore.showLoading()
  await fetchData()
  loadingStore.hideLoading()
})
async function fetchData() {}
</script>

<template>
  <p class="mb-2 text-lg font-semibold">お問い合わせフォーム</p>
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
      <label class="block text-sm font-medium text-gray-700"
        >画像（任意）<span class="label-optional"></span
      ></label>
      <input
        type="file"
        @change="handleFiles"
        name="file-upload"
        class="mt-1 block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm"
      />
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(url, index) in imageUrls" :key="index">
          <img :src="url" alt="Uploaded Image" class="w-full object-cover h-32" />
        </div>
      </div>
    </div>

    <p class="mb-4">
      画像アップロード 個人情報の取扱いについて
      <a href="#">こちら</a>をご確認の上、同意をお願いいたします。
    </p>

    <label class="inline-flex items-center">
      <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600" name="agree" />
      <span class="ml-2 text-sm text-gray-700">個人情報の取扱いについて同意する</span>
    </label>
  </div>
  <button class="bg-blue-700 text-white px-4 py-2 rounded">送信する</button>
</template>
