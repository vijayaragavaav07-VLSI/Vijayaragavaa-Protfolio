import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { Trash2, Mail, MailOpen, RefreshCw } from "lucide-react";
import type { ContactMessage } from "../../types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export const MessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await db
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setMessages(data as ContactMessage[]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const markRead = async (id: string, isRead: boolean) => {
    await db.from("contact_messages").update({ is_read: isRead }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
  };

  const deleteMessage = async (id: string) => {
    setIsDeleting(true);
    await db.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
    setIsDeleting(false);
  };

  const selected = messages.find((m) => m.id === selectedId);
  const unread = messages.filter((m) => !m.is_read).length;

  const handleSelect = async (msg: ContactMessage) => {
    setSelectedId(msg.id);
    if (!msg.is_read) await markRead(msg.id, true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <AdminPageHeader
        title="MESSAGES INBOX"
        description={`${unread} unread message${unread !== 1 ? "s" : ""}`}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-mono text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchMessages} className="flex items-center text-xs hover:text-red-300">
            <RefreshCw className="w-3 h-3 mr-1" /> Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-[#8ea3bd] font-mono p-8 text-center">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-[#4a5f78] font-mono border border-[#1a2b44] rounded">
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* MESSAGE LIST */}
          <div className="md:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left p-3 rounded border transition-all ${
                  selectedId === msg.id
                    ? "border-[#00d9ff]/50 bg-[#00d9ff]/5"
                    : msg.is_read
                    ? "border-[#1a2b44] bg-[#07111f] hover:border-[#253959]"
                    : "border-[#253959] bg-[#07111f] hover:border-[#00d9ff]/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold truncate max-w-[120px] ${msg.is_read ? "text-[#8ea3bd]" : "text-white"}`}>
                    {msg.name}
                  </span>
                  {!msg.is_read && <span className="w-2 h-2 bg-[#00d9ff] rounded-full flex-shrink-0 ml-2" />}
                </div>
                <p className="text-xs text-[#4a5f78] truncate">{msg.subject || "(no subject)"}</p>
                <p className="text-[10px] text-[#2a3f58] mt-1">
                  {new Date(msg.created_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          {/* MESSAGE DETAIL */}
          <div className="md:col-span-2">
            {selected ? (
              <div className="bg-[#07111f] border border-[#1a2b44] rounded p-6">
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#1a2b44]">
                  <div>
                    <h2 className="text-white font-bold font-mono tracking-widest">{selected.subject || "(no subject)"}</h2>
                    <p className="text-[#8ea3bd] text-sm mt-1">From: <span className="text-[#00d9ff]">{selected.name}</span> &lt;{selected.email}&gt;</p>
                    <p className="text-[#4a5f78] text-xs mt-1">{new Date(selected.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => markRead(selected.id, !selected.is_read)}
                      title={selected.is_read ? "Mark unread" : "Mark read"}
                      className="p-2 text-[#8ea3bd] hover:text-[#00d9ff] transition-colors"
                    >
                      {selected.is_read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteMessage(selected.id)}
                      disabled={isDeleting}
                      title="Delete message"
                      className="p-2 text-[#8ea3bd] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-[#e8f1fb] whitespace-pre-wrap leading-relaxed font-sans text-sm">
                  {selected.message}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1a2b44]">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "")}`}
                    className="inline-flex items-center px-4 py-2 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 rounded font-mono text-xs tracking-widest transition-colors"
                  >
                    REPLY VIA EMAIL
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-[#1a2b44] rounded text-[#4a5f78] font-mono text-sm">
                Select a message to read
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};