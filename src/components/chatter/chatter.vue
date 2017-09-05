<template>
  <div class="container m-5 chatter">

    <div class="row mb-2">
      <div class="col-12 output">
        <div class="load-overlay">
          <div class="loader"></div>
        </div>

        <pre class="m-2">
          {
            "iam": "waiting"
          }
        </pre>
      </div>
    </div>

    <div class="row p-2">
      <div class="col-12">
        <input type="text" class="form-control" value="Hey @bob and @joe, you're going to (flip) when you check out http://www.cnn.com and http://www.theverge.com">
      </div>
    </div>

    <div class="row p-2">
      <div class="col-12">
        <button class="form-control btn btn-success">
          Enter
        </button>
      </div>
    </div>

  </div>
</template>

<script src="index.js"></script>
<style src="index.scss" lang="sass" scoped></style>
