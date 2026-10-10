'use client';

import React, { useEffect, useState } from 'react';
import { ContactMessage } from '@/types';
import { fetchContactMessages, updateMessageStatus, deleteContactMessage } from '@/lib/api';
import LoadingState from '@/components/LoadingState';
import { Mail, CheckCircle2, Trash2, Clock } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    const data = await fetchContactMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
    const ok = await updateMessageStatus(id, nextStatus);

    if (ok) {
      setMessages(messages.map(m => m._id === id ? { ...m, status: nextStatus as any } : m));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      const ok = await deleteContactMessage(id);
      if (ok) {
        setMessages(messages.filter(m => m._id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Messages Inbox</h1>
          <p className="text-xs text-slate-500">Inquiries submitted by users through the contact form.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching messages from MongoDB..." />
      ) : messages.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-sm">
          No contact messages found.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-5 rounded-2xl border transition-all ${
                m.status === 'unread'
                  ? 'bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${m.status === 'unread' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{m.name}</span>
                  <span className="text-xs text-slate-400">&lt;{m.email}&gt;</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(m._id, m.status)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'unread'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {m.status === 'unread' ? 'Mark Read' : 'Read'}
                  </button>

                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-rose-500 hover:text-rose-700"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-3 space-y-1">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Subject: {m.subject}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {m.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
