<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor } from "@wangeditor/editor-for-vue";
import { FormProps } from "./utils/types";
import { useI18n } from "vue-i18n";

const props = withDefaults(defineProps<FormProps>(), {
  isAdd: () => false,
  formInline: () => ({
    pk: 0,
    title: "",
    publish: false,
    message: "",
    level: "info"
  })
});
const { t } = useI18n();

const formRef = ref();
const newFormInline = ref(props.formInline);
const editorRef = shallowRef();
const mode = "default";

function getRef() {
  return formRef.value;
}

defineExpose({ getRef });
const editorConfig = {
  readOnly: true
};

const handleCreated = editor => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const loading = ref(false);
</script>

<template>
  <el-form ref="formRef" :model="newFormInline" label-width="82px">
    <el-card shadow="never">
      <template #header>
        <el-text :type="newFormInline.level" size="large"
          >{{ newFormInline.title }}
        </el-text>
        <el-tag
          :type="newFormInline.publish ? 'success' : 'warning'"
          style="float: right"
          >{{
            newFormInline.publish ? t("labels.publish") : t("labels.unPublish")
          }}
        </el-tag>
      </template>
      <div class="wangeditor">
        <Editor
          v-model="newFormInline.message"
          v-loading="loading"
          :defaultConfig="editorConfig"
          :mode="mode"
          style="height: 500px; overflow-y: hidden"
          @onCreated="handleCreated"
        />
      </div>
    </el-card>
  </el-form>
</template>
