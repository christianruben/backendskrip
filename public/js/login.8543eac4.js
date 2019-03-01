(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"26e5":function(t,e,a){},"7e63":function(t,e,a){},a55b:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-content",[a("v-container",{attrs:{fluid:"","fill-height":""}},[a("v-layout",{attrs:{"align-center":"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[a("v-card",{staticClass:"elevation-6"},[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-toolbar-title",[t._v("Login form")]),a("v-spacer")],1),a("v-card-text",[a("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-text-field",{attrs:{"prepend-icon":"person",name:"login",label:"Login",type:"text",rules:t.userRules,required:""},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("v-text-field",{attrs:{"prepend-icon":"lock",name:"password",label:"Password",id:"password",type:"password",rules:t.passRules,required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",loading:t.loadaction,disabled:t.loadaction},on:{click:t.sub}},[t._v("Login")])],1)],1)],1)],1)],1)],1)},n=[],r={data:function(){return{valid:!1,username:"",password:"",passRules:[function(t){return!!t||"password is required"},function(t){return t&&t.length>6||"Password must more than 6 character"}],userRules:[function(t){return!!t||"Username is required"},function(t){return t&&t.length>5||"Username must more than 5 character"}],loadaction:!1}},methods:{sub:function(){var t=this;this.$refs.form.validate()&&(this.loadaction=!0,setTimeout(function(){t.loadaction=!1,t.$router.push("/about")},3e3))}}},o=r,s=a("2877"),u=a("6544"),l=a.n(u),c=a("8336"),d=a("b0af"),h=a("80d2"),p=a("adda"),f=a("d9bd"),v=p["a"].extend({name:"v-card-media",mounted:function(){Object(f["d"])("v-card-media",this.src?"v-img":"v-responsive",this)}}),m=a("2b0e"),w=m["a"].extend({name:"v-card-title",functional:!0,props:{primaryTitle:Boolean},render:function(t,e){var a=e.data,i=e.props,n=e.children;return a.staticClass=("v-card__title "+(a.staticClass||"")).trim(),i.primaryTitle&&(a.staticClass+=" v-card__title--primary"),t("div",a,n)}}),g=Object(h["d"])("v-card__actions"),b=Object(h["d"])("v-card__text"),x=(d["a"],a("a523")),y=a("549c"),_=a("0e8f"),V=(a("26e5"),a("94ab")),B={name:"v-form",mixins:[Object(V["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",function(a){e.$set(e.errorBag,t._uid,a)},{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=a(t)))}):i.valid=a(t),i},validate:function(){var t=this.inputs.filter(function(t){return!t.validate(!0)}).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find(function(e){return e._uid===t._uid});if(e){var a=this.watchers.find(function(t){return t._uid===e._uid});a.valid&&a.valid(),a.shouldValidate&&a.shouldValidate(),this.watchers=this.watchers.filter(function(t){return t._uid!==e._uid}),this.inputs=this.inputs.filter(function(t){return t._uid!==e._uid}),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}},O=a("a722"),j=a("9910"),$=a("8654"),C=(a("7e63"),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t}),z={name:"v-textarea",extends:$["a"],props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return C({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},$["a"].options.computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||$["a"].options.computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout(function(){t.autoGrow&&t.calculateInputHeight()},0),this.autoGrow&&this.noResize&&Object(f["b"])('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height=0;var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=$["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){$["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.internalChange=!0,this.$emit("keydown",t)}}},I=a("7cf7"),T=a("ab6d"),k={functional:!0,$_wrapperFor:$["a"],props:{textarea:Boolean,multiLine:Boolean},render:function(t,e){var a=e.props,i=e.data,n=e.slots,r=e.parent;Object(T["a"])(i);var o=Object(I["a"])(n(),t);return a.textarea&&Object(f["d"])("<v-text-field textarea>","<v-textarea outline>",k,r),a.multiLine&&Object(f["d"])("<v-text-field multi-line>","<v-textarea>",k,r),a.textarea||a.multiLine?(i.attrs.outline=a.textarea,t(z,i,o)):t($["a"],i,o)}},H=a("71d9"),R=a("2a7f"),G=Object(s["a"])(o,i,n,!1,null,null,null);e["default"]=G.exports;l()(G,{VBtn:c["a"],VCard:d["a"],VCardActions:g,VCardText:b,VContainer:x["a"],VContent:y["a"],VFlex:_["a"],VForm:B,VLayout:O["a"],VSpacer:j["a"],VTextField:k,VToolbar:H["a"],VToolbarTitle:R["a"]})}}]);
//# sourceMappingURL=login.8543eac4.js.map