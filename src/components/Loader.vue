<template>
  <div
    class="row text-center justify-content-center"
    style="position: fixed; top:0px; bottom:0px; left:0px; right:0px; z-index:9999; background-color: white"
  >
    <div class="col-sm-12 align-self-center">
      <i class="mdi mdi-loading mdi-spin text-primary" style="font-size:60px"></i>
      <h2>{{ msg }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: {
      type: String,
      default: 'Getting data please be patient'
    }
  }
};
</script>
