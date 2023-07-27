<template>
  <div class="grid h-screen place-items-center">
    <div class=" bg-gray-200 w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2">
      <h1 class="text-center">ADD PRODUCT</h1>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            ID
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            type="text" placeholder="12456" v-model="id">
        </div>
        <div class="md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
            TITLE
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            type="text" placeholder="Product name" v-model="metadata.title">
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-full px-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
            Description
          </label>
          <textarea
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            placeholder="metadata Product" v-model="metadata.description">
          </textarea>


        </div>
      </div>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
            QUANTITY
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            type="number" placeholder="1" min="0" max="100" v-model="quantity">
        </div>
        <div class="md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
            FROM ADDRESS
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            type="text" placeholder="0x800d5633013855484B0271784bddEA18f9eE162A" v-model="account">
        </div>
      </div>
      <button type="button" @click="createProduct()"
        class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
        Create
      </button>
    </div>
    {{ response }}
  </div>
</template>

<script setup >

const response = ref({})
const id = ref("")
const metadata = ref({
  title: "",
  description: ""
})
const account = ref("")
const quantity = ref(1)


async function createProduct() {
  const body = { method: 'post', body: { id: parseInt(id.value), metadata: metadata.value, account: account.value, quantity: quantity.value } }

  const { data, pending, error, refresh } = await useFetch('/products/create?apiKey=123a', body)
  response.value = data.value
  console.log(data.value)
}

onMounted(() => {
  //$fetch('/products/create?apiKey=123a', { method: 'post', body: { id: 23, metadata: { info: "metadata info.... " }, account: "0x800d5633013855484B0271784bddEA18f9eE162A", quantity: 1 } })
})

</script>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
