(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{347:function(t,e,n){"use strict";var o=n(343),r=n.n(o),d=n(344),c=n.n(d),l=n(345),m=n.n(l),h=n(346),_=n.n(h);r.a.locale(c.a),r.a.extend(m.a),r.a.extend(_.a);var v={props:{time:String},methods:{timeLine:function(time){var t=r()(time),e=r()();return t.isSame(e,"year")?t>e.add(-1,"month")?t.isSame(e,"day")?t>e.add(-1,"hour")&&t>e.add(-1,"minute")?"방금":e.to(t):t.isYesterday()?t.format("어제 a hh:mm"):t.format("M월 DD일 a h:mm"):t.format("M월 DD일"):t.format("YYYY. MM. DD")}}},D=n(31),component=Object(D.a)(v,(function(){var t=this.$createElement;return(this._self._c||t)("time",{attrs:{datetime:this.time}},[this._v(this._s(this.timeLine(this.time)))])}),[],!1,null,null,null);e.a=component.exports},368:function(t,e,n){"use strict";n.r(e);var o={components:{TimeStamp:n(347).a},computed:{postData:function(){return this.$store.state.posts.postData}},middleware:function(t){var e=t.store,n=t.params;return e.dispatch("posts/requestPostData",n.slug)},mounted:function(){this.$InjectedTOC(),this.$InjectedPrism()},head:function(){return{title:this.postData.title.rendered,meta:[{hid:"desc",name:"description",content:this.postData.description},{hid:"ogtitle",property:"og:title",content:this.postData.title.rendered},{hid:"ogdesc",property:"og:description",content:this.postData.description},{hid:"ogimage",property:"og:image",content:this.postData.featured_image_url?this.postData.featured_image_url:"https://wireframe.kr/wp-content/uploads/2020/06/shape.png"},{hid:"ogurl",property:"og:url",content:"https://wireframe.kr/post/".concat(this.postData.slug)}]}}},r=n(31),d=n(37),c=n.n(d),l=n(363),m=n(371),h=n(137),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-wrap"},[t.postData?[n("div",{staticClass:"content-header"},[n("h1",{domProps:{innerHTML:t._s(t.postData.title.rendered)}}),t._v(" "),t.postData._embedded?n("v-chip-group",{attrs:{column:""}},t._l(t.postData._embedded["wp:term"][0],(function(e){return n("nuxt-link",{key:e.id,staticStyle:{"text-decoration":"none !important"},attrs:{to:{name:"category-slug",params:{slug:e.slug}}}},[n("v-chip",{attrs:{small:"",color:"pink",label:"","text-color":"white"}},[n("v-icon",{attrs:{"x-small":"",left:""}},[t._v("mdi-label")]),t._v("\n            "+t._s(e.name)+"\n          ")],1)],1)})),1):t._e(),t._v(" "),n("time-stamp",{attrs:{time:t.postData.date}})],1),t._v(" "),n("div",{staticClass:"js-toc"}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"content-body",attrs:{id:"content-body"},domProps:{innerHTML:t._s(t.postData.content.rendered)}}),t._v(" "),n("Disqus")]:n("h2",[t._v("해당 Post가 존재하지 않습니다.")])],2)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VChip:l.a,VChipGroup:m.a,VIcon:h.a})}}]);