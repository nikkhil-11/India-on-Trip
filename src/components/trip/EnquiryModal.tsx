"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import EnquiryForm, { type EnquiryFormProps } from "@/components/forms/EnquiryForm";

/**
 * Native <dialog> wrapper: the browser gives us the focus trap, Escape
 * handling and the backdrop. On mobile it becomes a bottom sheet.
 */
export default function EnquiryModal({
  open,
  onClose,
  formProps,
}: {
  open: boolean;
  onClose: () => void;
  formProps: EnquiryFormProps;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label="Trip enquiry"
      className="sheet m-auto max-h-[94vh] w-[min(620px,94vw)] overflow-y-auto rounded-panel bg-white p-0 backdrop:bg-deep/60 max-b640:bottom-0 max-b640:left-0 max-b640:right-0 max-b640:top-auto max-b640:m-0 max-b640:w-full max-b640:max-w-none max-b640:rounded-b-none"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-3">
        <p className="font-display text-[15px] font-extrabold text-deep">Send your enquiry</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          className="grid h-11 w-11 place-items-center rounded-btn border border-line text-deep transition-colors hover:bg-light"
        >
          <Icon name="close" size={20} strokeWidth={2} />
        </button>
      </div>

      <EnquiryForm {...formProps} variant="modal" />
    </dialog>
  );
}
