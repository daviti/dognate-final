"use client";

import { useEffect } from "react";
import { markConversationReadAction } from "@/lib/actions/messages";

export default function MarkConversationRead({
  conversationId,
}: {
  conversationId: string;
}) {
  useEffect(() => {
    markConversationReadAction(conversationId);
  }, [conversationId]);

  return null;
}
