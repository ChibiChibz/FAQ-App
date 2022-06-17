<template>
    <div class="flex h-full">
        <div class="controller bg-muted h-full min-h-4">
            <SearchInput v-model="message" /> {{ message }}
        </div>
        <div class="display bg-primary h-full min-h-4">

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'heasdfas'
    }
  }
}
</script>


<style>
.controller{
    @apply w-1/4;
}
.display{
    @apply w-3/4;
}
</style>