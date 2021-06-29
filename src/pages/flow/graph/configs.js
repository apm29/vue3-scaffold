import { dialog } from "@/utils/dialog/dialog";

export function onError(message) {
  return dialog.alert(message);
}
