<template>
    <div class="faq flex h-full">
        <div class="faq__controller">
          <ul class="faq__controller__menu">
            <li  v-for="category in faq" @click="showQuestions" class="faq__controller__menu__category text-gray cursor-pointer" >
               <span>&vrtri;</span> <span>{{category.menu}}</span> 
            </li>
          </ul>
          <div class="faq__controller__search">
            <input type="text" name="search" v-model="input" placeholder="Search keywords..." id="search" class="faq__controller__search-form " />
          </div>
        </div>
        <div class="faq__display">
          <div v-if="activeCategory && !input" class="relative">
            <ul class="faq__display__questions m-4">
              <li  v-for="question in activeCategory.fragen" @click="toggleAnswer" class="faq__display__questions__questionWrapper " >
                <div class="faq__display__questions__questionWrapper__question">{{question.frage}}</div>
                <div class="faq__display__questions__questionWrapper__answer" v-html="question.antwort"></div>
              </li>
            </ul>
          </div>
          <div v-if="input" class="relative">
            <ul class="faq__display__questions m-4">
              <li  v-for="question in filteredQuestions" @click="toggleAnswer" class="faq__display__questions__questionWrapper " >
                <div class="faq__display__questions__questionWrapper__question">{{question.question}}</div>
                <div class="faq__display__questions__questionWrapper__answer" v-html="question.answer"></div>
              </li>
            </ul>
          </div>
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
      faq: faqData,
      activeCategory: undefined,
      input: '',
      questions: [],
    }
  },
  methods: {
    showQuestions(event) {
      // process menu to display
      if (document.getElementsByClassName("faq__controller__menu__category active")[0]) {
          document.getElementsByClassName("faq__controller__menu__category active")[0].classList.remove("active");
      }
      event.currentTarget.classList.add("active");
      
      // safe questions from clicked category
      let category=this.faq.find(category => category.menu==event.currentTarget.lastChild.innerText);
      this.activeCategory=category;

      // reset open answers
      while (document.getElementsByClassName("faq__display__questions__questionWrapper active")[0]) {
          document.getElementsByClassName("faq__display__questions__questionWrapper active")[0].classList.remove("active");
      }
      
    },
    toggleAnswer(event) {
      // process menu to display
      event.currentTarget.classList.toggle("active");
    },
  },
  mounted(){
    self=this;
    this.faq.forEach(category => {
      category.fragen.forEach(pair => {
        this.questions.push({question: pair.frage, answer: pair.antwort})
      });
    });
    console.log(this.questions);
  }
  ,
  computed: {
    filteredQuestions() {
      if (this.input) {
        while (document.getElementsByClassName("faq__display__questions__questionWrapper active")[0]) {
          document.getElementsByClassName("faq__display__questions__questionWrapper active")[0].classList.remove("active");
        }
        // console.log(this.input);
        // console.log(this.questions.filter(pair => {
        //   return this.input.toLowerCase().split(" ").every(v => pair.question.toLowerCase().includes(v) || pair.answer.toLowerCase().includes(v));
        // }));
        return this.questions.filter(pair => {
          return this.input.toLowerCase().split(" ").every(v => pair.question.toLowerCase().includes(v) || pair.answer.toLowerCase().includes(v));
        });
      } 
    }
  }
}

</script>


<style lang="scss">

.faq{
  &__controller{
      @apply w-1/4 bg-muted h-full;

      &__menu{
        @apply m-4;

        &__category{
          &.active{
            @apply text-text;
          }
        }
      }

      &__search{
        @apply m-4 relative lg:flex items-center;

        &-form{
          @apply shadow-sm px-2 focus:ring-brand focus:border-brand block w-full lg:pr-12 sm:text-sm  rounded-sm;
        }
      }
  }
  &__display{
      @apply w-3/4 bg-primary h-full;

      &__questions{
        &__questionWrapper{
          @apply text-gray cursor-pointer py-2;

          &.active{
            .faq__display__questions__questionWrapper__question{
              @apply bg-gray text-white;
            }
            .faq__display__questions__questionWrapper__answer{
              @apply block bg-white;
            }
          }

          &__answer{
            @apply hidden;
          }
        }
      }
  }
  
}
</style>