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

## 기능 정의 (20200611)

현재 Wordpress로 운영중인 wireframe 블로그에서 크게 벗어나지 않도록 정의하였다. 초보몽키 님의 지킬로 구성된 [초보몽키의 개발공부로그](wayhome25.github.io) 블로그를 많은 부분 참고하였다.

* [ ] 헤더
  * [ ] 검색 버튼 제공
  * [ ] 햄버거 버튼 제공
  * [ ] 햄버거 버튼을 클릭하면 서브메뉴가 우측에서 펼쳐짐
  * [ ] Aside 메뉴
    * [ ] 프로파일 영역 (사진/이름/깃헙링크)
    * [ ] 홈으로 이동
    * [ ] Categories 네비게이션
      * [ ] depth 별로 하위 카테고리 펼침 기능 제공
    * [ ] 하단에 Powered by 삽입

* [ ] 풋터
  * [ ] 하단에 Powered by 삽입

* [ ] 메인페이지
  * [ ] 최신 글 바로가기 리스트
  * [ ] 카테고리 별 목록 리스트

* [ ] 카테고리 아카이빙 
  * [ ] 카테고리 별 Wordpress Post 리스트
    * [ ] 제목
    * [ ] 작성일 (한국시간 기준)

* [ ] 상세 Post/Pages
  * [ ] 제목 출력
  * [ ] 메타정보 출력
    * [ ] 작성일 (한국시간 기준)
    * [ ] 카테고리 출력
  * [ ] 구텐베르크로 작성된 콘텐츠 출력
  * [ ] Disqus 댓글 란 출력

* [ ] 검색 기능
  * [ ] wordpress에서 제공하는 검색 로직을 그대로 활용
  * [ ] 검색란에서 enter를 동작하면 제출
  * [ ] 검색하기 버튼을 클릭하면 제출

* [ ] 검색 아카이빙
  * [ ] 검색 결과 별 Wordpress Post 리스트
    * [ ] 제목
      * [ ] 검색어와 일치하는 부분 highlight 표시
    * [ ] 작성일

* [ ] 404 페이지
  * [ ] 해당 콘텐츠를 찾을 수 없습니다. 삭제되었거나, 없는 콘텐츠 입니다. 표시


## 프론트엔드

### Vue : Nuxt

비교적 익숙한 Nuxt로 프론트엔드를 구축한다.

### Nuxt 개발환경(보일러플레이트) 구성 (20200611)

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
* Choose rendering mode : **Single Page App**
* Choose development tools : **jsconfig.json (Recommended for VS Code)**

패키지 매니저는 익숙한 npm을 선택. UI framework는 Vuetify를 사용하기로 하였다. 모든 데이터 요청은 axios로 처리하기위해 Axios를 설치하였다. lint는 개인작업이여서 따로 구성하지 않았다. 

패키지 인스톨이 완료되면 다음 커맨드를 입력하여 nuxt 실행이 잘 되는지 테스트한다.

```
npm run serve
```

### 베이스 layout 정의 (20200611)

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
