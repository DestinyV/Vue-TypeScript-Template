<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from "@/utils/validate";
import { Component, Prop, Vue } from "vue-property-decorator";

interface Mask {
  mask: string;
  [key: string]: string;
}
@Component({
  name: "SvgIcon"
})
export default class SvgIcon extends Vue {
  @Prop({ required: true }) private iconClass!: string;
  @Prop({ default: "" }) private className!: string;
  private get isExternal(): boolean {
    return isExternal(this.iconClass);
  }
  private get iconName(): string {
    return `#icon-${this.iconClass}`;
  }
  private get svgClass(): string {
    if (this.className) {
      return "svg-icon " + this.className;
    } else {
      return "svg-icon";
    }
  }

  private get styleExternalIcon(): Mask {
    return {
      mask: `url(${this.iconClass}) no-repeat 50% 50%`,
      "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
    };
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
