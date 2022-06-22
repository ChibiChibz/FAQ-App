<template>
    <div class="faq flex h-full">
        <div class="faq__controller">
          <ul class="faq__controller__menu">
            <li  v-for="category in faq" @click="showQuestions" class="faq__controller__menu__category " >
               <span>&vrtri;</span> <span>{{category.menu}}</span> 
            </li>
          </ul>
          <div class="faq__controller__search">
            <input type="text" name="search" v-model="input" placeholder="Search keywords..." id="search" class="faq__controller__search-form " />
          </div>
          <div class="faq__controller__notes">
            <h6>Notes:</h6>
            <p>
              The menu function and search function are implemented. Search has priority, which means when something is typed in the input the menu doesn't work.
            </p>
            <p>TODO: Styling</p>
            <p>Nice to have: transition and proper icons</p>
          </div>
        </div>
        <div class="faq__display">
          <div v-if="activeCategory && !input" class="relative">
            <ul class="faq__display__questions m-4">
              <li class="faq__display__questions__headline"><strong>{{activeCategory.menu}}</strong></li>
              <li  v-for="question in activeCategory.fragen" class="faq__display__questions__questionWrapper " >
                <div @click="toggleAnswer" class="faq__display__questions__questionWrapper__question">{{question.frage}}</div>
                <div class="faq__display__questions__questionWrapper__answer" v-html="question.antwort"></div>
              </li>
            </ul>
          </div>
          <div v-if="input" class="relative">
            <ul class="faq__display__questions m-4">
              <li  v-for="question in filteredQuestions"  class="faq__display__questions__questionWrapper " >
                <div @click="toggleAnswer" class="faq__display__questions__questionWrapper__question">{{question.question}}</div>
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
      title: 'BB - Testproject',
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
      event.currentTarget.parentElement.classList.toggle("active");
    },
  },
  mounted(){
    //collecting all questions to one Object Array when loading the app
    this.faq.forEach(category => {
      category.fragen.forEach(pair => {
        this.questions.push({question: pair.frage, answer: pair.antwort})
      });
    });
  }
  ,
  computed: {
    filteredQuestions() {
      //whenever search inputs is used
      if (this.input) {
        while (document.getElementsByClassName("faq__display__questions__questionWrapper active")[0]) {
          document.getElementsByClassName("faq__display__questions__questionWrapper active")[0].classList.remove("active");
        }
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
      @apply w-1/4 bg-white text-brand h-full p-4;

      &__menu{

        &__category{
          @apply opacity-50 cursor-pointer;

          &.active{
            @apply opacity-100;
          }
        }
      }

      &__search{
        @apply relative lg:flex items-center my-4 p-4 bg-brand bg-opacity-50 rounded-md;

        &-form{
          @apply shadow-sm focus:ring-brand focus:border-brand block w-full lg:pr-12 sm:text-sm  rounded-sm;
        }
      }

      &__notes{
        @apply text-sm opacity-50;
      }
  }
  &__display{
      @apply w-3/4 bg-white h-full;

      &__questions{

        &__headline{
          @apply bg-brand text-white rounded-tr-lg py-1 px-2;
        }
        &__questionWrapper{
          @apply text-gray cursor-pointer py-1 px-2 my-1 bg-brand rounded-tr-lg bg-opacity-50;

          &.active{
            .faq__display__questions__questionWrapper__question{
              @apply  font-bold;
            }
            .faq__display__questions__questionWrapper__answer{
              @apply mt-4 block;
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