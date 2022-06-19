<template>
    <div class="flex h-full">
        <div class="controller bg-muted h-full min-h-4">
            <SearchInput v-model="message" /> {{ message }}
        </div>
        <div class="display bg-primary h-full min-h-4">
          {{faqs}}
        </div>
    </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Payment Page - My awesome project',
      script: [
        {
          hid: 'FAQ Data',
          src: '/daten.js',
          // Changed after script load
          callback: () => { this.isDataLoaded = true } 
        }
      ]
    }
  },
  data() {
    return {
      message: 'heasdfas',
      faqs: faqData,
    }
  }
}
console.log(faqData);

</script>


<style>
.controller{
    @apply w-1/4;
}
.display{
    @apply w-3/4;
}
</style>