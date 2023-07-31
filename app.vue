<template>
  <div class="contain align-center">
    <div class="grid place-items-center">
      <div class="flex">
        <button type="button" @click="editable = false"
          class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
          Create
        </button>

        <button type="button" @click="editable = true"
          class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
          Edit
        </button>

      </div>
    </div>
    <div class="grid place-items-center">
      <div class=" bg-gray-200 w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2">
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

            <textarea id="message"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Metadata Product" v-model="metadata.description"></textarea>


          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div v-if="!editable" class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
              QUANTITY
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              type="number" placeholder="1" min="0" max="100" v-model="quantity">
          </div>
        </div>
        <button type="button" @click="createProduct()"
          class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
          Send
        </button>
      </div>
      <div>
      {{ response }}
    </div>

    </div>
    
  </div>F
</template>

<script setup >

const response = ref({})
const id = ref("")
const metadata = ref({
  title: "",
  description: ""
})
const quantity = ref(1)
const editable = ref(false)


async function createProduct() {
  let body
  if (editable.value) {
    body = { method: 'put', body: { id: parseInt(id.value), metadata: metadata.value } }
  } else {
    body = { method: 'post', body: { id: parseInt(id.value), metadata: metadata.value, account: "0x800d5633013855484B0271784bddEA18f9eE162A", quantity: quantity.value } }
  }

  const { data } = await useFetch('/products?apiKey=123a', body)
  response.value = data.value
}

</script>

