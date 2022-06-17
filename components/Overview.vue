<template>
   <div>
     {{ faqData }}
   </div>
</template>

<script>
import { faqData } from 'static/daten.js'
export default {
    data() {
    return {
      faqData,
    }
  }
}
</script>