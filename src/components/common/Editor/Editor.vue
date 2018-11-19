<template>
    <div>
        <quill-editor ref="myTextEditor"
            v-model="content"
            :config="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
       </quill-editor>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      content: '',
      editorOption: {}
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorBlur () { },
    onEditorFocus () { },
    onEditorReady () { }
  }
}
</script>

<style scoped>

</style>
