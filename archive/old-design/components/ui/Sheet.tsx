import { Modal, type ModalProps } from "./Modal";

export type SheetProps = Omit<ModalProps, "variant">;

/** Bottom sheet on mobile, centered modal on desktop — thin wrapper over Modal's "sheet" variant. */
export function Sheet(props: SheetProps) {
  return <Modal {...props} variant="sheet" />;
}
