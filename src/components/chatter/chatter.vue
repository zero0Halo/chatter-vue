<template>
  <div class="container m-5 chatter">

    <div class="row mb-2">
      <div class="col-12 output">
        <div class="load-overlay" :class="{ active: loading }">
          <div class="loader"></div>
        </div>

        <pre class="m-2">{{ output }}</pre>
      </div>
    </div>

    <div class="row p-2">
      <div class="col-12">
        <input type="text" class="form-control" v-model="message">
      </div>
    </div>

    <div class="row p-2">
      <div class="col-12">
        <button class="form-control btn btn-success" @click="textSubmit">
          Enter
        </button>
      </div>
    </div>

  </div>
</template>

<script src="index.js"></script>
<style src="index.scss" lang="sass" scoped></style>
