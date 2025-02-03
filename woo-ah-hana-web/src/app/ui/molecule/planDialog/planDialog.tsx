"use client";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/app/utils/style/helper";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const PlanDialog = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?: string;
  }
>(
  (
    {
      children,
      className,
      title,
      description,
      titleClassName,
      descriptionClassName,
      ...props
    },
    forwardedRef
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={cn("fixed bottom-0 w-full bg-white ", className)}
      >
        {title ? (
          <DialogPrimitive.Title
            className={cn("text-lg text-center font-bold mb-2", titleClassName)}
          >
            {title}
          </DialogPrimitive.Title>
        ) : (
          <DialogPrimitive.Title></DialogPrimitive.Title>
        )}
        {description ? (
          <DialogPrimitive.Description
            className={cn("text-sm mb-4", descriptionClassName)}
          >
            {description}
          </DialogPrimitive.Description>
        ) : (
          <DialogPrimitive.Description></DialogPrimitive.Description>
        )}
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute top-4 right-4"
        ></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

PlanDialog.displayName = DialogPrimitive.Content.displayName;
