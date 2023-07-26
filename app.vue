<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup >

onMounted(() => {
  $fetch('/products/create?apiKey=123a', { method: 'post', body: { id: 23, metadata: { info: "metadata info.... " }, account: "0x800d5633013855484B0271784bddEA18f9eE162A", quantity: 1 } })
})

</script>
