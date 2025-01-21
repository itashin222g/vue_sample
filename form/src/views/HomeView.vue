<script lang="ts" setup>
//import TheWelcome from '../components/TheWelcome.vue'
import { XMarkIcon, PhotoIcon } from '@heroicons/vue/24/solid' // Heroiconsのアイコンをインポート

const today = new Date().toISOString().slice(0, 10)
import { ref, onMounted } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
const loadingStore = useLoadingStore()

const imageFiles = ref<File[]>([])
const imageUrls = ref<string[]>([])

//入力チェック
const formData = ref({
  nameLast: '',
  nameFirst: '',
  email: '',
  inquiryType: '',
  replyDate: '',
  details: '',
  agree: false,
})
const errors = ref<Record<string, string>>({}) // エラーメッセージを格納
const formStage = ref<'input' | 'confirm' | 'submitted'>('input')

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

function validateForm() {
  errors.value = {} // 初期化

  // 姓のチェック
  if (!formData.value.nameLast.trim()) {
    errors.value.nameLast = '姓を入力してください。'
  }

  // 名のチェック
  if (!formData.value.nameFirst.trim()) {
    errors.value.nameFirst = '名を入力してください。'
  }

  // メールアドレスのチェック
  if (!formData.value.email.trim()) {
    errors.value.email = 'メールアドレスを入力してください。'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = '正しいメールアドレスを入力してください。'
  }

  // お問い合わせ内容のチェック
  if (!formData.value.inquiryType) {
    errors.value.inquiryType = 'お問い合わせ内容を選択してください。'
  }

  // 詳細のチェック
  if (formData.value.details.length > 20) {
    errors.value.details = '詳細は200文字以内で入力してください。'
  }
  if (!formData.value.agree) {
    errors.value.agree = '個人情報の取扱いについて同意してください。'
  }

  // バリデーション結果の確認
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (validateForm()) {
    formStage.value = 'confirm' // 確認画面に遷移
  } else {
    alert('入力内容を確認してください。') // バリデーション失敗時
  }
}
function confirmSubmit() {
  // ここで実際の送信処理を行う（例: API呼び出し）
  formStage.value = 'submitted' // 送信完了画面に遷移
}
function editForm() {
  formStage.value = 'input' // 入力画面に戻る
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

  <form v-if="formStage === 'input'" @submit.prevent="handleSubmit">
    <div class="container mx-auto px-4 bg-white rounded-md p-4 mb-4">
      <div class="flex">
        <div class="flex-1 pr-4 mb-4">
          <label for="nameLast" class="block text-sm font-medium text-gray-700"
            >お名前（姓）<span class="label-required"></span
          ></label>
          <input
            v-model="formData.nameLast"
            type="text"
            id="name"
            name="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="姓"
          />
          <p v-if="errors.nameLast" class="text-red-500 text-sm mt-1">{{ errors.nameLast }}</p>
        </div>
        <div class="flex-1">
          <label for="nameFirst" class="block text-sm font-medium text-gray-700"
            >（名）<span class="label-required"></span
          ></label>
          <input
            v-model="formData.nameFirst"
            type="text"
            id="name"
            name="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="名"
          />
          <p v-if="errors.nameFirst" class="text-red-500 text-sm mt-1">{{ errors.nameFirst }}</p>
        </div>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >メールアドレス（半角英字）<span class="label-required"></span
        ></label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="メールアドレス"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >お問い合わせ内容<span class="label-required ml-2"></span
        ></label>
        <select
          v-model="formData.inquiryType"
          id="inquiryType"
          name="inquiryType"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">選択してください</option>
          <option value="product">商品について</option>
          <option value="other">その他</option>
        </select>
        <p v-if="errors.inquiryType" class="text-red-500 text-sm mt-1">{{ errors.inquiryType }}</p>
      </div>
      <div class="mb-4">
        <label for="reply-date" class="block text-sm font-medium text-gray-700"
          >希望返信日<span class="label-optional ml-2"></span
        ></label>
        <input
          v-model="formData.replyDate"
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
          v-model="formData.details"
          id="formData.details"
          name="details"
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="入力してください"
        ></textarea>
        <p v-if="errors.details" class="text-red-500 text-sm mt-1">{{ errors.details }}</p>
      </div>
      <div class="mb-4">
        <label for="inquiry" class="block text-sm font-medium text-gray-700 mb-2"
          >画像<span class="label-optional ml-2"></span
        ></label>
        <label
          for="file-upload"
          class="inline-flex items-center mb-2 bg-main-color text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <PhotoIcon class="h-5 w-5 mr-2" />
          画像をアップロード
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
          v-model="formData.agree"
          type="checkbox"
          class="form-checkbox h-5 w-5 text-main-color border-gray-300 focus:ring-main-color rounded"
          name="agree"
        />
        <span class="ml-2 text-sm text-gray-700">個人情報の取扱いについて同意する</span>
      </label>
      <p v-if="errors.agree" class="text-red-500 text-sm mt-1">{{ errors.agree }}</p>
    </div>
    <div class="container mx-auto mb-4">
      <button
        @click.prevent="handleSubmit"
        class="bg-main-color rounded-full text-white px-4 py-2 rounded transition-colors hover:bg-sky-300"
      >
        送信する
      </button>
    </div>
  </form>
  <div v-else-if="formStage === 'confirm'">
    <div class="container mx-auto px-4 bg-white rounded-md p-4 mb-4">
      <h2 class="text-lg font-semibold mb-1">確認画面</h2>
      <p class="mb-4">以下の内容で送信します。</p>

      <p><strong>お名前（姓）:</strong> {{ formData.nameLast }}</p>
      <p><strong>お名前（名）:</strong> {{ formData.nameFirst }}</p>
      <p><strong>メールアドレス:</strong> {{ formData.email }}</p>
      <p><strong>お問い合わせ内容:</strong> {{ formData.inquiryType }}</p>
      <p><strong>希望返信日:</strong> {{ formData.replyDate }}</p>
      <p><strong>詳細:</strong> {{ formData.details }}</p>
      <p><strong>画像:</strong><span v-if="imageUrls.length <= 0">なし</span></p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div v-for="(url, index) in imageUrls" :key="index" class="relative group border p-2">
          <img :src="url" alt="Uploaded Image" class="w-full object-contain h-32 rounded-md" />
        </div>
      </div>
    </div>
    <!-- ボタン群 -->
    <div class="mt-4">
      <button
        @click="editForm"
        class="bg-gray-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        修正する
      </button>
      <button
        @click="confirmSubmit"
        class="bg-green-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-2"
      >
        確定して送信
      </button>
    </div>
  </div>

  <!-- 送信完了画面 -->
  <div v-else-if="formStage === 'submitted'">
    <div class="container mx-auto px-4 bg-white rounded-md p-4 mb-4">
      <p class="">
        送信完了しました。<br />
        ありがとうございます。<br />
        〇営業日以内にメールアドレス宛に返信いたします。
      </p>
    </div>
  </div>
</template>
