import { useNav } from "./useNav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { onBeforeMount, type Ref, watch } from "vue";

export function useTranslationLang(ref?: Ref) {
  const { $storage, changeTitle, handleResize } = useNav();
  const { locale, t } = useI18n();
  const route = useRoute();

  function translationCh() {
    $storage.locale = { locale: "zh" };
    locale.value = "zh";
    if (ref) {
      handleResize(ref.value);
    }
  }

  function translationEn() {
    $storage.locale = { locale: "en" };
    locale.value = "en";
    if (ref) {
      handleResize(ref.value);
    }
  }

  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );

  onBeforeMount(() => {
    locale.value = $storage.locale?.locale ?? "zh";
  });

  return {
    t,
    route,
    locale,
    translationCh,
    translationEn
  };
}
