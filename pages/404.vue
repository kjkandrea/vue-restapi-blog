<template>
  <div class="content-wrap">
    <img
        src="/connect.png"
        alt="Not Found Image"
      />
    <h1>요청한 페이지를 찾을 수 없습니다.</h1>
    <p>해당 페이지를 찾을 수 없습니다. 가장 좋은 방법은 메뉴 항목 중 하나를 사용하여 사이트의 다른 영역으로 이동하는 것입니다.</p>
  </div>
</template>


<script>

export default {
  head() {
    return {
      title: 'Not Found',
      meta: [
        {
          hid: 'desc', name: 'description', content: `해당 페이지를 찾을 수 없습니다. 가장 좋은 방법은 메뉴 항목 중 하나를 사용하여 사이트의 다른 영역으로 이동하는 것입니다.`,
        },
        {
          hid: 'ogtitle', property: 'og:title', content: 'Not Found',
        },
        {
          hid: 'ogdesc', property: 'og:description', content: `해당 페이지를 찾을 수 없습니다. 가장 좋은 방법은 메뉴 항목 중 하나를 사용하여 사이트의 다른 영역으로 이동하는 것입니다.`,
        }
      ],
    }
  }
};
</script>
