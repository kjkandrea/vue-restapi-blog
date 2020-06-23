# Vue Wordpress Blog

Wordpress의 데이터베이스 구조, 백엔드를 활용하여 클라이언트단에서 필요한 데이터(주로 Wordpress Post 데이터)를 호출하는 간단한 블로그를 구축한다.

단방향으로 데이터를 불러들여 표시하는 간단한 어플리케이션이다. 

처음으로 진행해본 vue 토이프로젝트인 [vue-mindtalk](https://github.com/kjkandrea/vue-mindtalk) 과 동일한 성격의 프로젝트이다. 이번 프로젝트는 조금 더 천천히, 구체적인 지식 습득에 집중하여 진행해보고자 한다. 프로젝트가 끝나면 다음 질문에 대답할 수 있는 지식을 습득하는것이 목표이다.

* 디렉토리는 어떠한 디렉토리를 만들어야하며, 각 디렉토리의 구체적인 용도는 무엇인가?
* SPA를 구축하며 라우터(vue-router)는 어떻게 구성해야하는가?
* Vuex를 이용하여 데이터를 통합하는 방식으로 개발 할 수 있는가?
* 데이터를 받아오지 못하였을때 예외 처리는 어떻게 하여야 하는가?
* async await 비동기 처리 패턴을 사용할 수 있는가?
* Nuxt 프레임워크에서 빌드는 어떻게 진행하여야 하는가?
* 빌드 시 소스맵을 보이지 않는 등 구체적인 설정을 할 수 있는가?

## 기능 정의

현재 Wordpress로 운영중인 wireframe 블로그에서 크게 벗어나지 않도록 정의하였다. 초보몽키 님의 지킬로 구성된 [초보몽키의 개발공부로그](wayhome25.github.io) 블로그를 많은 부분 참고하였다.

* [ ] 헤더
  * [x] 검색 기능 제공
  * [x] 햄버거 버튼 제공
  * [x] 햄버거 버튼을 클릭하면 서브메뉴가 우측에서 펼쳐짐
  * [x] Aside 메뉴
    * [ ] 프로파일 영역 (사진/이름/깃헙링크)
    * [x] 홈으로 이동
    * [x] Categories 네비게이션
    * [ ] 하단에 Powered by 삽입

* [ ] 풋터
  * [ ] 하단에 Powered by 삽입

* [x] 메인페이지
  * [x] 최신 글 바로가기 리스트
  * [x] 카테고리 별 목록 리스트

* [x] 카테고리 아카이빙 
  * [x] 카테고리 별 Wordpress Post 리스트
    * [x] 제목
    * [x] 작성일 (한국시간 기준)

* [ ] 상세 Post/Pages
  * [x] 제목 출력
  * [ ] 메타정보 출력
    * [ ] 작성일 (한국시간 기준)
    * [ ] 카테고리 출력
  * [x] 구텐베르크로 작성된 콘텐츠 출력
  * [ ] Disqus 댓글 란 구현

* [x] 검색 기능
  * [x] wordpress에서 제공하는 검색 로직을 그대로 활용
  * [x] 검색란에서 enter를 동작하면 제출

* [x] 검색 아카이빙
  * [x] 검색 결과 별 Wordpress Post 리스트
    * [x] 제목
      * [ ] 검색어와 일치하는 부분 highlight 표시
    * [x] 작성일

* [ ] 404 페이지
  * [ ] 해당 콘텐츠를 찾을 수 없습니다. 삭제되었거나, 없는 콘텐츠 입니다. 표시


## 프론트엔드

### Vue : Nuxt

비교적 익숙한 Nuxt로 프론트엔드를 구축한다.

### Nuxt 개발환경(보일러플레이트) 구성

[create-nuxt-app](https://ko.nuxtjs.org/guide/installation/) 을 사용한다.
프로젝트 디렉토리를 생성하고 다음 커맨드를 입력한다.

```
npm create-nuxt-app .
```

Generating 옵션은 다음과 같이 선택하였다.

* Choose programming language : **JavaScript**
* Choose the package manager : **Npm**
* Choose UI framework : **Vuetify.js**
* Choose custom server framework : **안쓸래요!**
* Choose Nuxt.js modules : **Axios**
* Choose linting tools : **안쓸래요!**
* Choose rendering mode : **SSR**
* Choose development tools : **jsconfig.json (Recommended for VS Code)**

패키지 매니저는 익숙한 npm을 선택. UI framework는 Vuetify를 사용하기로 하였다. 모든 데이터 요청은 axios로 처리하기위해 Axios를 설치하였다. lint는 개인작업이여서 따로 구성하지 않았다. 

패키지 인스톨이 완료되면 다음 커맨드를 입력하여 nuxt 실행이 잘 되는지 테스트한다.

```
npm run serve
```

### 베이스 layout 정의

#### Vuetify 탬플릿 'Google Contacts' 적용

프로젝트를 시작하면 항상 레이아웃부터 정리하고 싶어진다.
nuxt 환경에서 레이아웃을 정의하는 `layouts/default.vue` 파일을 내 취향 대로 정의해보겠다. Vuetify에서 제공하는 [Google Contacts 레이아웃](https://vuetifyjs.com/ko/examples/layouts/google-contacts/)을 사용하기로 하였다. 

vuefity 레포지토리의 [google-contacts.vue](https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/layouts/layouts/demos/google-contacts.vue)를 그대로 `layouts/default.vue`에 붙여 넣는다.

저장 후 확인해보니 레이아웃은 잘 적용되었지만, vuetify의 베이스 테마가 black으로 설정되어 있어 위화감이 들었다. `nuxt.config.js 60열` 에서 컬러 스키마를 light로 변경해주었다.

```
vuetify: {
  theme: {
    light: true
  }
}
```

#### 불필요 요소 제거 및 정리

* bell 버튼, contactUs등 기본으로 구성된 레이아웃은 필요가 없다. 이와 같은 요소들을 삭제하고 배치를 변경해주었다.
* 메뉴 관련 더미데이터를 '기능 정의'에 정의된 메뉴 그대로 삽입해주었다. 
* vuetify UI컴포넌트 명만으로 각 영역을 알아보기 힘들어 주석을 추가해주었다.
* ``<nuxt />`` 를 삽입하여 `index.vue` 와 `default.vue`를 연결지어 주었다.
* Logo.vue 등 불필요한 자산을 삭제하고 `pages/index.vue` 에 기억에 남는 글귀를 적어두었다.

레이아웃 정리가 완료되었다.

![layout](https://user-images.githubusercontent.com/32591477/84350853-16700a00-abf5-11ea-9a94-1e667d924f3e.jpg)


## 라우팅

클라이언트 사이드에서의 라우팅이란 사용자가 이전 버튼, 북마크를 사용하게끔 URL마다 화면을 만들어두거나, HTML5의 히스토리 API를 사용할 수 있게 하는 등 페이지를 구분하는 과정을 일컫는다.
Wordpress 를 기조로 보면 `포스트(post), 페이지(page), 카테고리(category), 태그(tag)`와 같은 속성을 지닌 콘텐츠들이 저마다의 퍼머링크를 지니고 있다.

### 사전 계획

#### Wordpress의 글 이름 '퍼머링크' 구조를 모방하여 사용한다?

퍼머링크 방식이란 Wordpress의 `슬러그(slug)` 를 매개로 퍼머링크를 만들어 사용자에게 콘텐츠를 제공하는 기본적인 방식이다. 이 방식을 모방하여 구현한다면 각 포스트, 페이지, 카테고리, 태그 콘텐츠들은 다음과 같은 형태의 url을 지니게 될 것이다.

```
https://wireframe.kr/about // About Page
https://wireframe.kr/es6-const-let // const, let 을 주제로 다룬 Post
https://wireframe.kr/javascript // javacript Category에 속한 Post 목록
https://wireframe.kr/tag-name // tag-name Tag에 속한 Post 목록
https://wireframe.kr/javascript/es6-const-let // javascript Category에 속한 const, let 을 주제로 다룬 Post
https://wireframe.kr/tag-name/es6-const-let // tag-name Tag에 속한 const, let 을 주제로 다룬 Post
```

정리하자면 다음과 같다.

``` javascript
`https://wireframer.kr/${slug_name}` // Page
`https://wireframer.kr/${slug_name}` // Post
`https://wireframer.kr/${slug_name}` // Category
`https://wireframer.kr/${slug_name}` // Tag
`https://wireframer.kr/${category_slug}/${slug_name}` // Category/Post
`https://wireframer.kr/${tag_slug}/${slug_name}` // Tag/Post
```

프론트엔드 라우팅의 입장에서 보자면 이는 상당히 중첩된 라우팅이다. `https://wireframer.kr/${slug_name}` 의 라우팅구조가 무려 4여개의 경우의 수를 지닌다. Wordpress REST API 를 커스텀하지 않고 활용하여서는 이와 같은 복잡성을 처리할 방안이 떠오르지 않아, 사례를 조사하여 보고자 다음과 같은 레포지토리를 찾아내었다.

##### [Vue Wordpres : Notes on Permalink Structure](https://github.com/bucky355/vue-wordpress#notes-on-permalink-structure)

> Problems with the permalink structure are generally because the router can't differentiate between a post and a page. While this may be solved with Navigation Guards and in component logic to check data and redirect when necessary, the introduced complexity is out of scope for this starter theme.

해당 레포지토리의 기여자가 나와 동일한 문제에 직면한것으로 보이며, 이와 같은 문제에 대한 명확한 해결책을 현재 내가 가진 지식으로는 도출하기 힘들다는 결론을 내렸다.
물론 대안은 있다. 

#### 각 콘텐츠에 고유한 'base name'을 부여하는 형식

이 방법이 가장 심플하게 퍼머링크를 배분하고, 그에따른 콘텐츠 데이터를 요청할 수 있는 방법이라는 결론에 이르렀다. 각 콘텐츠 별 `base-name` 을 통해 요청들의 과도한 중첩을 의도적으로 없애는 것이다. 매우 간단한 방식이며 다음과 같은 형태의 url을 지니게 될 것이다.

```
https://wireframe.kr/page/about // About Page
https://wireframe.kr/post/es6-const-let // const, let 을 주제로 다룬 Post
https://wireframe.kr/category/javascript // javacript Category에 속한 Post 목록
https://wireframe.kr/tag/tag-name // tag-name Tag에 속한 Post 목록
```

정리하자면 다음과 같다.

``` javascript
`https://wireframer.kr/page/${slug_name}` // Page
`https://wireframer.kr/post/${slug_name}` // Post
`https://wireframer.kr/category/${slug_name}` // Category
`https://wireframer.kr/tag/${slug_name}` // Tag
```

처리하는 입장에서는 매우 간단명료하나 사용자 편의, SEO 등을 고려할때 과연 이 방법이 최선일지에 대한 의문이 남는다. 우선 가벼운 마음으로 시작한 이 프로젝트가 기본적인 라우팅 작업에서 부터 병목이 생기는걸 원치 않아 이와 같은 방식으로 구성하기로 하였다.

### 구현

Nuxt 개발 환경에서는 routes.js를 생성하여 별도로 라우팅 규칙을 생성해야하는 작업이 생략된다. pages 디렉토리에 파일트리에 따라 자동으로 router 설정을 세팅하여 준다.
공식문서를 참고하여 라우팅을 구현하자. [NUXTJS Guide : 라우팅](https://ko.nuxtjs.org/guide/routing/)

사전 계획을 토대로 구성된 파일트리는 다음과 같다.

```
pages/
--| page/
-----| _slug.vue
--| post/
-----| _slug.vue
--| category/
-----| _slug.vue
--| tag/
-----| _slug.vue
index.vue
```

위와 같은 파일트리를 구성하면 다음과 같은 설정이 자동으로 생성될 것이다.

``` javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'page-slug',
      path: '/page/:slug?',
      component: 'pages/page/_slug.vue'
    },
    {
      name: 'post-slug',
      path: '/posts/:slug?',
      component: 'pages/post/_slug.vue'
    },
    {
      name: 'category-slug',
      path: '/category/:slug?',
      component: 'pages/category/_slug.vue'
    },
    {
      name: 'tag-slug',
      path: '/tag/:slug?',
      component: 'pages/tag/_slug.vue'
    },
  ]
}
```

## Vuex로 데이터 다루기

Vuex란 컴포넌트들의 데이터를 중앙집중형태로 관리하는 일종의 데이터 물류센터의 역할을 한다. 크게 4가지의 속성이 있으며 간단하게 정리해보자면 다음과 같다.

#### state
Vue의 **data** 개념에 해당 한다. React의 state와도 유사한 개념이다.

#### mutations
Vue의 **methods** 개념에 해당 한다. state를 **동기적으로 변형**할때 쓰인다.

#### actions
비동기적인 처리를 할때 쓰인다. 예를들면 서버에서 데이터를 받아와야 할때, axios로 데이터를 요청하고 받아온 데이터를 mutations에 넘겨주어 state에 데이터를 부여하는 방식으로 쓰인다.

#### getters
Vue의 **computed** 개념에 해당 한다. state 값을 계산하여 반환할 때 쓰인다.

### Vuex store 구성 듀토리얼

Nuxt환경에서의 Vuex

우선 본격적인 작업 이전에 `pages/index.vue` 에서 rest api로 Wordpress의 homepage 데이터를 비동기호출해보는 코드를 작성할 것이다. 대략적인 순서도를 정리해보자면 다음과 같다.

* index.vue 가 렌더되기 전에 서버에 데이터를 요청 *- Components, Pages 에서 요청*
* 요청한 데이터를 비동기로 수신 *- Vuex Actions*
* 요청한 데이터를 state에 setState *- Vuex Mutations*
* index.vue 에서 state값을 렌더

#### 1. index.vue 가 렌더되기 전에 서버에 데이터를 요청

Vue 라이프사이클 훅으로 서버에 데이터를 요청한다. Nuxt에서 제공하는 `fetch(context)` 가 적합 할 듯 하나 [공식문서](https://ko.nuxtjs.org/api/pages-fetch)를 찾아보니 deprecated될 훅이며 공식문서의 안내대로 대신 `middleware(context)` 를 사용하도록 한다.

``` javascript 
//index.vue

// 비동기로 데이터를 호출하는 훅
middleware({ store }) {
  // dispatch 로 store/pages.js/RequestPageData 를 실행한다.
  store.dispatch('pages/RequestPageData', {
    // 어떤 페이지 데이터를 불러올지 인자로 넘겨주었다. 
    slug: 'home',
  })
}
```

#### 2. 요청한 데이터를 비동기로 수신

Vuex store/pages.js에 다음과 같은 actions를 작성한다. nuxt 보일러플레이트 구성때 인스톨한 axios를 사용한다.

``` javascript
// store/pages.js
export const actions = {
  RequestPageData({ commit }, payload) {
    // axios로 블로그 사이트에 데이터 요청
    this.$axios.get(`https://wireframe.kr/wp-json/wp/v2/pages?slug=${payload.slug}`)
      .then((res) => {
        // 요청이 이행되면 Mutations : RequestPageData 에 data인자를 넘겨준다.
        commit('RequestPageData', {
          data: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

```

#### 3. 요청한 데이터를 state에 setState

state를 다음과 같이 정의하였다. 이례적으로 REST API로 호출된 rendered 데이터가 비동기적으로 주어지기때문에 초기값을 선언해주었다.

``` javascript 
// store/pages.js
export const state = () => ({
  // pageData는 객체이다.
  pageData: {
    title: {
      // rendered를 빈값으로 선언하여 오류를 방지
      rendered: ''
    },
    content: {
      rendered: ''
    },
    excerpt: {
      rendered: ''
    }
  },
})
```

동기적으로 데이터를 state에 부여하기위해 mutations를 사용한다.

``` javascript
// store/pages.js
export const mutations = {
  RequestPageData (state, payload) {
    // actions에서 넘겨준 데이터를 state에 부여
    state.pageData = payload.data[0]
  }
}

```

#### 4. 요청한 데이터를 state에 setState

state.pageData를 index.vue에서 computed로 가져와 사용한다.

``` javascript
//index.vue
computed: {
  pageData() {
    return this.$store.state.pages.pageData;
  },
},
```

### Post, Page 데이터 구현

시뮬레이션 해본 위의 코드를 참고하여 포스트 싱글페이지, 페이지 싱글페이지에 데이터를 부여할것이다. 다음 디렉토리 구조내의 파일들을 추가하여 작업한다.

```
pages/
--| page/
-----| _slug.vue
--| post/
-----| _slug.vue

store/
--| pages.js
--| posts.js
```

store에서 각 포스트, 페이지들의 싱글 콘텐츠를 Wordpress REST API로 불러오도록 하였다. 

추가로 **서버단에 요청을 최소화 하도록** [vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate) 플러그인을 도입하였다.
새로고침을 하거나, 다른 페이지를 경유하여 같은 페이지&포스트를 연속으로 방문할때에는 서버에 요청하지않고 state를 그대로 유지하도록 하였다.
로컬 스토리지(Local Storage)에 가장 최근 경유한 페이지&포스트에 대한 데이터가 저장된다.

### Category, Tag 에 따른 포스트 목록 구현

다음 url로 접속하였을때 각 텍소노미가 아카이빙 되도록 한다.

```
`https://wireframer.kr/category/${slug_name}` // Category Archiving
`https://wireframer.kr/tag/${slug_name}` // Tag Archiving
```

store에서 각 텍소노미(Category, Tag)들의 목록을 불러오도록 하였다. 두 텍소노미가 공통성을 지니고있어 store는 따로 분리하지않고 `store/posts.js` 에 통합하였다. 데이터,메소드 명칭도 **Taxonomy** 로 명명하여 통합시켰다.
`vuex-persistedstate`로 캐싱을 하기위해 여러 상태를 state에 기록해두었다. `pageIndex, taxonomyId, lastFetchTexonomy, taxonomiesLastFetchDates` 가 이에 해당하며 이 때문에 state가 상당히 복잡해졌다. 추후에 Vuex store에 대해 철저히 테스트하여 버그가 없는지 확인하여야한다.

구현 도중 똑같은 쿼리를 두 번 호출하는 실수를 개발자 도구 Network 탭에서 발견하여 바로 수정하였다. get 요청을 할때엔 Network 탭을 항상확인하자.

Facebook에서 사용하는 포스팅 시간 표시 기능이 마음에 들어 벤치마킹하여 구현하였다. 작성한지 1분 미만이면 '방금', 어제면 '어제 몇시 경' 이런식으로 뜨는 기능이다. 하잘것없는 기능이나 Date를 직접적으로 다뤄본 적이 없어 많은 시행착오를 거쳤다. [momentjs](https://momentjs.com/)를 사용하고자 하였으나 기능에 비해 지나치게 무거워 대신 [dayjs](https://day.js.org/) 라이브러리를 사용하였다. 이 라이브러리의 슬로건은 **momentjs와 유사한 사용법을 지닌 경량화된 미니멀리즘 라이브러리** 이다. 구현하며 시간개념을 프론트엔드에서 어떻게 다루어야할 지 간접적으로 많이 배우게 되었다. 
현재는 `TimeStamp`란 명칭으로 컴포넌트화 시켰으나, 초기에는 글로벌 함수를 추가하여 이를 구현하고자 하였다. Nuxt의 plugin 디렉토리를 활용하면 될 듯 한데 나중에 읽어 볼 글들을 기록해둔다.

* [Nuxt 도큐먼트 : 플러그인](https://ko.nuxtjs.org/guide/plugins/)
* [[Nuxtjs] plugin 이용하여 global methods 만들기](https://medium.com/@Dongmin_Jang/vue-js-global-methods-%EB%A7%8C%EB%93%A4%EA%B8%B0-8578365634e2)


### 메뉴 구현

메뉴를 구현하였다. 특이사항이 몇가지 있었다. 

#### Component 단위에서는 asyncDate, middleware 라이프 사이클 훅을 사용할 수 없다.

이는 nuxt [컴포넌트에서의 비동기 데이터](https://ko.nuxtjs.org/faq/async-data-components/) 에 설명되어 있다. 나는 `mounted` 훅을 사용하였다.

#### computed setter

네비게이션 토글을 제어하고자 전역 store에서 navigationDrawer 란 state를 생성하였다. 이 state를 다음과 같이 computed로 받아 `v-model`로 네비게이션에 연결하여 처리하고자 하였으나 문제가 발생하였다.

> [Vue warn]: Computed property "name" was assigned to but it has no setter.

``` vue
<template>
  <v-navigation-drawer
    v-model="drawer"
  />
  ...
</template>

<script>
export default {
  computed: {
    drawer() {
      return this.$store.state.navigationDrawer
    }
  }
}
</script>
```

**`computed` 를 `v-model`로 바인딩하려면, setter를 넣어주어야 한다.**

setter에서 `this.$store.state.navigationDrawer` 에 직접 접근해서 `this.$store.state.navigationDrawer = state` 식으로 값을 바꿔버리란 얼토당토하지도 않은 해결법을 웹에서 발견하였다.. 이렇게하면 Vuex가 비명을 지른다. 무시하고 다음과 같이 응용하여 오류를 잡았다.

``` javascript
drawer: {
  get() {
    return this.$store.state.navigationDrawer
  },
  set(state) {
    if (state !== this.$store.state.navigationDrawer) {
      this.$store.commit('setStateToggleDrawer')
    }
  }
}
```

### 검색 구현

블로그 내의 포스트 검색기능을 구현하였다. 다음과 같은 방식을 사용하였다.

* 검색 폼이 제출되면 이를 `/search?keyword=${keyword}` 로 router에 push하여 Search 페이지로 이동시킨다.
* Search 페이지는 query를 토대로 store/search.js에 검색 결과를 요청한다. query가 없으면 요청하지 않는다.
* 검색결과를 Search 페이지에서 표시한다.

Wordpress REST API에서 제공하는 search만을 이용하여 간단히 구현하였다.


## 스타일링

`assets/scss` 디렉토리를 구성하여 css를 따로 제어하도록 하였다. 
다음 명령어로 필요한 플러그인들을 인스톨한다. yarn으로 인스톨하였다.

```
yarn add -D node-sass sass-loader @nuxtjs/style-resources
```

그 후, nuxt.config.js 에서 다음과같이 styles.scss 를 로드하면 된다.

```
// Global CSS
css: [
  "@/assets/scss/main.scss",
],
```

Vuetity에 정의된 스타일들을 커스텀할때에는 `assets/variables.scss` 를 사용한다. [공식문서 : sass variables](https://vuetifyjs.com/ko/customization/sass-variables/)

Nuxt 환경에서는 다음과 같이 `nuxt.config.js`에서 variables.scss를 활성화해주어야 작동한다.

```
vuetify: {
  customVariables: ['~/assets/scss/variables.scss'],
  treeShake: true,
  options: {
    customProperties: true
  },
},
```

그 후 공식문서를 참고하며 커스텀해주면 된다. `$font-size-root, $body-font-family` 등의 Vuetify에서 정해진 변수 명칭을 사용하여 지정한다.


## nuxt plugin 디렉토리를 활용하여 javascript Plugin 적용

캐로셀, 데이트 픽커 등 외부 라이브러리를 쓰고자 할 때 `nuxt plugin`을 사용하면 외부 패키지를 손쉽게 불러올 수 있다. 

### prizmjs plugin
Wordpress Gutenberg로 작성된 `<code />` 태그 를 하이라이트 표시 해 줄 플러그인이 필요하여 [prizm](https://prismjs.com/index.html) 을 적용하고자 하였다.
해당 플러그인은 뷰모델과 관계없이 document가 클라이언트단에 렌더링 다음에 실행되는 플러그인이다. 초기에는 npm으로 인스톨하여 package 종속성을 지니게 하고자 하였으나 옵션을 제어하기가 불편하여 다른 방법을 선택하였다. 구식적인 방식으로 공식 홈페이지에서 옵션을 취사선택하여 js파일과 css파일을 내려받아 적용하는것이다.

`assets/js `디렉토리에 `prism.js` 파일을 넣어주었고, css파일은 `scss`에 포함시켜 `main.scss` 에 연결하여 같이 빌드되도록하였다.
그 다음 `nuxt plugin`으로 프로젝트와 다음과 같이 연결시켰다. 

``` javascript
//plugins/prism.js
import Prism from '~/assets/js/prism';

if (process.client) {
    Prism.highlightAll(); 
}
```

``` 
//nuxt.config.js
plugins: [
  { src: '~/plugins/prism.js' },
],
```

이처럼 간단하게 외부 javascript 플러그인을 적용할 수도 있으나 되도록 npm을 통해 인스톨하여 package로 관리되게 하는것이 바람직하여 보인다. 취약점이 발견되거나 업데이트가 필요할 때 이처럼 적용한 플러그인은 취약점 발생을 인지하기도 쉽지 않으며, 업데이트 등 사후 관리 또한 어려울 것이다.

[Vue 인스턴스에 주입하기](https://ko.nuxtjs.org/guide/plugins/#vue-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-%EC%A3%BC%EC%9E%85%ED%95%98%EA%B8%B0) 를 통해 해당 기능을 `page/post/_slug.vue`에서만 실행하도록 하였다.


### tocbot plugin

[tocbot](https://tscanlin.github.io/tocbot/)은 콘텐츠내의 헤드라인 태그를 스캔하여 목차를 자동으로 만들어주는 플러그인이다. 간단히 적용하였다.


### vue-disqus plugin

코멘트 기능 삽입을 위해 Disqus를 도입하고자 하였다. [vue-disqus](https://ktquez.github.io/vue-disqus/) 을 통해 Disqus와 연동하였는데 내가 예상한것보다 훨씬 메끄럽게 연동이 가능했다. Disqus에서 shortname만 생성하여 이 정보를 토대로 Disqus를 연동하면 된다. [Nuxt.js 적용 방법](https://ktquez.github.io/vue-disqus/howto/nuxt.html)

## 미비된 사항을 챙기자

### favicon 추가

[favicon.io](https://favicon.io/)에서 favicon을 생성하여 static 디렉토리에 추가하였다. 해당 리소스들을 nuxt.config.js 에서 불러오도록 하였다.

### meta 정보 추가, opengraph 정보 추가

* 다음과 같은 meta 정보를 제공한다 : title, description
* 다음과 같은 opengraph 정보를 제공한다. : title, description, type, image, url

두 정보는 모두 서버사이드에서 렌더링 되어야하며 [postman](https://www.postman.com/) Get 요청을 통해 체크하도록 한다.

#### 전역 설정

`nuxt.config` 전역설정을 통해 메타 태그와 오픈그래프 정보를 추가한다.
head에 description meta를 제공하고자 한다면 다음과 같이 추가한다.

``` javascript
head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: '웹 기술에 대해 이야기 합니다.'
      },
    ]
}    
```

Nuxt 프레임워크에서 제공하는 유니크한 id인 `hid` 를 기입해주어 Page 별로 추가될 meta정보들과의 중복을 방지해주었다.

#### Post/Page Single 콘텐츠 설정

Post 콘텐츠에서는 featured_image_url, description이란 객체를 Wordpress 백엔드에서 추가하여 오픈그래프 정보로 제공하였다.

#### Category/Tag 별 포스트 리스트 설정

* 텍소노미 명칭을 title로 제공한다.
* "{texonomy}에 대한 Post 목록 입니다."를 description으로 제공한다.

#### 검색결과에 설정


### 404 Page 추가



## 빌드






